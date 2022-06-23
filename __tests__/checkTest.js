const { mockSolution } = require('../api/mockAPI');
const blocks = require('../blocks.json');
const check = require('../check');

describe('Check function', () => {
    test('It should correctly sort an array of strings passed to it and return it', async () => {
        const result = await check(blocks, process.env.TOKEN);

        expect(result.join('')).toEqual(mockSolution.join(''));
    });
});