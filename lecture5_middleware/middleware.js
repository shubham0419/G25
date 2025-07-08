
const genericMid = (req,res,next)=>{
  console.log("generic middleware");
  next();
}

const pathSpecific = (req,res,next)=>{
  console.log("/user path middleware");
  next()
}

function userVerify(req,res,next){
  console.log("api specific middleware");
  next();
}

module.exports = {genericMid,pathSpecific,userVerify}