link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getOrganisations';

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

$('#options').click(function(){
    $('#admin-user').toggle();
});