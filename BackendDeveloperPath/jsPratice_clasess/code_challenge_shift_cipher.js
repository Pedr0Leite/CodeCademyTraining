class ShiftCipher{
    constructor(shift) {
        this.shift = shift;
      }

      encrypt(string){
        let encryptString = '';
        const tempString = string.toUpperCase();
        for(var i = 0; i < tempString.length; i++){
            let charCodeAt = tempString.charCodeAt(i);
            if(charCodeAt <= 90 && charCodeAt >= 65){
              charCodeAt += this.shift;

              if(charCodeAt > 90){
                charCodeAt -= 26;
              }
            }
            encryptString += String.fromCharCode(charCodeAt);
        }
        return encryptString;
      }

      decrypt(encryptString){
        let decryptString  = '';
        const tempString = encryptString.toLowerCase();
        
        for(var i = 0; i < tempString.length; i++){
          let charCodeAt = tempString.charCodeAt(i);
          if(charCodeAt <= 122 && charCodeAt >= 97){
            charCodeAt -= this.shift;
              
              if(charCodeAt < 97){
                charCodeAt += 26;
              }
            }
            decryptString += String.fromCharCode(charCodeAt);
          }
          return decryptString;
        }
}


const cipher = new ShiftCipher(2);
console.log(cipher.encrypt('I love to code!')); // returns 'K NQXG VQ EQFG!'
console.log(cipher.decrypt('K <3 OA RWRRA')); // returns 'i <3 my puppy'