
var getAnswers = '';
var saveAnswerLink = '';

var domainId = getUrlParameter('domainId');
var deptId = getUrlParameter('deptId');
var locationId = getUrlParameter('locationId');
var orgId = getUrlParameter('orgId');
var auditId = getUrlParameter('auditId');



// Already a Already is performed, get the answers by sendign Audit Id and DomainId

var reqBody = JSON.stringify({domainId:parseInt(domainId),auditId:parseInt(auditId)});


$.ajax({
    type: "POST",
    url: getAnswers,
    data: reqBody,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
        $('.loading').remove();
        $('.list-item').remove();
        if (res.status == 1) {
              for(var i=0; i< res.domains.length; i++) {


                // var doms = res.domains[i];
                //     //display list of location filtering using orgid
                // var newDiv = '<div class="list-item" id="'+doms.domainId+'"><h6>'+doms.domainName+'</h6></div>';
                //  $('#list-items').append(
                //              newDiv  // '<a href="location.hbs?orgid='+org.id+'"><div class="list-item"><h2>'+org.name+'</h2></div></a>'
                //   ); 

                //     // $('#list-items').append(
                //     //     '<a href="questions.hbs?locationId='+req.locationId+'&orgId'+req.orgId+'&deptId='+req.deptId+'&domainId='+doms.domainId+'"><div class="list-item"><h2>'+doms.domainName+'</h2></div></a>'
                //     // );
            }
             $("#list-items").on("click", "button", function() {
                   
                    // var questionId = $(this).attr('id');
                    // save button Clicked for a Question ,
                    // alert("Organiation Clicked :" +status);

                    var questionId ;
                    var optionalText;
                    var auditId;
                    var QuestionText;
                    var option;
                    var criticality;
                    var attachFileUrl;
                    // All Variabes associated with a Question;
                    var requestBody = JSON.stringify({
                    	questionId:parseInt(questionId),
                    	optionalText:optionalText,
                    	questionText:QuestionText,
                    	option:parseInt(option),
                    	criticality:parseInt(criticality),
                    	attachFileUrl:attachFileUrl,
                    	orgId:parseInt(orgId),
                    	domainId:parseInt(domainId),
                    	locationId:parseInt(locationId),
                    	deptId:parseInt(deptId),
                    	auditId:parseInt(auditId)
                    });
                    saveAnswer(reqBody);
                    
                    
                });
        }
        else{
            console.log("No status");
        }
      
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});


('#genreateReport').click(function(){

	// Audit has been saved
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


function saveAnswer(reqBody){

$.ajax({
    type: "POST",
    url: saveAnswerLink,
    data: reqBody,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
        $('.loading').remove();
        $('.list-item').remove();
        if (res.status == 1) {
       			console.log("saved");
        }
        else{
            console.log("No status");
        }
      
    },
    error: function(){alert('Error retrieving data. Please try again later.');}
});
};