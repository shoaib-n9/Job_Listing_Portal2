import { Company } from '../models/company.model.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: 'Company name is required.',
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: 'Company registered successfully.',
      company,
      success: true,
    });
  } catch (error) {
    console.log(Error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //USERID OF COMPANY LOGGED IN
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: 'Companies not found.',
        success: false,
      });
    }
  } catch (error) {
    console.log(Error);
  }
};

//GET COMPANY BY ID
export const getCompanById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: 'Company not found.',
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(Error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //CLOUDINARY WILL BE HERE

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
  } catch (error) {
    console.log(Error);
  }
};
