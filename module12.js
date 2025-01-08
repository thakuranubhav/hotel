const os=require('os');
const fs=require('fs');
const user=os.userInfo();
console.log(user);
console.log(user.username);
fs.appendFile('greeting.txt','Hi ' +user.username+"!\n",()=>console.log("successfully created the file"));