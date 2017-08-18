var link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getQuestions';


$.ajax({
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

