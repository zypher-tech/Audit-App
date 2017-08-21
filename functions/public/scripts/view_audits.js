var getAuditLink = '';
var createAuditLink = '';





var deptId = getUrlParameter('deptId');
var locationId = getUrlParameter('locationId');
var orgId = getUrlParameter('orgId');
var domainId = getUrlParameter('domainId');

var reqBody = JSON.stringify({domainId:parseInt(domainId)});

$.ajax({
    type: "POST",
    url: getAuditLink,
    data: reqBody,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
        console.log("Audit Obtained Obtained");
        $('.loading').remove();
        $('.list-item').remove();
        // Appendign All Audit Object
        for(var i=0; i< res.audits.length; i++) {
            var auditObj = res.audits[i];
            //     auditId:s.val().auditId,
            //         auditName:s.val().auditName,
            //         auditDate:s.val().auditDate
            // }

             var newDiv = '<div class="list-item" id="'+auditObj.auditId+'"><h6>'+auditObj.auditName+'</h6></div>';
                 $('#list-items').append(
                             newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                  ); 
        }

        //setting Click listener
       $("#list-items").on("click", "div", function() {
                   
                    var auditId = $(this).attr('id');
                    // window.location.href = 'dashboard?orgId='+orgId+'&locationId='+locId
                    
                });
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});






// 




$('#new_audit').click(function(){
    var input = $('#name').val();
    // var AuditDate = ''; // Show a Calender , get a Date
    if (input.split('').length != 0) {
        console.log(input.split('').length);
        console.log(input);
        //call createOrganization method
        //$.post(createLink, input, function(result){
          //  console.log(result);
        //});
        
        var reqBod = JSON.stringify({
                auditName:input,
                auditDate:'',
                orgId:orgId,
                locationId:locationId,
                deptId:deptId,
                domainId:domainId
        });
        $.ajax({
            type: "POST",
                url: createAuditLink,
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


