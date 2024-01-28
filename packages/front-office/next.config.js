const withTM = require("next-transpile-modules")(["./../shared-components"]);

const BASE_PATH = process.env.FRONT_OFFICE_BASE_PATH || "";

module.exports = withTM({
  basePath: BASE_PATH,
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
  },
  images: {
    domains: ["cryptologos.cc", "via.placeholder.com"],
  },
});
