$.ajax({
  url: 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&range=760&datum=MLLW&station=9410079&time_zone=lst_ldt&units=english&interval=hilo&format=json',
  method: 'GET',
  success: function(response) {
    tide = response.predictions
    var yTideValues = []
    var xTideValues = []
    for (var i = 0;i<tide.length; i++){
      if (i%4 == 0){
        yTideValues.push(tide[i].v)
        x = tide[i].t.split(" ").splice(0,1,"")
        xTideValues.push(x[0].slice(5))
        var lastUpdate = new Date(tide[i].t.split(" ")).toDateString() + " at " +new Date(tide[i].t.split(" ")).toLocaleTimeString('en-US',{hour: 'numeric', minute: 'numeric', hour12: true})
        document.querySelector('#tidal').innerHTML = lastUpdate
      }
      if (i == tide.length-1){
        var level = (tide[i].type)
        if (level == 'H'){
          document.querySelector('#tideLevel').innerHTML = 'High'
          var highLevel = tide[i].v
          var lowLevel = tide[i-1].v
        } else if (level== 'L'){
          document.querySelector('#tideLevel').innerHTML = 'Low'
          var highLevel = tide[i-1].v
          var lowLevel = tide[i].v
        }
      }
    }
    new Chart("TideLevel", {
      type: "bar",
      data: {
        labels: xTideValues,
        datasets: [
          {
            label: "Tide Level",
            backgroundColor: waterBarColors,
            data: yTideValues,
            barThickness: 7,
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: false,
          tooltip: {
            callbacks: {
              label: (item) => `${item.dataset.label}: ${item.formattedValue} Feet`,
            },
          },
        },
        layout: {
          padding: {
            top: 25,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Feet",
            },
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
            },
          },
          x: {
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
            },
          },
        },
      },
    });
    var xStackTideValues = ["High Tide Level", "Low Tide Level"];
    var yStackCurrentTideValues = [highLevel, lowLevel];
    var yStackMaxTideValues = [
      6 - yStackCurrentTideValues[0],
      Math.abs(6 - yStackCurrentTideValues[1]),
    ];
    new Chart("StackTideLevel", {
      type: "bar",
      data: {
        labels: xStackTideValues,
        datasets: [
          {
            label: "High/Low Tide Level",
            backgroundColor: ["#EFB265", "#577F9C"],
            data: yStackCurrentTideValues,
            borderSkipped: false,
          },
          {
            label: "Max Tide Height",
            backgroundColor: "#FFF",
            data: yStackMaxTideValues,
            borderRadius: {
              topLeft: 10,
              topRight: 10,
            },
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            reverse: true,
            position: "right",
            maxWidth: 150,
            labels: {
              color: "#FFF",
              usePointStyle: true,
              pointStyle: "rectRounded",
            },
          },
          tooltip: {
            callbacks: {
              label: (item) =>
                item.dataset.label == "Max Tide Height"
                  ? `${item.dataset.label}: 6 Feet`
                  : `${item.dataset.label}: ${item.formattedValue} Feet`,
            },
          },
        },
        layout: {
          padding: {
            top: 25,
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
            stacked: true,
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
            },
          },
          x: {
            stacked: true,
            ticks: {
              display: true,
              color: "#FFF",
            },
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
            },
          },
        },
      },
    });
  },
  error: function(error) {
    console.log('Error:', error);
  }
});
var apiDate = new Date().toLocaleString('en-US', {year:'numeric', month:'2-digit', day:'2-digit', hour:'numeric', minute:'numeric', hour12: false}).split(',').join("")
$.ajax({
  url: 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date='+apiDate+'&range=400&datum=MLLW&station=9410079&time_zone=lst_ldt&units=english&interval=hilo&format=json',
  method: 'GET',
  success: function(response) {
    tide =response.predictions
    for (var i =0; i < tide.length; i++){
      var timer = new Date(tide[i].t.split(" "))
      current_date = new Date()
      if (current_date - timer < 0){
        var time = new Date(tide[i].t.split(" ")).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
        document.querySelector('#time').innerHTML = time
        break
      }
    }
  },
  error: function(error) {
    console.log('Error:', error);
  }
});
var waterBarColors = "#A1CBE3";