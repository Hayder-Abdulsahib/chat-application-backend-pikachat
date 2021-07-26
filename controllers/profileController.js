const {Profile}= require("../db/models");

// fetchProfile
 exports.fetchProfile = async (profileId, next) => {
  try {
      const foundProfile = await Profile.findByPk(profileId)
      return foundProfile
  } catch (error) {
      next(error)
  }
 }
//profileData
 exports.profileData = async(req,res,next)=>{
    try {
        const profiles = await Profile.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"]}}
          );
        res.status(200).json(profiles);
       
      } catch (error) {
        next(error);
        
      }
 }
//Update
 exports.profileUpdate = async (req, res,next) => {
    try {
     if (req.file) {
       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
     }
    //  req.body.profileId= req.profile.id
         await req.profile.update(req.body);
         res.status(201).json(req.profile);
 
  } catch (error) {
     next(error);
 }
             };
//Create
 exports.profileAdd=async (req,res,next)=>{

    try {
    if (req.file) {
     req.body.profileImage = `http://${req.get("host")}/media/${req.file.filename}`;
   }
    const profileAdd = await Profile.create(req.body);
     console.log(profileAdd)
     res.status(201).json(profileAdd);
                    
 } catch (error) {
     next(error);
     }
            
 }