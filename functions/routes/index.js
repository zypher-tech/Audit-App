const functions = require('firebase-functions');
const express=require('express');
const firebase=require('firebase-admin');
const app=express();
var router = express.Router();



router.get('/',(req,res)=>{
    res.render('home');
});



router.post('/createOrganisation', (req, res) => {
    
   

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
router.get('/createLocation',(req, res) => {
    
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
router.get('/createDepartment',(req, res) => {
    
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



router.get('/createDomain',(req, res) => {
    
});

router.get('/createQuestion',(req, res) => {
    
});

router.get('/getOrganisations',(req, res) => {
    
});


router.get('/getLocations',(req, res) => {
    
});

router.get('/getDepartments',(req, res) => {
    
});

router.get('/getDomains',(req, res) => {
    
});

router.get('/getQuestions',(req, res) => {
    
});


router.get('/editOrgansation',(req, res) => {
    
});


router.get('/editLocation',(req, res) => {
    
});


router.get('/editDepartment',(req, res) => {
    
});

router.get('/editDomain',(req, res) => {
    
});

router.get('/editQuestion',(req, res) => {
    
});




/*The API which savesQuestions*/

router.get('/saveQuestion',(req, res) => {

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





router.get('/home',(req, res) => {
  		
  		/*HTML send home*/
});


router.get('/Locations',(req, res) => {
  		
  		/*HTML send home*/
});


router.get('/Departments',(req, res) => {
  		
  		/*HTML send home*/
});


router.get('/Domain',(req, res) => {
  		
  		/*HTML send home*/
});


router.get('/Questions',(req, res) => {
  		
  		/*HTML send home*/
});


router.get('/exportDomain',(req, res) => {
  		
  		var orgId  = req.body.orgId;
  		var locationId  = req.body.locationId;
  		var deptId = req.body.deptId;
  		var domainId = req.body.domainId;

  		// Query the Questions Collections with the Following Params
  		var questionsRef = db.ref("questions");
  		// questionsRef.orderBychild("orgId");

  		/*HTML send home*/
});
router.get('/exportDepartment',(req, res) => {
  		
  		var orgId = req.body.deptId;
  		var deptId = req.body.deptId;
  		
  		/*HTML send home*/
});


router.get('/exportLocation',(req, res) => {
  		
  		var locationId = req.body.deptId;
  		
  		/*HTML send home*/
});




module.exports = router;