
const { Op } = require('sequelize')
const { Order, User } = require('../models')

const addOrder =  async(req , res) =>{
   try{
        const{driver, jenisKendaraan, jumlahOrang, panjangBarang, lebarBarang, tinggiBarang,  jumlahBarang, beratAktual, Approval} = req.body
        const userId = req.user.id
        const orderingBy = req.user.fullName
        const driverNow = await Order.findOne({ where: 
            { driver: driver},
        });
        
        const name_Approval = await User.findOne({ where: 
            { fullName: Approval},
        });
        
        console.log(name_Approval.id, "data id approval")
        
        
        const today = new Date();
        

        if(driverNow){
            const driver_date = driverNow.createdAt
            const date1 = driver_date.getDate()
            const date = today.getDate()
           if(date1 === date){
                return res.status(400).json({
                    message: "sorry drivers can only deliver goods in one day only 1 time"
                })
            } 
        } 
        if(jenisKendaraan == "Angkutan Orang"){
            let totalPriceAO = jumlahOrang * 50000
            // console.log(totalPrice,"harga")
            await Order.create(
                {
                    driver,
                    jenisKendaraan,
                    userId: name_Approval.id,
                    createBy: userId,
                    createdAt: today,
                    muatan: jumlahOrang,
                    totalPrice: totalPriceAO,


                }
            )
        }
        if(jenisKendaraan == "Angkutan Barang"){
            let CBM = []
            let nonCBM = [] 
            console.log(panjangBarang,lebarBarang,tinggiBarang,"ini data barang")
            let volume = panjangBarang * lebarBarang * tinggiBarang
            console.log(volume)
            let totalMuatan = volume*jumlahBarang
            if(volume === beratAktual){
              let totalPrice = (volume/4000)*jumlahBarang
              nonCBM.push(totalPrice)
              console.log(totalMuatan, "total muatan")
              await Order.create(
                {
                    driver,
                    jenisKendaraan,
                    userId: name_Approval.id,
                    createdBy: userId, 
                    createdAt: today,
                    totalPrice: nonCBM,
                    muatan: totalMuatan
                }
            )
            }else if(volume > beratAktual){
                let totalPrice = (volume*jumlahBarang)*20000
                console.log(totalPrice)    
                CBM.push(totalPrice)
                console.log(CBM)    
                await Order.create(
                  {
                      driver,
                      jenisKendaraan,
                      userId: userId,
                      createdAt: today,
                      totalPrice: CBM,
                      muatan: totalMuatan,
                      createBy: name_Approval.id
                  }
              )
              }
        }
        
        
        res.status(200).json({
            status: "success",
            meesage: `success add new order by ${orderingBy}`,
          });
        
        
    }catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message,
        });
    }
}

const updateStatusOrder1 = async  (req, res) => {
    try {
      const { status, } = req.body
      const orderId = req.params.id
      const userId = req.user.id
      console.log(userId)
      console.log(orderId)
      const dataUser = await User.findOne({ where:  { id : userId},});

      const dataOrder = await Order.findOne({ where: { id : orderId},});
    console.log(dataOrder)
    console.log(dataUser.id, "ini id user")
    if(dataOrder.userId === dataUser.id){
        return res.status(400).json({  message: "sorry you can't access"})
    }
        if(dataOrder.isUpdate === false){
            if(status === "Approve"){
                await Order.update({
                    statusOrder1: status,
                    isUpdate: true,
                   statusOrder2: "Review",}, 
                   { where: { id : orderId, }, });
                   return res.status(400).json({  message: "yeay my data is approve"})
            }
            else if(status === "Reject"){
                await Order.update({
                    statusOrder1: status,
                    isUpdate: true,
                   statusOrder2: "Review",}, 
                   { where: { id : orderId, }, });
                   return res.status(400).json({  message: "yahhh my data is rejected"})
            }
            }else{
             return res.status(400).json({
             message: "update only 1 time"})}
    }catch(error){
        return res.status(500).json({ message: error.message, })
    }
}

const updateStatusOrder2 = async (req, res) => {
    try {
      const { status, } = req.body
      const {id} = req.params
      const dataOrder = await Order.findOne({ where: { id,},});

      if(dataOrder.isUpdate2 == true){
        return res.status(400).json({
            message: "update only 1 time"})
      }

      if(dataOrder.statusOrder1 === "Reject"){
        return res.status(400).json({
            message: "sorry this data has reject"})
      }

        if(status === "Approve"){
             await Order.update({
             statusOrder2: status,}, 
            { where: { id, }, });
            return res.status(400).json({  message: "yeay my data is approve"})
            }
            
        if(status === "Reject"){
            await Order.update({
            statusOrder2: status,
            statusOrder1: "Reject"}, 
            { where: { id, }, });
            return res.status(400).json({  message: "yahhh my data is rejected"})
            }
             

    }catch(error){
        return res.status(500).json({ message: error.message, })
    }
}


const getData_Need_Approval = async (req, res) => {
    try {
    //   const { status, } = req.body
    //   const {id} = req.params
      const userId = req.user.id
      const dataOrder = await Order.findAll({ where:{  userId,}});

      console.log(dataOrder)
      res.status(200).json({
        status: "success",
        dataOrder,
      });
    }catch(error){
        return res.status(500).json({ message: error.message, })
    }
}

const getData_Create_Order = async (req, res) => {
    try {
    //   const { status, } = req.body
    //   const {id} = req.params
      const userId = req.user.id
      const dataOrder = await Order.findAll({ where:{  createBy: userId,}});

      console.log(dataOrder)
      res.status(200).json({
        status: "success",
        dataOrder,
      });
    }catch(error){
        return res.status(500).json({ message: error.message, })
    }
}





module.exports = {
    addOrder,
    updateStatusOrder1,
    updateStatusOrder2,
    getData_Need_Approval,
    getData_Create_Order
}