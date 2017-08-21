var getlink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getLocations';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createLocation';



var orgid = getUrlParameter('orgId');


 var reqBody = JSON.stringify({orgId:parseInt(orgid)});
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
                 var newDiv = '<div class="list-item" id="'+locs.locationId+'"><h6>'+locs.locationName+'</h6></div>';
                 $('#list-items').append(
                             newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                  ); 
                // $('#list-items').append(
                //     '<a href="department.hbs?locationId='+locs.locationId+'&orgId='+locs.orgid+'"><div class="list-item"><h6>'+locs.locationName+'</h6></div></a>'
                // );
            };
             $("#list-items").on("click", "div", function() {
                   
                    var aid = $(this).attr('id');
                    window.location.href ='department?locationId='+aid+'&orgId'+orgid;
                });

        }
        else{
            console.log("no status");
        }
    },
    error: function(){
        alert('Error retrieving data. Please try again later.');
    }
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

