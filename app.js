require('dotenv').config();
const check = require('./check');
const blocks = require('./blocks.json');

const main = async () => {
    const result = await check(blocks, process.env.TOKEN);
    console.log(result);
}

main();