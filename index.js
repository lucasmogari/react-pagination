if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-pagination.production.min.js');
} else {
  module.exports = require('./dist/react-pagination.development.js');
}
