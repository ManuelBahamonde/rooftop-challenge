const axios = require('axios');

const API = axios.create({
    baseURL: 'http://rooftop-career-switch.herokuapp.com/',
});

const checkBlocks = (block1, block2, token) => {
    const blocks = [block1, block2];

    return API.post('/check', { blocks }, { params: { token } })
        .then((response) => response.data.message);
};

const checkSolution = (blocks, token) => {
    const encoded = blocks.join('');

    return API.post('/check', { encoded }, { params: { token } })
        .then((response) => response.data.message);
};

module.exports = {
    checkBlocks,
    checkSolution,
};