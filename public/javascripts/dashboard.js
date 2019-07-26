const getDataInfo = () => {
  console.log();
  axios.get('/admin/getLeads')
  .then((response) => {
      printTheChart(response.data.users)
    })
    .catch((error) => {
      console.log(error);
    });
};

getDataInfo()

const printTheChart = ((userData) => {
  console.log(userData)
  let myLabels = ['Access', 'Cupons']
  let access = 0;
  let cupons = 0;
  let data = []
  userData.forEach(user => {
    access += 1
    if (user.redeemed === true) {
      cupons += 1;
    }
  })
  data.push(access,cupons)

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: myLabels,
      datasets: [{
        label: 'Stock Chart',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: data,
      }],
    },
  });
  values(data);
});
