# epigone707.github.io

This is my personal website built with jekyll. The link is https://epigone707.github.io/about/


## Build
Since Jekyll is a static site generator, it has to build the site before we can view it. Run either of the following commands to build your site:


`jekyll build` - Builds the site and outputs a static site to a directory called _site.

`jekyll serve` - Does jekyll build and runs it on a local web server at http://localhost:4000, rebuilding the site any time you make a change.

## Embedding novel content from GitHub

Any post can declare an `embed:` front-matter field pointing at a GitHub file.
The `_plugins/embed_novel.rb` plugin automatically fetches the latest content at
build time (no manual steps) and uses it **verbatim** as the post body, keeping
the source file's own headings (title, 序章, chapters) unchanged. Example front
matter:

```yaml
---
layout: post
title: "毁灭联邦的魔女 1-5"
category: literature
tags: novel 毁灭联邦的魔女
embed: https://github.com/epigone707/novel-cyberpunk/blob/master/novel%201-5.md
---
```

- The fetched file is cached in `_util/.embed_cache/` so offline builds still work.
- GitHub Pages' default build ignores custom plugins; the included
  `.github/workflows/jekyll.yml` deploys via GitHub Actions so the plugin runs on
  the live site too.

## Make your own website

see my [post](https://epigone707.github.io/tech/2022/07/25/tech.html)

## Reference
- Code adapted from https://github.com/facaiy/facaiy.github.io
- Jekyll tutorial: https://jekyllrb.com/docs/step-by-step/01-setup/
- Jekyll tags tutorial: https://longqian.me/2017/02/09/github-jekyll-tag/
- Comments widget: https://utteranc.es/
