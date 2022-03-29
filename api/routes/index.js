const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoutes')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)    
}