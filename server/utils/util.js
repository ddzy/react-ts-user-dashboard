const utility = require('utility');



// 加密
function md5(pwd) {
  pwd = 'thisisuserdashboard' + pwd; 

  return utility.md5(utility.md5(pwd));
}


module.exports = {
  md5,
};