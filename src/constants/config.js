const locale = "en"; // default local is en

const APPCONFIG = {
  locale: locale,
  apiURL:
    process.env.NODE_ENV === "development"
      ? "https://test.bigchaindb.com/api/v1/"
      : "https://test.bigchaindb.com/api/v1/", // set test net for demo version
};

export default APPCONFIG;
