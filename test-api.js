const fs = require('fs');
fetch('http://localhost:3000/api/generate-video', {
  method: 'POST',
  body: new FormData()
}).then(res => res.text()).then(console.log).catch(console.error);
