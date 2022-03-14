const User = require('../models/Use');
// require('dotenv').config()

class UserController {
    //GET ALL USER
    async getAllUser(req, res) {
        try{
            const user = await User.find();
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err)
        }
    }

    //DELETE USER
    async deleteUser(req, res) {
        try{
            const user = await User.findById(req.params.id);
            // const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('delete succesfully')
        }catch(err){
            res.status(500).json(err)
        }
    }
}

module.exports = new UserController();