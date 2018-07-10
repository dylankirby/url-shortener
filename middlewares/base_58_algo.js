//Takes in url db entry and returns object representing with shortened url

const chars = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base58 = chars.length; 

// will take a base 10 number in and return a base 58 string that represents our shortned url
let b58Encode = (num) => {
  let encodedUrl = "";
  while(num){
    let rem = num % base; //determines remainder of the number divded by lenght of 58 character base
    num = Math.floor(num / base); // sets num to rounded down num divded by base
    encodedUrl = alphabet[rem].toString() + encoded; //adds a new character to the encoded url string
  }
  return encodedUrl;
}

let b58Decode = (str) => {
	let decodedUrl = 0;
	while(str){
		let index = chars.indexOf(str[0]);
		let power = str.length - 1;
		decodedUrl += index * (base58 ** power);
		str = str.substring(1);
	}
	return decodedUrl
}


module.exports.encode = b58Encode;
module.exports.decode = b58Decode;

