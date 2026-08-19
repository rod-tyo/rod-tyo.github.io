const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Static assets — copy as-is to output
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/videos");

  // Plugin needed for {% renderFile %} style includes (optional, handy for critical CSS later)
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // ----- Collections -----
  // Case studies, sorted by "order" front matter (fallback: date)
  eleventyConfig.addCollection("caseStudies", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/case-studies/*.md")
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  // Design system process articles
  eleventyConfig.addCollection("designSystem", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/design-system/*.md")
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  // Motion UI pieces
  eleventyConfig.addCollection("motion", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/motion/*.md")
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  // Simple date filter, handy in templates if you show "last updated"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist",
    },
    // Markdown files run through Nunjucks too, so front matter layouts + {{ }} work inside .md
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
