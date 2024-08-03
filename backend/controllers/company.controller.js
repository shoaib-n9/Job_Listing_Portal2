import {Company} from "../models/company.model.js"

export const registerCompany = async(req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            })
        }
        let commpany = await 
    } catch (error) {
        
    }
}