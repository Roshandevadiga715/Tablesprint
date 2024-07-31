import User from "../models/user.js"
import jwt from "jsonwebtoken"

export const userAuthentication = (req, res, next) => {
    const token = req.headers['authentication'];
    console.log("Authent",token)
    let tokenData
    try {
        tokenData = jwt.verify(token, process.env["JWT_TOKEN"])
        console.log("tokendata",tokenData)
        User.findById(tokenData.id)
            .then((user) => {
                req.user = user
           console.log("user",req.user)
                next()
            })
            .catch((err) => {
                res.json(err.message)
            })
    }
    catch (e) {
        res.json(e.message)
    }



}
