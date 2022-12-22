const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    
    register: async (req, res) =>{
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Your password must be at least 6 characters long."})
            if(password === name || password === email)
                return res.status(400).json({msg: "Your password must be different than your name or email."})

            function emailIsValid (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            }
            if(!emailIsValid(email))
                return res.status(400).json({msg: "Your email must be valid"})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            const name = user.name
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            
            res.json({accesstoken})
            return name

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateEmail: async (req, res) => {
        try {
            const {newEmail, email} = req.body
            const existintgEmail = await Users.findOne({email: newEmail})
            if (existintgEmail === newEmail) {
                return res.status(400).json({msg: "This email is already taken, try with something else"})
            }
            const user = await Users.findOneAndUpdate({email}, {email: newEmail})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            return res.json({msg: "Email changed successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccount: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            return user
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAccount: async (req,res) => {
        try {
            const {user} = req.body

            const query = await Users.deleteOne({email: user})
            if (query.deletedCount === 0) return res.status(500).json({msg: "This user couldn't be delete, please try again"})

            res.json({msg: `Deleted user (${user}) with success.`})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user, {secretOrPrivateKey: `${process.env.ACCESS_TOKEN_SECRET}`}, { expiresIn: '7d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d'})
}

module.exports = userCtrl

