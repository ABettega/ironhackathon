const mongoose = require('mongoose');
const Stores = require('../models/Stores');

const dbName = 'ironhackathon';
mongoose.connect(`mongodb://localhost/${dbName}`);

const stores =[
  {
    "street": "Alameda Jaú",
    "number": 1301,
    "cep": 01420001,
    "neighborhood": "Jardim Paulista",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5617375,
    "longitude": -46.6601331
  },
  {
    "street": "Avenida Paulista",
    "number": 2034,
    "cep": 01310200,
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5585806,
    "longitude": -46.6593165
  },
  {
    "street": "Rua Augusta",
    "number": 1856,
    "cep": 01412000,
    "neighborhood": "Cerqueira César",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5587839,
    "longitude": -46.6613012
  }
]

Stores.create(stores, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${stores.length} stores`)
  mongoose.connection.close();
});




