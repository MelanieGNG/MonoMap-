import express from 'express'
import 'dotenv/config' 
import { envs } from './config/envs.plugin'
import { MongoDatabase } from './data/init'
import { MonoModel } from './data/models/mono.model'
import { AppRoutes } from './presentation/route';
import { emailJob } from '../domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () =>
    await MongoDatabase.connect({
      dbName: "MonoCaseAPI",
      mongoUrl: envs.MONGO_URL ?? ""
    }))();
console.log(envs.MONGO_URL)
app.get('/', (req,res) => {
    res.send("Hola Mundo");
});

app.listen(envs.PORT, () => {
    console.log("Servidor esta corriendo")
    emailJob();

});

app.post("/", async(req, res) =>{
    const {lat, lng, genre, age, creationDate} = req.body;
    const newMonoCase = await MonoModel.create({
        lat: lat,
        lng: lng,
        genre: genre,
        age: age,
        creationDate: creationDate
    });

    res.send("Caso Registrado");

});