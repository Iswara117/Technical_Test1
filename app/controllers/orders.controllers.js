
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
                      approval: name_Approval.id
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
    if(dataOrder.approval === dataUser.id){
        if(dataOrder.isUpdate === false){
             await Order.update({
             statusOrder1: status,
             isUpdate: true,
            statusOrder2: "Review"}, 
            { where: { id : orderId, }, });
            return res.status(400).json({  message: "the data has been approved"})
            }else{
             return res.status(400).json({
             message: "update only 1 time"})}}
    }catch(error){
        return res.status(500).json({ message: error.message, })
    }
}

const updateStatusOrder2 = async (req, res) => {
    try {
      const { status, } = req.body
      const orderId = req.params.id
    
        if(status === "Approve"){
             await Order.update({
             statusOrder2: status,}, 
            { where: { id : orderId, }, });
            return res.status(400).json({  message: "the data has been approved"})
            }else if(status === "Reject"){
                await Order.update({
                    statusOrder2: status,
                    statusOrder1: "Reject"}, 
                   { where: { id : orderId, }, });
                   return res.status(400).json({  message: "the data has been approved"})
            }
            else{
             return res.status(400).json({
             message: "update only 1 time"})}

    }catch(error){
        return res.status(500).json({ message: error.message, })
    }
}






module.exports = {
    addOrder,
    updateStatusOrder1
}