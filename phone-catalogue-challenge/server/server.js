const cors = require('cors')
const express = require('express');
const app = express();
const phonesRouter = require('./src/routes/phones.route');
const PORT = 4000;

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true)
  }
};

app.use('/media', express.static('public'));
app.use(express.json());

app.use('/api/phones', cors(corsOptions), phonesRouter);


app.listen(PORT, () => {
  console.log('Server started');
});