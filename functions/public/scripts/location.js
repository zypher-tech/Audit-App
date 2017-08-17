link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getLocations';

var urlParams = new URLSearchParams(window.location.search);

var entries = urlParams.entries();
for(pair of entries) { 
  var orgid = pair[1];
  console.log(orgid);
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
        for(var i=0; i< res.locations.length; i++) {
                var locs = res.locations[i];
            //display list of location filtering using orgid
            if(locs.orgId == orgid) {
                $('#list-items').append(
                    '<a href="department.hbs?loc='+locs.locationId+'"><div class="list-item"><h2>'+locs.name+'</h2></a>'
                );
            }
        }
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});

$('#options').click(function(){
    $('#admin-user').toggle();
});

