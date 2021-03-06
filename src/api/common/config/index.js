import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  require('dotenv-safe').config({
    path: path.join(__dirname, '../../../../.env'),
    sample: path.join(__dirname, '../../../../.env.example'),
  })
}

const index = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    syncModels: process.env.SYNC_MODELS || false,
    syncForce: process.env.SYNC_FORCE || false,
    db: {
      options: {
        dialect: 'mysql',
        timezone: '+09:00',
        logging: false,
        benchmark: false,
        retry: {
          match: [/SequelizeConnectionError/],
          max: 2,
        },
      },
    },
    naver: {
      host: 'https://openapi.naver.com/v1/search/book_adv.json',
      clientId: process.env.NAVER_BOOK_API_CLIENT_ID,
      clientSecret: process.env.NAVER_BOOK_API_CLIENT_SECRET,
    }
  },
  test: {
    syncModels: true,
    syncForce: true,
    db: {
      uri: requireProcessEnv('DB_TEST_URI'),
    },
  },
  development: {
    syncModels: false,
    syncForce: false,
    db: {
      uri: requireProcessEnv('DB_TEST_URI'),
      options: {
        logging: console.log,
      },
    },
  },
  production: {
    db: {
      uri: requireProcessEnv('DB_TEST_URI'),
    },
  },
}

module.exports = merge(index.all, index[index.all.env])
export default module.exports
