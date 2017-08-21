var getDomainslink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getDomains';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createDomain';


var deptId = getUrlParameter('deptId');
var locationId = getUrlParameter('locationId');
var orgId = getUrlParameter('orgId');



var reqBody = JSON.stringify({deptId:parseInt(deptId)});


$.ajax({
    type: "POST",
    url: getDomainslink,
    data: reqBody,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
        $('.loading').remove();
        $('.list-item').remove();
        if (res.status == 1) {
              for(var i=0; i< res.domains.length; i++) {
                var doms = res.domains[i];
                    //display list of location filtering using orgid
                var newDiv = '<div class="list-item" id="'+doms.domainId+'"><h6>'+doms.domainName+'</h6></div>';
                 $('#list-items').append(
                             newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                  ); 

                    // $('#list-items').append(
                    //     '<a href="questions.hbs?locationId='+req.locationId+'&orgId'+req.orgId+'&deptId='+req.deptId+'&domainId='+doms.domainId+'"><div class="list-item"><h2>'+doms.domainName+'</h2></div></a>'
                    // );
            }
             $("#list-items").on("click", "div", function() {
                   
                    var domainId = $(this).attr('id');
                    // alert("Organiation Clicked :" +status);
                    window.location.href = 'questions?locationId='+locationId+'&orgId'+orgId+'&deptId='+deptId+'&domainId='+domainId;
                    
                });
        }
        else{
            console.log("No status");
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
                    if (data.status == 1) {
                        $('body').append('<div class="success"><p>Domain successfully created!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    } else if(data.status == 0) {
                        $('body').append('<div class="success"><p>Domain creation unsuccessful!</p></div>')
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