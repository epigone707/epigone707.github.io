---
layout: default
title: Life
permalink: /life/
---

<div class="home">

  <h1 class="page-heading">Posts</h1>

  <ul class="post-list">
  {% assign posts_by_modify = site.categories.life | sort:'modify' | reverse %}
    {% for post in posts_by_modify%}
      <li>
        <span class="post-meta">{{ post.modify | date: "%b %-d, %Y" }}</span>

        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        </h2>
      </li>
    {% endfor %}
  </ul>


</div>
