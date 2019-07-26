const mongoose = require('mongoose');
const Stores = require('../models/Stores');

mongoose.connect(`${process.env.MONGODB_URI}`);

const stores =[
  {
    "street": "Pamplona",
    "number": 734,
    "cep": 01405001,
    "neighborhood": "Jardim Paulista",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5643488,
    "longitude": -46.6568893
  },
  {
    "street": "Avenida Goiás",
    "number": 1805,
    "cep": 09550050,
    "neighborhood": "Santa Paula",
    "city": "São Caetano do Sul",
    "state": "SP",
    "latitude": -23.6163362,
    "longitude": -46.5581647
  },
  {
    "street": "Av. Alcântara Machado",
    "number": 576,
    "cep": 03102000,
    "neighborhood": "Brás",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5530546,
    "longitude": -46.6193709
  },
  {
    "street": "R. Mal. Deodoro",
    "number": 1322,
    "cep": 09710002,
    "neighborhood": "Centro",
    "city": "São Bernardo do Campo",
    "state": "SP",
    "latitude": -23.709738,
    "longitude": -46.5511347
  },
  {
    "street": "R. Aurora Soares Barbosa",
    "number": 775,
    "cep": 06023010,
    "neighborhood": "Vila Campesina",
    "city": "Osasco",
    "state": "SP",
    "latitude": -23.5464799,
    "longitude": -46.7719213
  },
  {
    "street": "Rua Waldir de Azevedo",
    "number": 20,
    "cep": 07122170,
    "neighborhood": "Jardim Bom Clima",
    "city": "Guarulhos",
    "state": "SP",
    "latitude": -23.4493106,
    "longitude": -46.5205081
  },
  {
    "street": "R. Sebastião Pereira",
    "number": 245,
    "cep": 01225010,
    "neighborhood": "Vila Buarque",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5396795,
    "longitude": -46.6490426
  },
  {
    "street": "Av. Rui Barbosa",
    "number": 409,
    "cep": 06311000,
    "neighborhood": "Vila Caldas",
    "city": "Carapicuíba",
    "state": "SP",
    "latitude": -23.5208959,
    "longitude": -46.8344519
  },
  {
    "street": "Av. Antonio Piranga",
    "number": 171,
    "cep": 09911160,
    "neighborhood": "Diadema",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.686251,
    "longitude": -46.622707
  },
  {
    "street": "Av. Vital Brasil",
    "number": 1133,
    "cep": 05503001,
    "neighborhood": "Butantã",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.5694623,
    "longitude": -46.7151041
  },
  {
    "street": "Av. Imirim",
    "number": 1217,
    "cep": 02465100,
    "neighborhood": "Imirim",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.4944008,
    "longitude": -46.6462815
  },
  {
    "street": "Av. Roque Petroni Júnior",
    "number": 1089,
    "cep": 04707000,
    "neighborhood": "Jardim das Acacias",
    "city": "São Paulo",
    "state": "SP",
    "latitude": -23.6215123,
    "longitude": -46.6980466
  }
]

Stores.create(stores, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${stores.length} stores`)
  mongoose.connection.close();
});




