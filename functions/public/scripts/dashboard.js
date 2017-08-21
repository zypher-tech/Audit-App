

 var ctx = document.getElementById("myChart").getContext("2d");
 var chart = document.getElementById("pie_chart").getContext("2d");
ctx.canvas.width = 150;
ctx.canvas.height = 300;
chart.canvas.width = 150;
chart.canvas.height = 150;

 // This Scripts are called either from Orgainsation/Location/Dept/Domain/Id with an  Audit Id
 




var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Yes", "No", "Partial"],
        datasets: [{
            label: '# of Yes/No/Partial Count',
            data: [5, 2, 3],
            backgroundColor: [
                'rgba(255, 0, 0, 0.3)',
                ' rgba(0, 255, 0, 0.3)',
                'rgba(0, 0, 255, 0.3)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
               
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});





var myPieChart = new Chart(chart,{
     type: 'pie',
     data: {
        datasets: [{
            label: 'Critical',
            data: [9, 2],
            backgroundColor: ["#0074D9", "#FF4136"]
        }],
        labels: ['Not Critical','Critical']
    },
    options: {
        responsive: true,
        title:{
            display: true,
            text: "Criticality"
        }
    }
});





// var getLocations = ;
// var getDept = ;
// var getOrgs = ;
// var getDomain = ;






function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};










