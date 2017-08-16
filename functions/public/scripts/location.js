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
        for(var i=0; i< res.locs.length; i++) {
                var locs = res.locs[i];
            //display list of location filtering using orgid
            $('#list-items').append(
                '<a href="department.hbs?loc='+locs.name+'"><div class="list-item"><h2>'+locs.name+'</h2></a>'
            );
            
            $('#nav-bar').html('<a href="home.hbs">&lt; BACK</a>');
        }
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});

$('#options').click(function(){
    $('#admin-user').toggle();
});

