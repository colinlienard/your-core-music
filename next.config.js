module.exports = {
  reactStrictMode: true,
  env: {
      CLIENT_ID: "0f281f49e85e475384e205ed8ce5816d",
      CLIENT_SECRET: "161f97d7b0c14dfe8bb5046ae2016e13",
      REDIRECT_URI: "http://localhost:3000/stats",
      REDIRECT_URI_FR: "http://localhost:3000/fr/stats"
  },
  i18n: {
      locales: ["en", "fr"],
      defaultLocale: "en"
  },
  images: {
    domains: ["i.scdn.co"],
  }
}
