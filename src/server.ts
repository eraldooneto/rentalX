import 'reflect-metadata';
import express from 'express';
import { router } from './routes';

import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';

import './database';

//import './database/datasource-config';

import './shared/container';


const app = express();
const port = 3333;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});