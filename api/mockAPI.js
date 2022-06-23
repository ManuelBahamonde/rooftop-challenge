const blocks = require('../blocks.json');
const mockSolution = [blocks[0], ...blocks.filter((b, i) => i !== 0).sort(() => Math.random() > 0.5 ? 1 : -1)];

const checkBlocks = async (block1, block2, token) => {
    return mockSolution.indexOf(block2) === (mockSolution.indexOf(block1) + 1);
};

const checkSolution = async (blocks, token) => {
    const encodedGuess = blocks.join('');
    const encodedSolution = mockSolution.join('');

    return encodedGuess === encodedSolution;
};

module.exports = {
    mockSolution,
    checkBlocks,
    checkSolution,
};