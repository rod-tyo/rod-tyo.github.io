const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // ----- Static Assets (Salin folder ke folder output 'dist') -----
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets"); 
  eleventyConfig.addPassthroughCopy("src/videos");

  // Plugin needed for {% renderFile %} style includes
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // ----- Collections -----
  // Collection untuk Works/Experiments
  eleventyConfig.addCollection("works", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/works/*.md")
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

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

  // Simple date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // ----- Config return settings -----
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist", // Output folder Anda adalah 'dist'
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};