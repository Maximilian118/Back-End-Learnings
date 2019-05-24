const http = require('http');

// http code reminder
const findCode = code => {
  let keys = Object.keys(http.STATUS_CODES)
  let values = Object.values(http.STATUS_CODES)

  for (let i = 0; i < keys.length; i++) {
    if (code == keys[i]) {
      console.log(values[i]);
    } 
  }
};

findCode(); // enter code