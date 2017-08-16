const functions = require('firebase-functions');
const express=require('express');
const firebase=require('firebase-admin');
const app=express();
var router = express.Router();
var db = firebase.database();
const cors = require('cors')({origin: true});


router.get('/home',(req,res)=>{
    res.render('home');
});




// @deepak please use variables names properly ,




router.post('/createOrganisation', (req, res) => {

     var newOrg = {

		orgName:req.body.name,
		// orgAdditionalInfo:req.body.info,
		orgId:Date.now()
	};

	var orgRef = db.ref("organisation");
	orgRef.push(newOrg,err => {
		if (err) {
			res.set('Access-Control-Allow-Origin', "*")
  			res.set('Access-Control-Allow-Methods', 'GET, POST')
			res.status(200).send({status:0});
		}
		else{
	  	  	res.set('Access-Control-Allow-Origin', "*")
	  		res.set('Access-Control-Allow-Methods', 'GET, POST')
	  		newOrg.status = 1;
			res.status(200).send(newOrg);
		}
	});

});



/*Create New Location for a organisation.
	input
	 		{		jabberwock12
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
router.post('/createLocation',(req, res) => {
    	
    	var newLocation = {
    		locationId:Date.now(),
    		orgId:req.body.orgId,
    		locationName: req.body.locationName,
    	};

    	var locationRef = db.ref("locations");
    	locationRef.push(newLocation,err => {
    		if (err) {
    			res.send({status:0});
    		}
    		else{
    			res.send(newLocation);
    		}
    	});
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
router.post('/createDepartment',(req, res) => {
    	var newDept = {
    		locationId:req.body.locationId,
    		orgId:req.body.orgId,
    		locationName: req.body.locationName,
    		departmentName:req.body.departmentName
    	};

    	var departmentRef = db.ref("detpartments");
    	departmentRef.push(newDept,err => {
    		if (err) {
    			res.send({status:0});
    		}
    		else{
    			newDept.status = 1;
    			res.send(newDept);
    		}
    	});
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



router.post('/createDomain',(req, res) => {
	var newDomain = {
		orgId:req.body.orgId,
		locationId: req.body.locationId,
		deptId:req.body.deptId,
		domainId:Date.now(),
		domainName:req.body.domainName
	};
	var domainRef = db.ref("domains");
    	domainRef.push(newDomain,err => {
    		if (err) {
    			res.send({status:0});
    		}
    		else{
    			newDomain.status = 1;
    			res.send(newDomain);
    		}
    	});
    
});

router.post('/createQuestion',(req, res) => {

	var newQuestion = {
		questionText : req.body.questionText,
		orgId:req.body.orgId,
		locationId: req.body.locationId,
		deptId:req.body.deptId,
		domainId:req.body.domainId,
		questionId:Date.now()
	};  
	var questionRef = db.ref("questions");
	questionRef.push(newQuestion,err => {

    		if (err) {
    			res.set('Access-Control-Allow-Origin', "*");
  				res.set('Access-Control-Allow-Methods', 'GET, POST');
				res.status(200).send({status:0});
    		}
    		else{
    			res.set('Access-Control-Allow-Origin', "*");
  				res.set('Access-Control-Allow-Methods', 'GET, POST');
  				newQuestion.status = 1;
				res.status(200).send(newQuestion);
    		}

    });
    
});

router.get('/getOrganisations',(req, res) => {


	var returnJson = {
		"orgs":[]
	}
	var orgRef = db.ref("oranization");
	orgRef.once("value",snap => {
			snap.forEach(s=>{
				returnJson.orgs.push({
					id:s.val().id,
					name:s.val().name

				});
			});
			res.send(returnJson);
	});
    
});


router.get('/getLocations',(req, res) => {

    
});

router.get('/getDepartments',(req, res) => {
    
});

router.get('/getDomains',(req, res) => {
    
});

router.get('/getQuestions',(req, res) => {
    
});


router.post('/editOrgansation',(req, res) => {

	var orgId = req.body.orgId;
	var newName = req.body.newName;
	var orgRef  = db.ref("organization");
	orgRef.orderByChild("id").equalTo(orgId).once("value",snap => {
		  
		  console.log("Organisation Name to Edit "+snap.val().id);

			
    
	});
});


router.post('/editLocation',(req, res) => {

	var locationId  = req.body.locationId;
	var orgId =  req.body.orgId;
	
    
});


router.post('/editDepartment',(req, res) => {
    
});

router.get('/editDomain',(req, res) => {
    
});

router.get('/editQuestion',(req, res) => {
    
});






/*The API which savesQuestions*/

router.post('/saveQuestion',(req, res) => {

	//Get all the Variabels regarding to Question

	var questionRef  = db.ref("questions");

	console.log("save question called");
	// getting Question Id
	var questionId = req.body.questionId;

	// Querying by Question Id
	questionRef.orderByChild("questionId").equalTo(questionId).once("child_added",snap=>{
		// snap will have a single Ke
		//Please see output using res.send(snap.val())

		try{


			var questionPath = "questions/"+snap.key;
    		var questionRef= db.ref(questionPath);
    		// Loading the Question 
		    questionRef.once("value",s=>{
		    	// Buidl the Answer object
		 	 var answerObj = {
						"answers":{
								option:req.body.option, // can be yes,no,partial
								extraText:req.body.extraText, // textbox value
								fileUrl:req.body.fileUrl, // attachement URL
								critical:req.body.critical // critical/ not critical 
						}
				};
				questionRef.update(answerObj,err => {
					if (err) {
						res.send({status:0});
					}
					else{
						res.send({status:1});
					}
				});
		 	
		 });


		 // console.log("third : "+snap.ref.key);
		
		}
		catch(e){
			console.log("Error "+e);
		}
		 
	});





	// 	//Construct the Object to push to Questions Collections
	// var questionObj = {
	// 	orgId:req.body.orgId,
	// 	questionId:Date.now(),
	// 	locationId: req.body.locationId,
	// 	deptId:req.body.deptId,
	// 	domainId:req.body.domainId,
	// 	questionText:req.body.questionText,
	// 	option:req.body.option,
	// 	extraText:req.body.extraText,
	// 	fileUrl :req.body.fileUrl,
	// 	critical:req.body.critical
	// };
    
 //    var newQuestionRef = questionsRef.push(questionObj,err => {

 //    		if (err) {
 //    			res.set('Access-Control-Allow-Origin', "*")
 //  				res.set('Access-Control-Allow-Methods', 'GET, POST')
	// 			res.status(200).send({status:0});
 //    		}
 //    		else{
 //    			res.set('Access-Control-Allow-Origin', "*")
 //  				res.set('Access-Control-Allow-Methods', 'GET, POST')
 //  				questionObj.status = 1;
	// 			res.status(200).send(questionObj);
 //    		}

 //    });
	
	

    
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


router.get('/export',(req, res) => {
				  		
  		


  		var orgId = req.body.orgId;

});




module.exports = router;