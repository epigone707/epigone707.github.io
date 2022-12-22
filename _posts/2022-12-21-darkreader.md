---
layout: post
title: "Do not use Darkreader and Disqus at the same time"
description: ""
category: tech
tags: web
modify: 2022-12-21 11:55:00
---
# Intro
[Darkreader](https://github.com/darkreader/darkreader) will generate a dark mode for your website. [Disqus](https://disqus.com/) is a service for web comments and discussions. 

However, Darkreader has bugs that cause Disqus to not work properly. This post is to remind you to not use Darkreader and Disqus at the same time. Until 2022/12/21, the bug seems still exist, though the [github issues](https://github.com/darkreader/darkreader/issues/76) about this bug were claimed to be fixed.

# Details

According to [disqus docs](https://help.disqus.com/en/articles/1717201-disqus-appearance-customizations), The light scheme is loaded when the text color Disqus inherits from your site has >= 50% gray contrast: between color: `#000000`; and color: `#787878`; However, if you use Darkreader to generate a dark mode for your website, Disqus seems doesn't work properly.
Here are screenshots of my website with Darkreader and Disqus:
First, in the light mode, everything is fine:
![d1](/assets/images/disqus-1.png)

Second, I click the switch button to enable darkreader and switch to the dark mode, then Disqus doesn't work properly. You can see that the text color of the comments is too dark to be seen.

![d2](/assets/images/disqus-2.png)

Thirdly, I refresh the page. Of course, the page is still in the dark mode. However, the disqus widget bahaves very strange.
![d3](/assets/images/disqus-3.png)

Finally, I click the switch button to  disable darkreader and switch to the light mode. Then Disqus doesn't work properly even in light mode!
![d4](/assets/images/disqus-4.png)

I spent 2 hours to fix this and failed. 

I think it's a bug of Darkreader.