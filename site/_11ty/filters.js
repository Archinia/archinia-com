/*
|----------------------------------------------------------------
Filters

11ty Docs: https://www.11ty.dev/docs/filters/
Nunjucks Built In Filters: https://mozilla.github.io/nunjucks/templating.html#builtin-filters

TODO: Create a filter for popular tags, and use `limit` to choose how many; probably sort the collection Large to Small then limit the result to a quantity
|----------------------------------------------------------------
*/

const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const mdRender = new markdownIt({});

module.exports = {

  // Debug
  debug: obj => {
    return util.inspect(obj)
  },

  // Dates via Luxon
  /**
   * Format a date. See readableDate for example.
   */
  format: function(date, format) {
    return DateTime.fromJSDate(date).toFormat(String(format))
  },

  /**
   * Get date in ISO
   */
  iso: function(date) {
    return DateTime.fromJSDate(date).toISO({
      includeOffset: false,
      suppressMilliseconds: true
    })
  },

  /**
   * Readable Date
   * Default: 'dd MMMM yyyy' in 'America/Chicago'
   *
   * Simple usage, like on a post:
   * date | readableDate
   *
   * Use with format, like in Sitemap:
   * item.date | readableDate('yyyy-LL-dd')
   */
  readableDate: function(date, format) {
    // default to America/Chicago Timezone
    if (!format) {
      format = 'MMM dd, yyyy';
    }
    return DateTime.fromJSDate(date, { zone: 'America/Denver' }).toFormat(format);
  },

  /**
   * Convert Date from ISO
   */
  fromIso: function(timestamp) {
    return DateTime.fromISO(timestamp, { zone: 'America/Denver' }).toJSDate();
  },

  /**
   * Convert Date to ISO
   * Used in meta for published time
   */
  dateToIso: function(dateObj) {
    return DateTime.fromJSDate(dateObj).toISO({ includeOffset: true, suppressMilliseconds: true});
  },

  /**
   * For RSS Feed
   */
  toRFC2822: function(date) {
    return DateTime.fromJSDate(date).toRFC2822();
  },

  /**
   * Squash by Phil Hawksworth
   *
   * Make a search index string by removing duplicated words and removing less useful, common short words
   *
   * Source: https://github.com/philhawksworth/hawksworx.com/blob/master/src/site/_filters/squash.js
   * Read: https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/
   *
   * @param {String} text
   */
  squash: function(text) {
    var content = new String(text);

    // all lower case, please
    var content = content.toLowerCase();

    // remove all html elements and new lines
    var re = /(&lt;.*?&gt;)|(<.*?>)/gi;
    var plain = unescape(content.replace(re, ''));

    // remove duplicated words
    var words = plain.split(' ');
    var deduped = [...(new Set(words))];
    var dedupedStr = deduped.join(' ')

    // remove short and less meaningful words
    var result = dedupedStr.replace(/\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
    //remove newlines, and punctuation
    result = result.replace(/\.|\,|\?|-|—|\n/g, '');
    //remove repeated spaces
    result = result.replace(/([ ]{2,}|\t+)/g, ' ');

    return result;
  },

  /**
   * Limit the amount returned from a collection
   * Used with postslist to choose how many
   */
  limit: function(arr, limit) {
    return arr.slice(0, limit);
  },

  /**
   * Cache-busting for external css and js
   * Source: https://github.com/matuzo/matuzoat/blob/master/_11ty/filters.js#L41
   */
  cacheBuster: value => {
    let milliseconds = Date.now();
    return value + "?rev=" + milliseconds;
  },

  /**
   * Render Markdown Inline
   */
  renderMarkdownInline: (rawString) => {
		return mdRender.renderInline(rawString);
	}

}
