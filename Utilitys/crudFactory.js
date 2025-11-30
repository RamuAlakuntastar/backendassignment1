const getAllFactory = (factoryModel) => {
    return async function(req, res) {
     try{
      
        const userDetails = await factoryModel.find()
        if(!userDetails){
            return res.status(404).json({
                status:"failure",
                message: "No users found"
            })  
        } 
        res.status(200).json({
            status:"success",
            userDetails
        })
     }catch(e){
         res.status(500).json({
            status:"failure",
            message: e.message
         })
     }
}
} 

const createFactory = (factoryModel) => {
    return  async function(req, res) {
    try {
        const user = req.body;
        const newUser = await factoryModel.create(user);
        if(!newUser){
           return res.status(400).json({
                status:"failure",
                message: "User creation failed"
           })
        }
        res.status(201).json({
            status: "success",
            newUser
        })
    }catch(e) {
        res.status(500).json({
            status:"failure",
            message: e.message
        })
    }
} 
}

const getFactoryById = (factoryModel) => {
    return async function(req, res) {
    try{
        const id = req.params.userId;
        const userDetails = await factoryModel.findById(id)
        if(!userDetails) {
            return re.status(404).json({
                status:"failure",
               message : `User not found by ${userDetails}`
            })
        }
        res.status(200).json({
            status:"success",
            userDetails
        })

    }catch(e) {
        res.status(500).json({
            status:"failure",
            message: e.message
        })
    }
}
} 

const deleteFactoryById = (factoryModel) => {
    return async function(req, res) {
    try{
        const id = req.params.userId;
        const deletedUser = await factoryModel.findByIdAndDelete(id)
        if(!deletedUser) {
           return res.status(404).json({
                status:"failure",
                message: `User not found by ${id}`
           })
        }
        res.status(200).json({
            status:"success",
            message: "User deleted successfully"
        })
    }catch (e) {
        res.status(500).json({
            status:"failure",
            message: e.message
        })  
    }
}
} 


module.exports = {
    getAllFactory,
    createFactory,
    getFactoryById,
    deleteFactoryById
}