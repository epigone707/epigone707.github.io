# epigone707.github.io

This is my personal website built with jekyll. The link is https://epigone707.github.io/


## Run locally

Since Jekyll is a static site generator, it has to build the site before we can view it.

### 1. Install dependencies

Gems are installed into a project-local `vendor/bundle/` directory (no sudo needed,
even if Ruby itself was installed system-wide via apt):

```sh
bundle config set --local path 'vendor/bundle'
bundle install
```

### 2. Build & serve

Always run Jekyll through `bundle exec` so it uses the local bundle:

- `bundle exec jekyll build` — Builds the site and outputs a static site to a directory called `_site`.
- `bundle exec jekyll serve` — Builds the site and runs it on a local web server at http://localhost:4000, rebuilding the site any time you make a change.
- `bundle exec jekyll serve --livereload` — Same as above, plus auto-refreshes your browser on changes.

## Embedding novel content from GitHub

Any post can declare an `embed:` front-matter field pointing at a GitHub file.
The `_plugins/embed_novel.rb` plugin reads the file at build time. For a private
novel repository, the GitHub Actions workflow checks it out into `_novel_source`
and the plugin reads from that checkout. The post URLs can stay unchanged.

```yaml
---
layout: post
title: "cyberpunk 1-5"
tags: novel
embed: https://github.com/epigone707/novel-cyberwitch/blob/master/novel%201-5.md
---
```

### Private novel repository setup

1. Create a fine-grained personal access token that has access only to
   `epigone707/novel-cyberwitch`, with **Contents: Read-only** permission.
2. In this website repository, go to **Settings → Secrets and variables →
   Actions** and add a repository secret named `NOVEL_REPO_TOKEN` containing
   the token.
3. Keep the token out of the repository. The workflow uses it only to check out
   the novel repository during the build.

For local builds, check out the novel repository next to the website files:

```sh
gh repo clone epigone707/novel-cyberwitch _novel_source
NOVEL_SOURCE_DIR=_novel_source bundle exec jekyll serve
```

The local checkout directory is ignored by Git. Without `NOVEL_SOURCE_DIR`, the
plugin retains its public-URL fetching behavior.

## Make your own website

see my [post](https://epigone707.github.io/tech/2022/07/25/tech.html)

## Reference
- Code adapted from https://github.com/facaiy/facaiy.github.io
- Jekyll tutorial: https://jekyllrb.com/docs/step-by-step/01-setup/
- Jekyll tags tutorial: https://longqian.me/2017/02/09/github-jekyll-tag/
- Comments widget: https://utteranc.es/
