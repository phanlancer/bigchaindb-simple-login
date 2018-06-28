const locale = 'en'; // default local is en

const APPCONFIG = {
  locale: locale,
  apiURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/v1/'
        : 'http://localhost:3000/api/v1/'
}

export default APPCONFIG;
