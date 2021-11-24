const router = require('express').Router()
const envelopeCtrl = require('../controllers/envelopeCtrl')
const auth = require('../middlewares/auth')

router.get('/get', auth, envelopeCtrl.getAllEnvelopes)

router.post('/create', auth, envelopeCtrl.createEnvelope)

router.route('/update')
    .get(auth, envelopeCtrl.getOneEnvelope)
    .delete(auth, envelopeCtrl.deleteEnvelope)
    .put(auth, envelopeCtrl.updateEnvelope)

router.route('/transfer')
    .put(auth, envelopeCtrl.transfer)


module.exports = router;