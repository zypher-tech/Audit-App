
//gets the organizations
var link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getOrganisations';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createOrganisation';

$('#options').click(function(){
    $('#admin-user').toggle();
});

$('#orgs').click(function(){
    var list = $('#list-items');
    var isVisible = list.is(':visible');
    var welIsVisible = $('.welcome').is(':visible');
    $('#dashboard').hide();
    
    if (welIsVisible==false && isVisible==false) {
        $('.welcome').hide();
        list.show();
    } else {
        $('.welcome').toggle();
        list.toggle();
    }
    
        $.ajax({
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            type: "GET",
            url: link,
            dataType: 'json',
            success: function(res) {
                console.log("got Response");
                $('.loading').remove();
                $('.list-item').remove();
                for(var i=0; i< res.orgs.length; i++) {
                    var org = res.orgs[i];
                    var id = org.id;
                    var newDiv = '<div class="list-item" id="'+id+'"><h6>'+org.name+'</h6></div>';
                    $('#list-items').append(
                        newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                    );  
                };

                $("#list-items").on("click", "div", function() {
                   
                    var status = $(this).attr('id');
                    alert("Organiation Clicked :" +status);
                    window.location.href = 'location?orgId='+status;
                    
                });
                $(document).on({
                      mouseenter: function () {
                        $(this).animate({ height: "200", width: "200", left: "-=55", top: "-=55" }, "fast");
                      },
                      mouseleave: function () {
                        $(this).animate({ height: "90", width: "90", left: "+=55", top: "+=55" }, "fast");
                      }    
                    }, '.img a img');
                
            },
            error: function(){alert('Error retrieving data. Please try again later.');}
        });
});

$('#submitName').click(function(){
    var input = $('#orgname').val();
    if (input.split('').length != 0) {
       var reqBody = JSON.stringify({orgName:input});
       console.log("sending Body"+reqBody);
        
        $.ajax({
               type: "POST",
                url: createLink,
                data: reqBody,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',


                success: function(data) {
                    if (data.status == 1) {
                        console.log("Good status");
                        $('body').append('<div class="success"><p>Org successfully created!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);

                        var newDiv = '<div class="list-item" id="'+data.orgId+'"><h6>'+data.orgName+'</h6></div>';
                        $('#list-items').append(
                                newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                        );  


                    } else if(data.status == 0) {
                        $('body').append('<div class="success"><p>Not Created,Try Again!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    }
                },
                error: function(data){
                
                }
            });
    }
});


//opens dashboard
$('#dash').click(function(){
    var wel = $('.welcome');
    var dashboard = $('#dashboard');
    var list = $('#list-items');
    var listIsVisible = list.is(':visible');
    var dashIsVisible = dashboard.is(':visible');
    var welIsVisible = wel.is(':visible');
    if (welIsVisible) {
        wel.toggle();
        dashboard.show();
    } else if (listIsVisible) {
        list.toggle();
        dashboard.show();
    } else if (dashIsVisible) {
        dashboard.toggle();
        wel.show();
    } else {
        dashboard.show();
    }
    
});
