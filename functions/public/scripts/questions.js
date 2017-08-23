var link = 'https://us-central1-audit-app-819d8.cloudfunctions.net/app/getQuestions';
// var creatAudit  = 




var deptId = getUrlParameter('deptId');
var locationId = getUrlParameter('locationId');
var orgId = getUrlParameter('orgId');
var domainId = getUrlParameter('domainId');
var fileURL;

var reqBody = JSON.stringify({domainId:parseInt(domainId)});

$.ajax({
    type: "POST",
    url: link,
    data: reqBody,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
        console.log("Question Obtained");
        $('.loading').remove();
        $('.list-item').remove();
        for(var i=0; i< res.questions.length; i++) {
            var ques = res.questions[i];
            var  id = ques.questionId;
            

            // Yes Radio Button
            var yesButton =  '<div class= "q_item"><label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1"><input type="radio" id="yes" class="mdl-radio__button" name="options" value="1" checked><span class="mdl-radio__label">Yes</span></div>';
            var noButton = '<div class= "q_item"><label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1"><input type="radio" id="no" class="mdl-radio__button" name="options" value="1" checked><span class="mdl-radio__label">No</span></div>';
            var partialButton = '<div class= "q_item"><label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1"><input type="radio" id="partial" class="mdl-radio__button" name="options" value="1" checked><span class="mdl-radio__label">Partial</span></div>';;
            var attachmentButton = '<br><div></div><div><p>Attach File: </p>  </div>  <input id="cMediaCapture" type="file"></div>';
            var TextBox = '<div class= "text_item"><div class="mdl-textfield mdl-js-textfield"><textarea class="mdl-textfield__input" type="text" rows= "3" id="sample5" ></textarea><label class="mdl-textfield__label" for="sample5">Optional Descrption..</label></div></div>';
            var criticalButton = '<div class="critical_bttn"><label for="switch1" class="mdl-switch mdl-js-switch mdl-js-ripple-effect"><input type="checkbox" id="switch1" class="mdl-switch__input"><span class="mdl-switch__label">Critical</span></label></div>';
            var saveButton = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Button</button>'
            var totalDiv =    '<div class = "total_div"><h5>'+ques.questionText+'</h5><div>'+yesButton+noButton+partialButton+attachmentButton+TextBox+criticalButton;

            $('#list-items').append(totalDiv);
        };
       
      },
    error: function(){alert('Error retrieving data. Please try again later.');}
});

$('#v_audits').click(function(){
    window.location.href = 'dash';
});

$('#n_audit').click(function(){
    window.location.href = 'dash';
});




// The Button
$('#show_audits').click(function(){
    window.location.href = 'view_audits?orgId='+orgId+'&locationId='+locationId+'&deptId='+deptId+'&domainId='+domainId;
    
    // got to Audits page with Audit Id


       // // Show a Dialog Box Asking for Audit Name and audit Date
       //  // var auditDate = 
       //  // var auditName = 
      

       //  var requestBody = JSON.stringify({
       //      auditDate:req.body.date;               // Get the Audit Date as a UTC timestamp
       //      auditName:req.body.auditName;         // Get a Custom Audit Name
       //      orgId:orgId,
       //      locationId:locationId,
       //      deptId:deptId,
       //      domainId:domainId
       //  }); 


       //      $.ajax({
       //          type: "POST",
       //          url: creatAudit,
       //          data: requestBody,
       //          dataType: 'json',
       //          contentType: 'application/json; charset=utf-8',
       //          success: function(res) {
       //              if (res.status == 1) {
       //                    // New Audit Has been Created with Params,
       //                    // NAvigate to Audits Page with AuditId
       //                    var auditId = res.auditId;
       //                    // Got The Audit Id, Navigate to next page,
       //                    window.location.href = 'audit?auditId='+auditId;

       //              }
       //              else{
       //                  console.log("Audit Not created");
       //              }
       //          },
       //          error: function(){alert('Error retrieving data. Please try again later.');}
       //      });

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