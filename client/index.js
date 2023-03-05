const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
    // TODO: how do we prove to the server we're on the nice list? 
    let merkelTree = new MerkleTree(niceList)
    let root = merkelTree.getRoot()
    const name = 'Zhanna';
    const index = niceList.findIndex(n => n === name);
    let proof = merkelTree.getProof(index)
    
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
      name: name,
      root: root,
      proof:proof
  });
    
  console.log({ gift });
}

main();