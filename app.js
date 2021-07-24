import express from 'express'
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import middlewares from './middlewares.js'
import experienceRoutes from './routes/experience.js'


const PORT = process.env.PORT ?? 4300
const app = express()
const uri = 'mongodb+srv://alex:chako2012@cluster0.t6ctu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(middlewares.requestTime)
app.use(middlewares.logger)

app.use('/about-page-service',experienceRoutes)

async function start() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

// process.on("SIGINT", () => {
//     mongoose.close();
//     process.exit();
// });
