const axios = require('axios');
const minimist = require('minimist');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// read name arg
const name = minimist(process.argv.slice(2)).name;
// const name = 'Jeremy Hansen III'; // correct one
// const name = 'Jeremy Hansen IV'; // wrong one

if (!name) {
  console.error('Provide the name first!');
  process.exit(1)
}

async function main() {
  // get proof we're on the list
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name)
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
