const functions = require('firebase-functions');
const express=require('express');
const firebase=require('firebase-admin');
// const firebaseApplication=firebase.initializeApp(

// // functions.config().firebase
// // );

// const engines=require('consolidate');



// ========================================
         // Copied from Expresss Demo
// var index = require('./routes/index');
// 
// const app=express();
// app.engine('hbs',engines.handlebars);
// app.set('views','./views');
// app.set('view engine','hbs');

// app.use('/', index);

// =============================================




const app=express();



// Start of Endpoints 
// Please specify req/res parameters for all Endpoints




/** Create Functions -- */


/*Create New Organisation

	input 
	 		{
					"orgName":"ABC"
	 		} 

	 output
	 			{
					"orgId": 4,
					"organisationName":ABC,
	 			}
		


  */


app.get('/api/createOrganisation', (req, res) => {
    // Do App stuff here
});



/*Create New Location for a organisation.
	input
	 		{		
	 				"orgId":4,
					"locationName": "Bang-1"
				
					
	 		} 

	 output
	 			{
					"orgId": 4,
					"locationName": "Bang-1"
					"locationId":17
	 			}
		


  */
app.get('/createLocation',(req, res) => {
    
});



/*Create New Department for a organisation at a location
	input
	 		{		
	 				"orgId":4,
					"locationId":17,
					"departmentName":"HR"
	 		} 

	 output
	 			{
					"orgId":4,
					"locationId":17,
					"departmentName":"HR",
					"deptId":4
	 			}
		


  */
app.get('/createDepartment',(req, res) => {
    
});



/*Create New Domain for a department at a location 
	input
	 		{		
	 				"orgId":4,
					"locationId":17,
					"deptId":4
					"domainName": "Gender"
				
					
	 		} 

	 output
	 			{
					"orgId":4,
					"locationId":17,
					"deptId":4,
					""
	 			}
		


  */
app.get('/createDomain',(req, res) => {
    
});

app.get('/createQuestion',(req, res) => {
    
});

app.get('/getOrganisations',(req, res) => {
    
});


app.get('/getLocations',(req, res) => {
    
});

app.get('/getDepartments',(req, res) => {
    
});

app.get('/getDomains',(req, res) => {
    
});

app.get('/getQuestions',(req, res) => {
    
});


app.get('/editOrgansation',(req, res) => {
    
});


app.get('/editLocation',(req, res) => {
    
});


app.get('/editDepartment',(req, res) => {
    
});

app.get('/editDomain',(req, res) => {
    
});

app.get('/editQuestion',(req, res) => {
    
});




/*The API which savesQuestions*/

app.get('/saveQuestion',(req, res) => {

	//Get all the Variabels regarding to Question

	var questionRef  = db.ref("questions");

		//Construct the Object to push to Questions Collections
	var questionObj = {
		orgId:req.body.orgId,
		locationId: req.body.locationId,
		deptId:req.body.deptId,
		domainId:req.body.domainId,
		questionText:req.body.questionText
	};
    
    var newQuestionRef = questionsRef.push(questionObj,err => {

    		if (err) {
    			console.log("Error Pushing");
    		}
    		else{
    			var questionId = newQuestionRef.key;
   			    console.log("Question Inserted at "+questionId);
    		}

    });

    
});





app.get('/home',(req, res) => {
  		
  		/*HTML send home*/
});


app.get('/Locations',(req, res) => {
  		
  		/*HTML send home*/
});


app.get('/Departments',(req, res) => {
  		
  		/*HTML send home*/
});


app.get('/Domain',(req, res) => {
  		
  		/*HTML send home*/
});


app.get('/Questions',(req, res) => {
  		
  		/*HTML send home*/
});


app.get('/exportDomain',(req, res) => {
  		
  		var orgId  = req.body.orgId;
  		var locationId  = req.body.locationId;
  		var deptId = req.body.deptId;
  		var domainId = req.body.domainId;

  		// Query the Questions Collections with the Following Params
  		var questionsRef = db.ref("questions");
  		// questionsRef.orderBychild("orgId");

  		/*HTML send home*/
});
app.get('/exportDepartment',(req, res) => {
  		
  		var orgId = req.body.deptId;
  		var deptId = req.body.deptId;
  		
  		/*HTML send home*/
});


app.get('/exportLocation',(req, res) => {
  		
  		var locationId = req.body.deptId;
  		
  		/*HTML send home*/
});




exports.app = functions.https.onRequest(app);