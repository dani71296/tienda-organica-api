const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Organic Food Store API',
        description: 'API documentation for the Organic Food Store project (Part 1 - CRUD Operations).',
    },
   
    host: 'tienda-organica-api.onrender.com',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);