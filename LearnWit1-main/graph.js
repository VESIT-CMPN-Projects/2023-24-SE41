document.addEventListener('DOMContentLoaded', () => {
  // Create a pie chart
  const pieChartCanvas = document.getElementById('pie-chart');
  const pieChartCtx = pieChartCanvas.getContext('2d');
  const pieChartData = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [{
          data: [30, 40, 30],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      }]
  };

  new Chart(pieChartCtx, {
      type: 'pie',
      data: pieChartData,
  });

  // Create a bar graph
  const barGraphCanvas = document.getElementById('bar-graph');
  const barGraphCtx = barGraphCanvas.getContext('2d');
  const barGraphData = {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
      datasets: [{
          label: 'Data',
          data: [50, 30, 70, 40, 60],
          backgroundColor: '#4bc0c0',
          borderColor: '#4bc0c0',
          borderWidth: 1,
      }]
  };

  new Chart(barGraphCtx, {
      type: 'bar',
      data: barGraphData,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
});
