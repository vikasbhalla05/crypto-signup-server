const express = require('express')
const mongooseConnect = require('./db');
const app = express()
var cors = require('cors')
require("dotenv").config({ path: ".env" });
 
app.use(cors())

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

mongooseConnect();