require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('database authenticate🤗'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('databse synced😁'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3201;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
