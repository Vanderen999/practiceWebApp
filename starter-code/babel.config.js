module.exports = {
  presets: [
    // 3 options false === no polyfills, entry === manually add them, usage === adds auto if needed. https://babeljs.io/docs/babel-preset-env#corejs
    [
      "@babel/preset-env",
      { useBuiltIns: "usage", corejs: { version: "3.8", proposals: true } },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  // the react hot modual reloader
  //   plugin: ["react-refresh/babel"],
};
