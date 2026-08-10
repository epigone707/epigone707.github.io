# frozen_string_literal: true

require "net/http"
require "json"

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
#   embed: https://github.com/epigone707/novel-cyberpunk/blob/master/novel%201-5.md
#   ---
module EmbedNovel
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

  # Fetch remote content as UTF-8 text. Raises on failure (no silent fallback).
  def fetch(url)
    uri = URI(url)
    res = Net::HTTP.get_response(uri)
    raise "HTTP #{res.code}" unless res.is_a?(Net::HTTPSuccess)

    res.body.force_encoding("UTF-8")
  end


  def split_intro_body(text)
    lines = text.split("\n")
    headings = lines.each_index.select { |i| lines[i].start_with?("## ") }
    return ["", text] if headings.empty?

    # headings[0] is the novel title; the blurb (intro) follows it.
    intro_start = headings[0] + 1
    body_start = headings[1] || lines.length
    intro = lines[intro_start...body_start].reject { |l| l.strip.empty? }.join("\n")
    body = lines[body_start..].map do |l|
      l =~ /^# (\d.*)$/ ? "## #{Regexp.last_match(1)}" : l
    end.join("\n").strip + "\n"
    [intro, body]
  end

  # Marker in the post where the embedded content goes.
  MARKER = "<!-- embed_novel -->"

  # Build the final post content: just the blurb + chapters, no added headings.
  def build_content(post, intro, body)
    content = post.content
    embedded = [intro, body].reject(&:empty?).join("\n\n") + "\n"

    if content.include?(MARKER)
      content.sub(MARKER, embedded)
    else
      "#{content.rstrip}\n\n#{embedded}"
    end
  end

  def embed(post)
    url = post.data["embed"]
    return false unless url && !url.to_s.strip.empty?

    raw_url = to_raw_url(url)
    raw = fetch(raw_url) # raises on failure -> loud build error
    intro, body = split_intro_body(raw)
    post.content = build_content(post, intro, body)
    true
  end
end

class EmbedNovelGenerator < Jekyll::Generator
  def generate(site)
    site.posts.docs.each do |post|
      EmbedNovel.embed(post)
    rescue StandardError => e
      Jekyll.logger.error "embed_novel:", "failed to embed #{post.path}: #{e.message}"
      raise
    end
  end
end
