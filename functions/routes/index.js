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


	var orgRef = db.ref("organisation");
	orgRef.once("value",snap => {
		var count = snap.numChildren()+1;
    	 var newOrg = {
			orgName:req.body.name,
			// orgAdditionalInfo:req.body.info,
			orgId:count
		};
		orgRef.child(count).set(newOrg,err => {
			if (err) {
				res.send({status:0});
			}
			else{

			    newOrg.status = 1;
				res.send(newOrg);
			}
		});
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
    		orgId:req.body.orgId,
    		locationName:req.body.locationName,
    		locationId:Date.now()
    	};
    	var locationRef = db.ref("locations");
    	locationRef.push(newLocation,err=>{
    		if (err) {
    			res.send({status:0});
    		}
    		else{
    			newLocation.status = 1;
    			res.send(newLocation)
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
		locationId:req.body.locationId,
		deptId:req.body.deptId,
		domainId:Date.now(),
		domainName:req.body.domainName,
	};
	var domainRef = db.ref("domains");
	domainRef.push(newDomain,err=>{
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
	var orgRef = db.ref("organisation");
	orgRef.once("value",snap => {
			snap.forEach(s=>{
				returnJson.orgs.push({
					id:s.val().orgId,
					name:s.val().orgName

				});
			});
			res.send(returnJson);
	});
    
});


router.post('/getLocations',(req, res) => {

	// The Org to get Locations
	var  orgId = req.body.orgId;

	var locRef = db.ref("locations");
	var returnJson = {
		"locations":[]
	};

	locRef.orderByChild("orgId").equalTo(orgId).once("value",snap=>{
		if (snap.val()) {
			// Locations Exist
			snap.forEach(single=>{
				returnJson.locations.push({
					locationId:single.val().locationId,
					locationName:single.val().locationName

				});
			});
			returnJson.status = 1;
			res.send(returnJson);
		}
		else{
			res.send({status:0});
		}
	});

    
});

router.get('/getDepartments',(req, res) => {
    
});


// Since this page is visible only after selecting Department , need to query
// the database with only deptId
router.post('/getDomains',(req, res) => {

	var locationId = req.body.locationId;
	var orgId  = req.body.orgId;
	var deptId = req.body.deptId;

   var returnJson = {
   	"domains":[]
   };
	var domainsRef = db.ref("domains");
	domainsRef.orderByChild("deptId").equalTo(deptId).once("value",snap => {

		if (s.val()) {
			snap.forEach(s=>{
			
				// Value Exists matching deptId
				returnJson.domains.push({
						domainName:s.val().domainName,
						domainId:s.val().domainId,
						locationId:s.val().locationId,
						orgId:s.val().orgId,
						deptId:s.val().deptId
				});
			});

			//Append operation Result
			returnJson.status = 1;
			res.send(returnJson);
				//this is a alternative way of Filtering 
				// if (s.val().locationId == locationId && s.val().orgId == orgId && s.val().deptId == deptId ){
				// console.log("Match found");
					
		}
		else{
				// no match
		 		// Do nothingc
		 		res.send({status:0});
			}
		});
		
		
});

router.post('/getQuestions',(req, res) => {

	var locationId = req.body.locationId;
	var orgId  = req.body.orgId;
	var deptId = req.body.deptId;
	var domainId  = req.body.domainId;
	var questionsRef = db.ref("questions");
	questionsRef.orderByChild("domainId").equalTo(domainId).once("value",snap => {
		res.send(snap.val());
	});

    
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
	var orgRef = db.ref()
	
    
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
	questionRef.orderByChild("questionId").equalTo(questionId).once("value",snap=>{
		// snap will have a single Ke
		//Please see output using res.send(snap.val())
		if (snap.val()) {
			try{

				snap.forEach(s=>{
					var quesPath = "questions/"+s.key;
					var quesRef = db.ref(quesPath);
					var answerObj = {
						"answers":{
								option:req.body.option, // can be yes,no,partial
								extraText:req.body.extraText, // textbox value
								fileUrl:req.body.fileUrl, // attachement URL
								critical:req.body.critical // critical/ not critical 
						}
					};
					quesRef.update(answerObj,err => {
						if (err) {
							res.send({status:0});
						}
						else{
							res.send({status:1});
						}
					});
				});
			// var questionRef= db.ref(questionPath);
		
			}
			catch(e){
				res.send({status:0});
			}
		}
		else{
			res.send({status:0});
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