let policy = {
  userAgent: "*",
};

if (process.env.ENVIRONMENT !== "production") {
  policy.disallow = "/";
}

module.exports = {
  siteUrl: process.env.URL,
  generateRobotsTxt: true,
  tobotsTxtOptions: {
    policies: [policy],
  },
  outDir: "./out",
};
