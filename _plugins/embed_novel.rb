# frozen_string_literal: true

require "net/http"
require "json"
require "digest"
require "fileutils"

# _plugins/embed_novel.rb
#
# A Jekyll plugin that embeds the latest content of a remote markdown file into
# any post that declares an `embed:` field in its front matter.
#
# Example front matter:
#
#   ---
#   layout: post
#   title: "毁灭联邦的魔女 1-5"
#   description: "..."
#   category: literature
#   tags: novel 毁灭联邦的魔女
#   embed: https://github.com/epigone707/novel-cyberpunk/blob/master/novel%201-5.md
#   ---
#
# At build time (jekyll build / jekyll serve) the plugin:
#   1. resolves the GitHub blob URL to a raw.githubusercontent.com URL,
#   2. fetches the latest content (with a small on-disk cache so offline
#      builds still work after the first successful fetch),
#   3. replaces the post's whole content (in memory) with the fetched file,
#      keeping the original headings from the source file unchanged.
#
# The cache lives in _util/.embed_cache/ and mirrors the fetched file so that
# `jekyll build` works even without network access.
#
# Note: GitHub Pages' default build ignores custom plugins. If you deploy with
# GitHub Actions (see .github/workflows/jekyll.yml) the plugin runs normally.
module EmbedNovel
  CACHE_DIR = File.expand_path("../_util/.embed_cache", __dir__)

  module_function

  # Convert a GitHub blob URL to a raw.githubusercontent.com URL.
  def to_raw_url(url)
    url = url.to_s.strip
    return url if url.include?("raw.githubusercontent.com")

    m = url.match(%r{github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)$})
    raise ArgumentError, "unsupported embed URL: #{url.inspect}" unless m

    owner, repo, branch, path = m.captures
    "https://raw.githubusercontent.com/#{owner}/#{repo}/#{branch}/#{path}"
  end

  # Fetch remote content as UTF-8 text.
  def fetch(url)
    uri = URI(url)
    res = Net::HTTP.get_response(uri)
    raise "HTTP #{res.code}" unless res.is_a?(Net::HTTPSuccess)

    res.body.force_encoding("UTF-8")
  end

  # Cache helpers ------------------------------------------------------------
  def cache_path(url)
    digest = Digest::SHA256.hexdigest(url)[0, 24]
    File.join(CACHE_DIR, "#{digest}.json")
  end

  def load_cached(url)
    path = cache_path(url)
    return nil unless File.exist?(path)

    JSON.parse(File.read(path, encoding: "UTF-8"))["raw"]
  rescue StandardError
    nil
  end

  def save_cache(url, raw)
    FileUtils.mkdir_p(CACHE_DIR)
    File.write(cache_path(url), JSON.generate(url: url, raw: raw), encoding: "UTF-8")
  end

  # Fetch + inject the embedded content into a post's content in memory.
  # The fetched markdown replaces the whole post body verbatim, so the source
  # file's own headings (title, chapters, etc.) are used as-is.
  def embed(post, offline: false)
    url = post.data["embed"]
    return false unless url && !url.to_s.strip.empty?

    raw_url = to_raw_url(url)

    raw =
      if offline
        load_cached(raw_url)
      else
        begin
          fetch(raw_url)
        rescue StandardError => e
          Jekyll.logger.warn "embed_novel:", "fetch failed for #{post.path} (#{e.message})"
          load_cached(raw_url)
        end
      end

    return false unless raw

    save_cache(raw_url, raw)

    post.content = raw
    true
  end
end

# Run before any post is rendered so the injected content is picked up.
class EmbedNovelGenerator < Jekyll::Generator
  def generate(site)
    site.posts.docs.each do |post|
      url = post.data["embed"] || post.data[:embed]
      next if url.to_s.strip.empty?

      EmbedNovel.embed(post)
    rescue StandardError => e
      Jekyll.logger.warn "embed_novel:", "failed to embed #{post.path}: #{e.message}"
    end
  end
end
