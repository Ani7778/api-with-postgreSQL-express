import swaggerJsdoc from "swagger-jsdoc";
import express from 'express';
const app = express();
import userRoutes from './routes/userRoutes.mjs';
import dotenv from 'dotenv'
dotenv.config();
//import db from './modules/database.mjs';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT;
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

app.use('/users', userRoutes);

const options = {
    definition: {
        info: {
            title: "User API",
            version: "0.1.0",
            description:
                "User API with Express and documented with Swagger",
            contact: {
                name: "User API"
            },
        },
        servers: [
            {
                url: "http://localhost:3000/users"
            },
        ],
    },
    apis: ["./routes/userRoutes.mjs"]
};

const specs = await swaggerJsdoc(options);

app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.listen(port, function () {
    //db.sync();
    console.log(`Listening on port ${port} ...`)
});
