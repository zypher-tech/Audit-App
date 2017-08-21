

 var ctx = $("#myChart");
 var chart = $('#pie_chart');

 // This Scripts are called either from Orgainsation/Location/Dept/Domain/Id with an  Audit Id
 




var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Yes", "No", "Partial"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
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


var data = {
    datasets: [{
        data: [15, 2]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Not Critical',
        'Critica;'
     
    ]
};




var myPieChart = new Chart(chart,{
    type: 'pie',
    data: data
    
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










