//Takes in url db entry and returns object representing with shortened url
const chars = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
const l = chars.length;
// will take a base 10 number in and return a base 58 string that represents our shortned url
const b58Encode = (num) => {
	let encoded = '';
	while (num) {
    let remainder = num % l;
    num = Math.floor(num / l);
    encoded = chars[remainder].toString() + encoded;
  }
  console.log(encoded);
  return encoded;
}

const b58Decode = (str) => {
  var decoded = 0;
  while (str){
    var index = chars.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(l, power));
    str = str.substring(1);
  }
  return decoded;
}


module.exports.encode = b58Encode;
module.exports.decode = b58Decode;

