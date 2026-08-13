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
The `_plugins/embed_novel.rb` plugin automatically fetches the **latest** content
at build time (no manual steps, no cache). Example front matter:

```yaml
---
layout: post
title: "cyberpunk 1-5"
tags: novel
embed: https://github.com/epigone707/novel-cyberpunk/blob/master/novel%201-5.md
---
```

## Make your own website

see my [post](https://epigone707.github.io/tech/2022/07/25/tech.html)

## Reference
- Code adapted from https://github.com/facaiy/facaiy.github.io
- Jekyll tutorial: https://jekyllrb.com/docs/step-by-step/01-setup/
- Jekyll tags tutorial: https://longqian.me/2017/02/09/github-jekyll-tag/
- Comments widget: https://utteranc.es/
