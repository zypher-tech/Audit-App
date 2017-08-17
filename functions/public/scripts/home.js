
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
    
    if (isVisible) {
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
    }
});

$('#submitName').click(function(){
    var input = $('#orgname').val();
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
                        $('body').append('<div class="success"><p>Org successfully created!</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
                        }, 2000);
                    } else if(data.status == 0) {
                        $('body').append('<div class="success"><p>Organization creation unsuccessful!</p></div>')
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
