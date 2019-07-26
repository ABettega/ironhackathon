const User = require("../models/User");


const getDataInfo = () => {
  console.log();
  User.find()
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
};

getDataInfo()

const printTheChart = ((stockData) => {
  const stockLabels = [];
  const stockPrice = [];
  for (const key in stockData.bpi) {
    stockLabels.push(key);
    stockPrice.push(stockData.bpi[key]);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: 'Stock Chart',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: stockPrice,
      }],
    },
  });
  values(stockPrice);
});
