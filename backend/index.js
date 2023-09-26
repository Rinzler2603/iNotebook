const connectToMongo=require('./db');
const express = require('express')

console.log("Connected to server successfully");
const app = express();
const port = 5000;

app.use(express.json());

connectToMongo();

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello Rane')
})

app.listen(port,()=>{
    console.log("Listening at port http");
})