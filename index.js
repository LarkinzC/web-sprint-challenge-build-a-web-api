
const server = require('./api/server')
require('dotenv').config()


let PORT = process.env.PORT || 9000

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})
