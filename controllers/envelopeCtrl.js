const Envelopes = require('../models/envelopeModel')
const Actions = require('../models/actionModel')

function add (a, b) {
    a + b 
}

const envelopeCtrl = {
    
        createEnvelope: async (req, res) => {
          try {
            const { name, amount } = req.body;
            
            const envelope = await Envelopes.findOne({name: name, userId: req.user.id})
            if(envelope) return res.status(400).json({msg: "This envelope already exists."})


            const newEnvelope = new Envelopes ({ name, userId: req.user.id, amount })
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
                const {name, transaction, description} = req.body

                const envelope = await Envelopes.findOne({name: name})
                if (!envelope) return res.status(400).json({msg: "This envelope does not exists, please create it first"})

                if(envelope.amount > transaction) {
                    
                    const newAmount = envelope.amount - transaction
                    
                    envelope.amount = newAmount

                    envelope.save()

                    const action = new Actions({description, envelopeId: envelope.id, transaction})
                    action.save()
                    res.json({msg: `Previous amount: ${ envelope.amount + transaction } $`, envelope, action})

                    
                } else {
                    res.json({msg: `Not enaugh founds!`})
                }
               
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
        transfer: async (req, res) => {
            try {
                const {nameFrom, transaction, nameTo} = req.body
                
                const envelopeFrom = await Envelopes.findOne({name: nameFrom})
                const envelopeTo = await Envelopes.findOne({name: nameTo})
                
                if (!envelopeTo) return res.status(400).json({msg: "This envelope does not exists, please create it first"})
                if (!envelopeFrom) return res.status(400).json({msg: "This envelope does not exists, please create it first"})

                if(envelopeFrom.amount > transaction) {
                    envelopeFrom.amount = envelopeFrom.amount - transaction
                    envelopeTo.amount = envelopeTo.amount + transaction
                    

                    envelopeTo.save()
                    envelopeFrom.save()

                    const actionFrom = new Actions({envelopeId: envelopeFrom.id , transaction})
                    const actionTo = new Actions({envelopeId: envelopeTo.id, transaction})
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
                const query = await Envelopes.deleteOne({id})
               
                if (query.deletedCount === 0) return res.status(500).json({msg: "This envelope could not be delete, please try again"})
                
                res.json({msg: `Deleted envelope(${id}) with success.`})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        }
}

module.exports = envelopeCtrl