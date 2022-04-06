const Salary = require('../models/salaryModel')

const salaryCtrl = {
    
  addSalary: async (req, res) => {
    try {
      const { amount } = req.body;
           
      const salary = await Salary.findOne({ userId: req.user.id})

      if(salary) {
        const newAmount = amount
        salary.amount = newAmount
        salary.save()
        
      } else {
        const newSalary = new Salary ({ userId: req.user.id, amount })
        await newSalary.save()
        res.json(newSalary)
      }
    
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  getSalary: async (req, res) => {
    try {        
      const salary = await Salary.find({userId: req.user.id})

      if (!salary) return res.status(400).json({msg: "No salary available, please create one"})

      res.json(salary[0])

    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  updateSalary: async (req, res) => {
    try {
      const { amount } = req.body
      
      const salary = await Salary.findOne({userId: req.user.id})
      if (!salary) return res.status(400).json({msg: "This salary does not exists, please create it first"})
                   
      const newSalary = salary.amount

      newSalary.save()

      res.json({msg: `Previous salary: ${ salary.amount }, new salary is ${ amount }`})
               
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  deleteSalary: async (req, res) => {
    try {
      const {id} = req.body

      const query = await Salary.deleteOne({_id: id})    
      if (query.deletedCount === 0) return res.status(500).json({msg: "This salary could not be delete, please try again"})
                
      res.json({msg: `Deleted salary(${id}) with success.`})

    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = salaryCtrl;