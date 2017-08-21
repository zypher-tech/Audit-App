


var checkAdminURL = '';


















$('#login_button').click(function(){
   		// 
   		var email = ;
   		var pass = ;
   		signIn(email,pass);
});







function signIn(email,password){

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // The user is neither Admin nor User
          if (error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             $('body').append('<div class="success"><p>'+errorMessage+'</p></div>')
                        setTimeout(function(){
                            $('.success').hide();
            }, 2000);
          }
          else{
            // user Exists, Check whether He is Admin
            checkAdmin(email,password);
          }
         
    });
};


function checkAdmin(email,pass){

    var reqBody = JSON.stringify({
        email:email,
        password:password
    });

     $.ajax({
               type: "POST",
                url: checkAdminURL,
                data: reqBody,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',


                success: function(data) {
                    if (data.status == 1) {

                        // Admin user, Navigate to Home
                         window.location.href = 'home';
                     }
                     else{
                       // The Logged in User is Normal, show Organisations page
                       window.location.href = 'organisation';
                     }
                 
                },
                error: function(data){
                 alert('Please try Again or Contact Support');
                }
            });
};
