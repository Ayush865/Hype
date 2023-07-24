import User from "../models/User.js"

export const search=async (req,res)=>{
    let { id, keyword, start, limit } = req.query;

  try {
    if (parseInt(start) === 0) {
      start = 1;
    }
    const skip = parseInt(start - 1) * parseInt(limit);

   let data = await User.aggregate([
      {
       '$match': {     
          
          '$or': [
            { "firstName": { '$regex': new RegExp(`^${keyword}`), $options: 'i' } },
            { "name": { '$regex': new RegExp(`^${keyword}`), $options: 'i' }}
          ]      
          
        }
      },
      {
        '$project': {firstName:1,lastName:1,picturePath:1}
      },
      {'$sort': { "firstName": 1 } },
      { '$skip': skip },
      {'$limit' : parseInt(limit)},
      
   ])
    
    data = data.filter((elm)=> { return elm._id!=id});
    
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: -1,
      data: {
        err: {
          generatedTime: new Date(),
          errMsg: err.message,
          msg: "Internal Server Error.",
          type: err.name,
        },
      },
    });
  }

}