const { mockSolution } = require('../mock/mockAPI');
const blocks = require('../mock/mockBlocks.json');
const check = require('../check');

describe('Check function', () => {
    test('It should correctly sort an array of strings passed to it and return it', async () => {
        const result = await check(blocks, ''); // We don't need a token when testing because we are using a mock API.

        expect(result.join('')).toEqual(mockSolution.join(''));
    });
});