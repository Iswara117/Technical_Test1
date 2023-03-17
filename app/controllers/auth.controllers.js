const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User} = require('../models');


 const signin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email.toLowerCase() },
      }); // mencari user berdasarkan email 
  
      if (!user){
            return res.status(404).json({message: "User Not Found", })
        };  //validasi user tidak ditemukan
      const {password} = user;
      let token;
      const compare = bcrypt.compareSync(req.body.password, password) 
      if (compare) {
        /* jika password yang dimasukan benar dengan password yang ada di database
         maka generate token  untuk user yg success login */
        const token = jwt.sign(
          {
            id: user.id,
          },
          "rahasia",
        )

        res.json({
          status: "success",
          message: "Login successfully",
          data: user,
          token,
        });
  
      } else{
        return res.status(401).json({message: "Password Incorect", }) // bila password salah maka akan keluar respon code 404
      }
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "failed",
        message: error.message,
      });
    }
  };


  module.exports = {signin}