const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = "cb37ee512d60aa9db7a2ae8b956251a931df2214f432e0e5c59f4ade5c243a59";
//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/index.html');
//});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.js');
});
app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
    const body = req.body;
    console.log('bodyyy: ', JSON.stringify(body))
    // TODO: prove that a name is in the list 
    const proof = body.proof
    const name = body.name
    const root = body.root
    
    const isInTheList = verifyProof(proof, name, root)
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
