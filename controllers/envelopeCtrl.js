const Envelopes = require('../models/envelopeModel')
const Actions = require('../models/actionModel')

const envelopeCtrl = {
    
    createEnvelope: async (req, res) => {
      try {
        const { name, amount } = req.body;
        const envelope = await Envelopes.findOne({name: name, userId: req.user.id})

        if(envelope) return res.status(400).json({msg: "This envelope already exists."})

        const newEnvelope = new Envelopes ({ name: name.charAt(0).toUpperCase() + name.slice(1), userId: req.user.id, amount })

        await newEnvelope.save()
        res.json(newEnvelope)
              
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    },
    getAllEnvelopes: async (req, res) => {
      try {
        const envelopes = await Envelopes.find({userId: req.user.id})
        if (!envelopes) return res.status(400).json({msg: "No envelope available, please create one"})

        res.json(envelopes)

      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },
    getOneEnvelope: async (req, res) => {
      try {
        const {name} = req.body
        const envelope = await Envelopes.findOne({name: name})

        if (!envelope) return res.status(400).json({msg: "This envelope does not exists, please create it first"})

        res.json(envelope)
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },
    updateEnvelope: async (req, res) => {
      try {
        const {name, transaction} = req.body
        const envelope = await Envelopes.findOne({name: name.charAt(0).toUpperCase() + name.slice(1)})

        if (!envelope) return res.status(400).json({msg: "This envelope does not exists, please create it first"})

        if(envelope && transaction) {
                        
          const newAmount = transaction
          const action = new Actions({envelopeId: envelope.id, transaction})
                        
          envelope.amount = newAmount

          envelope.save()

          action.save()
          res.json({msg: `New amount: ${ transaction } $`, envelope, action})
          
        } else {
          res.json({msg: `Something went wrong, please try again`})
        }
                
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },
    transfer: async (req, res) => {
      try {
        const {nameFrom, transaction, nameTo} = req.body                 
        const transactionParsed = parseInt(transaction, 10)
        const envelopeFrom = await Envelopes.findOne({name: nameFrom})
        const envelopeTo = await Envelopes.findOne({name: nameTo})

        if (!envelopeTo) return res.status(400).json({msg: "This envelope does not exists, please create it first"})
        if (!envelopeFrom) return res.status(400).json({msg: "This envelope does not exists, please create it first"})

        if(envelopeFrom.amount > transactionParsed) {
                        
            envelopeFrom.amount = envelopeFrom.amount - transactionParsed
            envelopeTo.amount = envelopeTo.amount + transactionParsed

            envelopeTo.save()
            envelopeFrom.save()

            const actionFrom = new Actions({envelopeId: envelopeFrom.id , transactionParsed})
            const actionTo = new Actions({envelopeId: envelopeTo.id, transactionParsed})

            actionFrom.save()
            actionTo.save()
            res.json({msg: `Transfered founds successfully`, envelopeFrom, envelopeTo, actionFrom, actionTo})

        } else {
          res.json({msg: `Not enaugh founds`})
        }
                    
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },

    deleteEnvelope: async (req, res) => {

      try {
        const {id} = req.body
        const query = await Envelopes.deleteOne({_id: id})
                
        if (query.deletedCount === 0) return res.status(500).json({msg: "This envelope could not be delete, please try again"})
                    
        res.json({msg: `Deleted envelope(${id}) with success.`})

      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },
    deleteAllEnvelopes: async (req, res) => {
      try {
        const {email} = req.body
        const query = await Envelopes.deleteMany({email})

        if (query.deletedCount === 0) return res.status(500).json({msg: "This envelope could not be delete, please try again"})

        res.json({msg: `Deleted all envelopes for user (${email}) with success.`})

      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    }
}

module.exports = envelopeCtrl