link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getDepartments';

var urlParams = new URLSearchParams(window.location.search);

var entries = urlParams.entries();
var que     = [];
for(pair of entries) { 
    locid = pair[1];
    console.log(locid);
}

$.ajax({
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    url: link,
    dataType: 'json',
    success: function(res) {
        $('.loading').remove();
        $('.list-item').remove();
        for(var i=0; i< res.departments.length; i++) {
                var depa = res.locations[i];
            //display list of location filtering using orgid
            if (depa.locationId = locid) {
                $('#list-items').append(
                    '<a href="domain.hbs?depid='+depa.deptId+'"><div class="list-item"><h2>'+locs.name+'</h2></a>'
                ); 
            }
        }
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});

$('#options').click(function(){
    $('#admin-user').toggle();
});

