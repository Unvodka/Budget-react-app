const router = require('express').Router()
const salaryCtrl = require('../controllers/salaryCtrl')
const auth = require('../middlewares/auth')
const swaggerValidation = require('openapi-validator-middleware');

router.post('/create', auth, salaryCtrl.addSalary)

router.get('/get', auth, salaryCtrl.getSalary)

module.exports = router;