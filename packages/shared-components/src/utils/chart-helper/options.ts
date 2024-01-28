const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.1,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#222730',
      titleAlign: 'center',
      titleFont: {
        size: 12,
        color: 'white',
        weight: 400,
        family: 'Roboto',
      },
      bodyFont: {
        size: 12,
        color: 'white',
        weight: 600,
        family: 'Roboto',
      },
      usePointStyle: true,
      padding: 10,
      boxPadding: 5,
      bodySpacing: 6,
      titleSpacing: 5,
      itemSort: function () {
        return -1;
      },
      callbacks: {
        labelColor: function (context: any) {
          return {
            backgroundColor: context.dataset.borderColor,
            borderColor: context.dataset.borderColor,
          };
        },
        labelPointStyle: function () {
          return {
            pointStyle: 'rectRounded',
          };
        },
        label: function (context: any) {
          let label = '';
          if (context.dataset.label.length) {
            label += context.dataset.label + ' :  ';
          }
          return `${label}${context.parsed.y.toFixed(2)} ${
            context.dataset.unit
          }`;
        },
      },
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'dd/MM/yyyy',
        displayFormats: {
          month: 'dd/MM',
        },
      },
      min: '2022-01-01',
      suggestedMin: '2022-01-01',
      ticks: {
        color: '#828693',
        maxTicksLimit: 20,
      },
      grid: {
        display: false,
      },
      display: true,
      title: {
        display: false,
        text: 'Month',
      },
    },
    y: {
      ticks: {
        color: '#828693',
      },
      grid: {
        color: '#828693',
        borderColor: '#828693',
        drawBorder: false,
      },

      display: true,
      title: {
        display: false,
        text: 'Value',
      },
    },
  },
};

export default options;
