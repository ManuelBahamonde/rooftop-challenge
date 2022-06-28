const fs = require('fs');
const check = require('./check');
const config = require('./config/config.json')
const API = require('./api/API');

const main = async () => {
    const email = config.email;
    if (!email) {
        console.log('Invalid Email. Please enter a valid one in config/config.json file');
        return;
    }
    console.log(`Getting Token for mail ${email}...`);
    const token = await API.getToken(config.email);
    console.log(`Token was obtained! ${token}\n`);

    // Getting blocks
    console.log('Getting blocks...');
    const blocks = await API.getBlocks(token);
    console.log('Blocks were obtained!\n');

    // Getting result
    console.log('Getting result...');
    const result = await check(blocks, token);
    console.log('Result was obtained!\n');

    // Verifying result
    console.log('Verifying result...');
    const isCorrect = await API.checkSolution(result, token);
    console.log(isCorrect ? 'Result is correct!\n' : 'Result is not correct!\n');

    // Writing result into result.json file
    console.log('Writing result to result.json');
    fs.writeFileSync('./result.json', JSON.stringify(result));
}

main();