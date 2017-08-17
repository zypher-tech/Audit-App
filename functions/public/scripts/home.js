
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
                    $('#list-items').append(
                        '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                    );
                }
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
                          $('#list-items').append(
                        '<a href="location.hbs?orgid='+data.orgId+'"><div class="list-item"><h2>'+data.orgName+'</h2></div></a>'
                         );

                    } else if(data.status == 0) {
                        $('body').append('<div class="success"><p>Organization creation unsuccessful!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    }
                },
                error: function(data){
                alert("Try again later!"+data.cod);
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
