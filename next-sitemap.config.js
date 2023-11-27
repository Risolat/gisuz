let policy = {
  userAgent: "*",
};

if (process.env.ENVIRONMENT !== "production") {
  policy.disallow = "/";
}

module.exports = {
  siteUrl: "https://www.gis.uz",
  generateRobotsTxt: true,
  tobotsTxtOptions: {
    policies: [policy],
  },
  outDir: "./out",
};
