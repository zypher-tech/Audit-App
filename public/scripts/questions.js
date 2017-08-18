link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getQuestions';

var urlParams = new URLSearchParams(window.location.search);

var entries = urlParams.entries();
var req = {};
var key;
//creating request input for post request
for(pair of entries) { 
    key = pair[0];
    req[key] = pair[1];
}

console.log(req);


$.ajax({
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    type: "POST",
    url: link,
    data: req,
    dataType: 'json',
    success: function(res) {
        $('.loading').remove();
        $('.list-item').remove();
        for(var i=0; i< res.questions.length; i++) {
            var ques = res.questions[i];
            //display list of location filtering using orgid
            $('#list-items').append(
                '<div class="list-item"><h2>'+ques.questionText+'</h2></div>'
            );
        }
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});

$('#options').click(function(){
    $('#admin-user').toggle();
});

