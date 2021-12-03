const router = require('express').Router()
const envelopeCtrl = require('../controllers/envelopeCtrl')
const auth = require('../middlewares/auth')
const swaggerValidation = require('openapi-validator-middleware');

// swaggerValidation.init('../middlewares/validation.yaml');

router.get('/get', auth, envelopeCtrl.getAllEnvelopes)

router.post('/create', auth, envelopeCtrl.createEnvelope)

router.route('/update')
    .get(auth, envelopeCtrl.getOneEnvelope)
    .delete(auth, envelopeCtrl.deleteEnvelope)
    .put(auth, envelopeCtrl.updateEnvelope)

router.route('/transfer')
    .put(auth, envelopeCtrl.transfer)

// app.use((err, req, res, next) => {
//     if (err instanceof swaggerValidation.InputValidationError) {
//         return res.status(400).json({ more_info: JSON.stringify(err.errors) });
//     }
// });

module.exports = router;