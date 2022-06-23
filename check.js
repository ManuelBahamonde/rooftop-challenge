const realAPI = require('./api/API');
const mockAPI = require('./api/mockAPI');

const check = async (blocks, token) => {
    const API = process.env.NODE_ENV === 'test' ? mockAPI : realAPI;

    let possibleBlocks = [...blocks.filter((b, index) => index !== 0)];
    const result = [blocks[0]];

    let currentBlockIndex = 0;
    while (possibleBlocks.length > 1) {
        const currentBlock = possibleBlocks[currentBlockIndex];
        reqCounter++;

        const areBlocksSequential = await API.checkBlocks(result[result.length - 1], currentBlock, token);
        if (areBlocksSequential) {
            // The next block is the current possible block. We'll add it to the result, remove it from the possible blocks and set current index back to 0
            result.push(currentBlock);
            possibleBlocks = possibleBlocks.filter((b) => b !== currentBlock);
            currentBlockIndex = 0;
        } else {
            // The next block is NOT the current possible block. Moving to the next possible block
            currentBlockIndex++;
        }
    }

    result.push(possibleBlocks[0]);
    return result;
};

module.exports = check;