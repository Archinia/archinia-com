const fs = require('fs');

// 11ty Files
const filters = require('./site/_11ty/filters.js');
const shortcodes = require('./site/_11ty/shortcodes.js');
const collections = require('./site/_11ty/collections.js');
const transforms = require('./site/_11ty/transforms.js');

// Markdown Plugins
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItCollapsible = require('markdown-it-collapsible');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItImageSize = require('markdown-it-imsize');
const markdownItToc = require('markdown-it-toc-done-right');
const markdownItVideo = require('markdown-it-video');

// 11ty Plugins
const pluginReadingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {

  eleventyConfig.addWatchTarget("./site/_11ty");

  /**
   * Add Collections
   * @link https://www.11ty.dev/docs/collections/
   */
  Object.keys(collections).forEach(collectionName => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  });

  /**
   * Add Filters
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  });

  /**
   * Add Shortcodes
   * @link https://www.11ty.io/docs/shortcodes/
   */
  Object.keys(shortcodes).forEach(shortcodeName => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  });

  /**
   * Add Transforms
   * @link https://www.11ty.io/docs/config/#transforms
   */
  Object.keys(transforms).forEach(transformName => {
    eleventyConfig.addTransform(transformName, transforms[transformName])
  });

  /**
   * Add plugins
   * @link https://www.11ty.dev/docs/plugins/
   */
  eleventyConfig.addPlugin(pluginReadingTime);
  eleventyConfig.addPlugin(pluginRss);

  /**
   * Set custom markdown library instance
   * @link https://www.11ty.dev/docs/languages/liquid/#optional-set-your-own-library-instance
   */
  eleventyConfig.setLibrary('md',
      markdownIt({
        html: true,
        breaks: true,
        typographer: true
      }).use(markdownItAnchor, {
        permalink: true,
        permalinkSymbol: '#',
        permalinkClass: 'bookmark',
        permalinkBefore: false,
        level: 2
      }).use(markdownItCollapsible
       ).use(markdownItImageSize, {
        autofill: true
      }).use(markdownItToc, {
        containerClass: 'md-toc',
        containerId: 'md-toc',
        level: 2
      }).use(markdownItVideo, {
        youtube: { width: 640, height: 390 },
        vimeo: { width: 500, height: 281 },
        vine: { width: 600, height: 600, embed: 'simple' },
        prezi: { width: 550, height: 400 }
      }).use(markdownItFootnote)
  );

  /**
   * Passthrough file copy
   * @link https://www.11ty.io/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('files');
  eleventyConfig.addPassthroughCopy('_redirects');

  /**
   * Opts in to a full deep merge when combining the Data Cascade.
   * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
   */
  eleventyConfig.setDataDeepMerge(true);

  /**
   * Override BrowserSync Server options
   * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
   */
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');
        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  /**
   * Configuration
   * @link https://www.11ty.dev/docs/config/#configuration-options
   */
  return {
    dir: {
      input: 'site',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
      output: 'dist' // publish directory
    },
    passthroughFileCopy: true,
    templateFormats : ['njk', 'md', 'html', '11ty.js'],
    htmlTemplateEngine : 'njk',
    markdownTemplateEngine : 'njk',
  };

};
