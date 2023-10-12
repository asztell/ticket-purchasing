const path = require('path')
// const { requiresAuth } = require('express-openid-connect')

const routes = (app, fs) => {
  const dataPath = path.resolve(__dirname, './data/events.json')

  app.get('/events', (req, res) => {
    console.log('GET /events')
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) throw err
      console.log('data', data)
      res.send(JSON.parse(data))
    })
  })

  app.post('/checkout', (req, res) => {
    console.log('POST /checkout')
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) throw err
      console.log('data', data)
      res.send(JSON.parse(data))
    })
  })

  app.get('/', function (req, res, next) {
    // console.log('isAuthenticated', req.oidc.isAuthenticated())
    res.render('index', {
      title: "Arpeazy's Auth0 login"
      // isAuthenticated: req.oidc.isAuthenticated()
    })
  })

  // app.get('/profile', requiresAuth(), function (req, res, next) {
  app.get('/profile', function (req, res, next) {
    // console.log("requiresAuth()", requiresAuth());
    res.send('profile', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'Profile page'
    })
  })
}

module.exports = routes
