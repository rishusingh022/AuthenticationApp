const express = require('express');
const companyroutes = require('./routes/auth.js');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/api', companyroutes);

app.listen(PORT, async () => {
  console.log(`Server is running at port: ${PORT}`);
});