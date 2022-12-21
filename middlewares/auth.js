const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication, no token"})

        jwt.allowInsecureKeySizes=true
        jwt.secretOrPrivateKey='7SY3XLANPGLcJ3XphDM45MqzwbrxAFznr2NKEpASW4ejVzny4T'
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || req.user.accesstoken, (err, user) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication, wrong token"})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth