
//gets the organizations
var link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getOrganisations';

var createLink = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/createOrganisation';

$('#options').click(function(){
    $('#admin-user').toggle();
});

$('#orgs').click(function(){
    var list = $('#list-items');
    list.toggle();
    $('.welcome').toggle();
    var isVisible = list.is(':visible');
    
    if (isVisible) {
        $.ajax({
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            url: link,
            dataType: 'json',
            success: function(res) {
                $('.loading').remove();
                $('.list-item').remove();
                for(var i=0; i< res.orgs.length; i++) {
                    var org = res.orgs[i];
                    $('#list-items').append(
                        '<div class="list-item"><h2>'+org.name+'</h2><br>id: '+org.id+'</div>'
                    );
                }
            },
            error: function(){alert('Error retrieving data. Please try again later.');}
        });
    }
});

$('#submitName').click(function(e){
    var input = $('#orgname').val();
    console.log(input);
    if (input.split('').length != 0) {
        //call createOrganization method
        $.post(createLink, input, function(result){
            console.log(result);
        });
    }
});

