const getDataInfo = () => {
  axios.get('/admin/getLeads')
  .then((response) => {
    printTheChart(response.data.response)
  })
  .catch((error) => {
    console.log(error);
  });
};

getDataInfo()

let button = document.getElementById('chartButton');

button.onclick = getDataInfo;

const printTheChart = ((dados) => {

  console.log(dados)
  let startDate = document.getElementById('startDate').value.split('-');
  let endDate = document.getElementById('endDate').value.split('-');

  let mesStart = parseInt(startDate[1])
  let mesEnd = parseInt(endDate[1])

  let myLabels = ['Unique Visitors', 'Leads', 'Redeemed Coupons']
  let leads = 0;
  let redeems = 0;
  let uniqueUsers = 0;
  let data = []
  dados.users.forEach(user => {
    let leadCreatedDate = user.created_at.toString()
    let leadUpdatedDate = user.updated_at.toString()
    let leadCreated = parseInt(leadCreatedDate.split('T')[0].split('-')[1])
    let leadUpdated = parseInt(leadUpdatedDate.split('T')[0].split('-')[1])

    if (leadCreated >= mesStart && leadCreated <= mesEnd) {
      leads += 1
    }
    if (leadUpdated >= mesStart && leadUpdated <= mesEnd) {
      redeems += 1
    }
  })
  dados.uniques.forEach(unique => {
    if (unique.month >= mesStart && unique.month <= mesEnd) {
      uniqueUsers = unique.uniqueVisitors;
    }
  })

  data.push(uniqueUsers, leads, redeems)

  const ctx = document.getElementById('completeChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: myLabels,
      datasets: [{
        label: 'Stock Chart',
        backgroundColor: ['rgb(255, 141, 97)',
          'rgb(2, 32, 181)',
          'rgb(2, 99, 7)'
        ],
        borderColor: ['rgb(245, 131, 87)',
        ],
        fill: false,
        data: data,
      }],
    },
  });
  values(data);
});
