// modules
import express from 'express';
import cors from 'cors';
import sequelize from './src/data/sequelize.js';
import bodyParser from "body-parser";
import csvRoutes from './src/csv/csvRoutes.js';

// routes
import routes from './src/data/routes/index.js';

// rate limiter middleware
import { limiter } from './src/data/libs/middleware.js';

// dummy data insertion handler
import insertDummyData from './insertDummyData.js';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

const corsOptions = {
    origin: "http://localhost:5000"
  };
  
app.use(cors(corsOptions));

app.use(limiter);

// parse requests of content-type - application/json
app.use(express.json());


const PORT = process.env.PORT || 5000;

app.listen(PORT, function (){
    console.log('listening on port ' + PORT );
})

app.get('/', function (req, res){
    res.json({ message: "Hello world!" });
    console.log('listening on port ')
});

app.use("/api", routes);

insertDummyData();

csvRoutes(app);

try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}