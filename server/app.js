const app = require('./pre-setup')

const port = 3001;
const server = app.listen(port);
console.log("Server running at port " + port)

module.exports = server;