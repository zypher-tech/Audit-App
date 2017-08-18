link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getLocations';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createLocation';

var urlParams = new URLSearchParams(window.location.search);

var entries = urlParams.entries();
for(pair of entries) { 
  var orgid = pair[1];
  console.log(orgid);
}

var req = {
    orgId : orgid,
}

console.log(req);

$.ajax({
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    type: "POST",
    url: link,
    data: req,
    dataType: 'json',
    success: function(res) {
        $('.loading').remove();
        $('.list-item').remove();
        for(var i=0; i< res.locations.length; i++) {
            var locs = res.locations[i];
            //display list of location filtering using orgid
            $('#list-items').append(
                '<a href="department.hbs?locationId='+locs.locationId+'&orgId='+orgid+'"><div class="list-item"><h2>'+locs.name+'</h2></div></a>'
            );
        }
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});

$('#options').click(function(){
    $('#admin-user').toggle();
});

$('#submitName').click(function(){
    var input = $('#name').val();
    if (input.split('').length != 0) {
        console.log(input.split('').length);
        console.log(input);
        //call createOrganization method
        //$.post(createLink, input, function(result){
          //  console.log(result);
        //});
        
        $.ajax({
            type: "POST",
                url: createLink,
                data: input,
                dataType: "json",

                success: function(data) {
                    if(data.status == 1) {
                        $('body').append('<div class="success"><p>Location successfully created!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    } else if(data.status == 0) {
                        $('body').append('<div class="success"><p>Location creation unsuccessful!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    }
                },
                error: function(data){
                alert("Try again later!");
                }
            });
    }
});

