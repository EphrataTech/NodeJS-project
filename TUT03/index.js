const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log("HELLO I’M HERE 🐣");
console.log("Current DateTime:", format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
console.log("Random UUID:", uuid());