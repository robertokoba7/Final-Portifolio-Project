// set up express
const express = require('express')
// set up body parser
const bodyParser = require('body-parser')
// run express
const app = express()
//set port number
const port = 5000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

// Templating engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Body Parser
app.use(bodyParser.urlencoded({ extended : true }))

// Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)
app.use('/article', newsRouter)

//app listening to the set port number
app.listen(port, () => console.log(`Listening on port ${port}`))