var getDeptlink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getDepartments';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createDepartment';


var urlParams = new URLSearchParams(window.location.search);

var entries = urlParams.entries();
var orgid = getUrlParameter('orgId');

var locationId = getUrlParameter('locationId');
var reqBody = JSON.stringify({locationId:parseInt(locationId)});
console.log("Request Body : "+reqBody);



$.ajax({

   type: "POST",
    url: getDeptlink,
    data:reqBody,
    dataType: "json",
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
        console.log("Got Response");
        $('.loading').remove();
        $('.list-item').remove();
        if (res.status == 1) {
             for(var i=0; i< res.department.length; i++) {
            var deps = res.department[i];
             var newDiv = '<div class="list-item" id="'+deps.deptId+'"><h6>'+deps.departmentName+'</h6></div>';
                    $('#list-items').append(
                        newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                    );  
            };
         $("#list-items").on("click", "div", function() {
                    var deptId = $(this).attr('id');
                    window.location.href = 'domain?orgId='+orgid+'&locationId='+locationId+'&deptId='+deptId;
                    
          });
        }
        else{
            console.log("No status");
        }
       

               
            //display list of location filtering using orgid
            // $('#list-items').append(
            //     '<a href="domain.hbs?locationId='+req.locationId+'&orgId'+req.orgId+'&deptId='+deps.deptId+'"><div class="list-item"><h2>'+deps.departmentName+'</h2></div></a>'
            // );
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
                contentType: 'application/json; charset=utf-8',

                success: function(data) {
                    if (data.status == 1) {
                        $('body').append('<div class="success"><p>Department successfully created!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    } else if(data.status == 0) {
                        $('body').append('<div class="success"><p>Department creation unsuccessful!</p></div>')
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