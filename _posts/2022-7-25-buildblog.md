---
layout: post
title: "Build Personal Blog with Jekyll and Github Pages"
description: "Blog that supports tags, comments, code block customization, table of contents sidebar that automatically highlight current section, etc."
category: tech
tags: web
modify: 2022-07-25 18:09:00
---

This article will teach you how to build a free personal website or blog. I will provide useful links to you rather than teaching you every details because some online tutorials are outdated.

# 1 GitHub Pages

GitHub Pages are public web pages for users, organizations, and repositories, that are freely hosted on GitHub’s `github.io` domain or on a custom domain name of your choice. Notice that we can only deploy static pages on Github Pages.

If you can follow the official tutorial [Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll) and find it is easy to understand, you can skip section 1.1 and 2.1.

## 1.1 Hello World

Go to [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and follow the tutorial. This may take 5 minutes if you are familiar with Github. Here I just copy some critical instructions from the tutorial.

1. Create a new GitHub public repository named `<username>.github.io`, where `username` is your Github username.
2. Clone the repository to your local file system.
3. Enter the project folder and add an `index.html` file with `"Hello World"` in it.
4. Add, commit, and push your changes. Go to your repository and wait for the build process to finish.

Now you should be able to see `"Hello World"` in `https://<username>.github.io`.

# 2 Jekyll

Jekyll is a static site generator. It takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site’s look and feel, URLs, the data displayed on the page, and more. Github recommend we use Jekyll to build our Github pages.

## 2.1 Jekyll Toy Example

Follow the [Jekyll Quickstart](https://jekyllrb.com/docs/) and [Step by Step Tutorial](https://jekyllrb.com/docs/step-by-step/01-setup/) to learn basic Jekyll. This may take 20 minutes.

## 2.2 Start to Build

Now we want a personal blog. The easiest way is to find your favorite template in [jekyll existing sites list](https://github.com/jekyll/jekyll/wiki/sites) and fork the repo. After you clone it to your local repository, don't forget to modify `_config.yml`. There're many beautiful exmaples on Github, find them!

**And of course, you can fork [my website](https://github.com/epigone707/epigone707.github.io) so that you can skip following sections!**

## 2.3 Add Tags

If you want to add tags to each of your post/article and provide a tag filter for users, follow this [Tags in jekyll + Github Tutorial](https://longqian.me/2017/02/09/github-jekyll-tag/). This may take 10-15 minustes.

## 2.4 Add Comment Widget

You might be wondering, how is it possible to have a comment widget when it's a static website.

Option 1: Github Issues make this possible! Follow [utteranc tutorial](https://utteranc.es/) so that you can add comment widget to every post! In order to make comments, users need to log in with their Github account.

Option 2: [Disqus](https://disqus.com/) provide a comment widget that support upvotes and nested comments. In order to make comments, users should log in with their Google, Twitter or Facebook account.

My [About](https://epigone707.github.io/about/) page is using utteranc and my posts pages are using Disqus. Choose whatever you like.

# 3 Want Your Blog To Be Popular?

## 3.1 Found In Google Search

You need to make your blog appear on Google search results. Here is a [great tutorial](https://victor2code.github.io/blog/2019/07/04/jekyll-github-pages-appear-on-Google.html), which will teach you how to verify your website and upload sitemap.

Also, follow [Google Guide: Help Google understand your content](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=en#understand_your_content) so that more people can find your blog and articles.

## 3.2 Analyze Your Blog

You want to see how many people visit your blog and what they are doing when they are in your website. Google Analytics can help us. Here are some main steps:
Go to [Google Analytics](https://marketingplatform.google.com/about/analytics/).

Create Google analytics account.

Find your Analytics Property ID. It should look like: “UA-XXXXXX-X” or "G-XXXXXXX."

Create a file `google-analytics.html` in your `_includes` folder. Add the code snippet:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "{{ site.google_analytics }}");
</script>
```

Add this line into your `_config.yml`:

```yaml
google_analytics: <Your ID, for example G-XXXXXXX>
```

Add this code snippet into the `<head>` tag of your website.
{% highlight liquid %}
{% raw %}
{% if site.google_analytics and jekyll.environment == 'production' %}
{% include google-analytics.html %}
{% endif %}
{% endraw %}
{% endhighlight %}

Git push, wait for build.

Go back to Google Analytics. Try visiting your blog and then Google Analytics should show that there's one visitor to your blog.

## 3.3 Chinese User?

Github pages can't appear in Baidu search results because Baidu is banned by Github. Here're some easy solutions.

- [利用 GitLab](https://geekplayers.com/migrate-from-github-pages-to-gitlab-pages.html) （需要实名认证拍照, 麻烦死了）
- [利用 coding.net](https://www.atjiang.com/coding.net-pages-as-github-pages-mirror-for-baidu/)
- [利用 zeit.co (now is vercel)](https://vercel.com/) (我 build 老是 fail, 原因不明)

# 4 More Features

## 4.1 Code Syntax Highlighting

See my tutorial [Syntax highlighting with Rouge in Jekyll](/tech/2022/12/17/tech.html).

## 4.2 Add Table of Contents

### 4.2.1 Basic TOC

We can use Jekyll built-in TOC generator! Just add following code into your markdown file:

```markdown
- TOC
  {:toc}
```

It will generate a table of contents for your post. See my post [C++ Interview Note](/tech/2022/12/18/tech.html) as an example.

### 4.2.2 Customizable TOC

The above method is not customizable, since it is static, and the element is in the post content, so it is hard to make it as a sidebar.

What we want is: (1) customizable, (2) automatically highlight the current section, (3) as a sidebar.

See my tutorial: [Automated Table of Contents for Jekyll with Highlighting](/tech/2023/07/15/toc.html).

## 4.3 Add Dark/Light Mode Switch

If you are using [Disqus](https://disqus.com/) to generate comment widget, I would recommend you write css code to generate a dark mode. You can check my [css files](https://github.com/epigone707/epigone707.github.io/blob/master/css/main.scss#L24) on how to do it.

If you don't use Disqus, then there's a tool called [Darkreader](https://github.com/darkreader/darkreader) that can automatically generate a dark mode for your website.

The reason is, Darkreader doesn't work properly with Disqus. See my post about this [Do not use Darkreader and Disqus at the same time](https://epigone707.github.io/tech/2022/12/21/darkreader.html#intro)

## 4.4 Search Bar

I'm using [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search) and this [tutorial](https://beingtechnicalwriter.com/jekyllsearch/) may help you.

# End

If you have any questions or want to share your thoughts, please leave a comment. I will be notified via email:)
