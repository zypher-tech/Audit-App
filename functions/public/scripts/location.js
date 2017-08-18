var getlink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getLocations';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createLocation';

var urlParams = new URLSearchParams(window.location.search);

var entries = urlParams.entries();
for(pair of entries) { 
  var orgid = pair[1];
  console.log(orgid);
}


 var reqBody = JSON.stringify({orgId:orgid});
console.log("Sending Request Body :"+reqBody);

$.ajax({
    type: "POST",
    url: getlink,
    data:reqBody,
    dataType: "json",
    contentType: 'application/json; charset=utf-8',

    success: function(res) {
        console.log("Got response : "+res.status);
        $('.loading').remove();
        $('.list-item').remove();
         if (res.status == 1) {
             for(var i=0; i< res.locations.length; i++) {
                var locs = res.locations[i];
                //display list of location filtering using orgid
                $('#list-items').append(
                    '<a href="department.hbs?locationId='+locs.locationId+'&orgId='+locs.orgid+'"><div class="list-item"><h6>'+locs.locationName+'</h6></div></a>'
                );
            }
        }
        else{
            console.log("no status");
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

