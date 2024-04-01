const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    swaggerDefinition: {
        info: {
            title: 'Sua API de Formulários (Incluindo Swagger)',
            version: '1.0.0',
            description: 'API para gerenciamento de formulários e respostas',
        },
        servers: [
            { url: 'http://localhost:3000' }, // Adjust as needed
        ],
    },
    apis: ['./src/routes/routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);


const swaggerDocs = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

}

module.exports = swaggerDocs;
