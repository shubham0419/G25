let otp = "";
function generateOtp(len){
  try {
    otp = "";
    for(let i=0;i<len;i++){
      otp += Math.floor(Math.random()*10);
    }
    return otp;
  } catch (error) {
    throw error;
  }
}

function verifyOtp(userOtp){
  try {
    if(otp==userOtp){
      otp="";
      return true;
    }
    throw new Error("otp not matched")
  } catch (error) {
    throw error;
  }
}

module.exports = {generateOtp,verifyOtp}