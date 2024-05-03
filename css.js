 function toggleCSS() {
    var link = document.getElementById('themeCSS');
    var currentStyle = localStorage.getItem('currentStyle');
    
    if (currentStyle === 'blue') {
        link.setAttribute('href', 'red.css');
        localStorage.setItem('currentStyle', 'red');
    } else {
        link.setAttribute('href', 'blue.css');
        localStorage.setItem('currentStyle', 'blue');
    }
}

function setInitialStyle() {
    var link = document.getElementById('themeCSS');
    var currentStyle = localStorage.getItem('currentStyle');
    
    if (currentStyle) {
        link.setAttribute('href', currentStyle + '.css');
    }
}

window.onload = setInitialStyle;

var placeData = {
  "Москва": 2410,
  "Париж": 5460,
  "Лондон": 3470,
  "Нью-Йорк": 7640,
  "Токио": 4280
};

var labels = Object.keys(placeData);
var data = Object.values(placeData);

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: labels,
      datasets: [{
          label: 'Количество посещений',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // синий цвет заливки
          borderColor: 'rgba(54, 162, 235, 1)', // синий цвет границы
          borderWidth: 1 // ширина границы
      }]
  },
  options: {
      responsive: true,
      plugins: {
          tooltip: {
              callbacks: {
                  label: function (context) {
                      var label = context.dataset.label || '';
                      if (label) {
                          label += ': ';
                      }
                      label += new Intl.NumberFormat('ru-RU').format(context.parsed.y);
                      return label;
                  }
              }
          }
      }
  }
});

function toggleColors() {
  var currentBackgroundColor = myChart.data.datasets[0].backgroundColor[0];
  var newBackgroundColor, newBorderColor, newCssFileName;

  if (currentBackgroundColor === 'rgba(54, 162, 235, 0.2)') {
      newBackgroundColor = 'rgba(255, 99, 132, 0.2)';
      newBorderColor = 'rgba(255, 99, 132, 1)';
      newCssFileName = 'red.css';
  } else {
      newBackgroundColor = 'rgba(54, 162, 235, 0.2)';
      newBorderColor = 'rgba(54, 162, 235, 1)';
      newCssFileName = 'blue.css';
  }

  myChart.data.datasets[0].backgroundColor = new Array(data.length).fill(newBackgroundColor);
  myChart.data.datasets[0].borderColor = new Array(data.length).fill(newBorderColor);

  myChart.update();

  var linkElement = document.getElementById('customStyleSheet');
  linkElement.href = newCssFileName;
}

document.getElementById('myImage').addEventListener('click', toggleColors);