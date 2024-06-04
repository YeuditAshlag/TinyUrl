import usersRouter from './routes/usersRoutes.js'
import linksRouter from './routes/linksRoutes.js'
import connectDB from './DB/connectToMongo.js';
import cors from 'cors';
import express from 'express'
import bodyParser from 'body-parser';

const port = 3005;
connectDB()
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
      res.send('hello 👏')
})
app.use('/users', usersRouter);
app.use('/links', linksRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});