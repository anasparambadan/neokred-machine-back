import userModel from "../model/userModel.js";

export const getProfile = async(req,res)=>{
  
       
        const id = req.user.id
        
    
    
        try {
            const user = await userModel.findById(id);
            if (user) {
    
                const { password, ...otherDetails } = user._doc
                res.status(200).json(otherDetails)
            }
            else {
                res.status(404).json("No user found")
            }
    
        } catch (error) {
            res.status(500).json(error)
    
        }
    

}