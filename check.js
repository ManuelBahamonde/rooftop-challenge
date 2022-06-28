const realAPI = require('./api/API');
const mockAPI = require('./mock/mockAPI');

const check = async (blocks, token) => {
    // If we are in test environment, we'll use a Mock API. Otherwise, we'll use the Real API
    const API = process.env.NODE_ENV === 'test' ? mockAPI : realAPI;

    // The first block is always in the correct position, so we'll remove it from the blocks array and add it to the solution
    const firstBlock = blocks.shift();
    const result = [firstBlock];

    let currentBlockIndex = 0;
    while (blocks.length > 1) {
        const currentBlock = blocks[currentBlockIndex];

        const areBlocksSequential = await API.checkBlocks(result[result.length - 1], currentBlock, token);
        if (areBlocksSequential) {
            // The next block is the current possible block. We'll add it to the result, remove it from the possible blocks and set current index back to 0
            result.push(currentBlock);
            blocks.splice(blocks.indexOf(currentBlock), 1);
            currentBlockIndex = 0;
        } else {
            // The next block is NOT the current possible block. Moving to the next one...
            currentBlockIndex++;
        }
    }

    result.push(blocks[0]);
    return result;
};

module.exports = check;