---
eleventyComputed:
  title: >-
    {{ tag | capitalize }}
  description: >-
    All posts tagged {{ tag }}
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
  - all
  - category
  - catList
  - blog
  - page
  - post
  - posts
  - searchable
  - tagList
  addAllPagesToCollections: true
permalink: /category/{{ tag | slug }}/
---

{% set postlist = collections[ tag ] | reverse %}
{% include "postlist.njk" %}

<hr class="major" />
<h2 class="text-center">Explore other blogs by subject</h2>
<ul class="tag-list">
{% for tag in collections.tagList %}
{% set tagUrl %}/category/{{ tag | slug }}/{% endset %}
<li><a href="{{ tagUrl }}" class="tag">{{ tag | capitalize }} ({{ collections[tag].length }})</a></li>
{% endfor %}
</ul>
