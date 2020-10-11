---
title: Blog
pagination:
  data: collections.posts
  size: 12
  alias: posts
  addAllPagesToCollections: true
layout: default.njk
collection: posts
permalink: "blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

{% set postlist = collections.posts | reverse %}
{% include "postlist.njk" %}
