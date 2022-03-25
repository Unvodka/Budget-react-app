const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')


router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/profile', userCtrl.getAccount)

router.route('/update')
    .delete(userCtrl.deleteAccount)
    .put(userCtrl.updateEmail)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)


module.exports = router