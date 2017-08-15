const functions = require('firebase-functions');
const express=require('express');
const firebase=require('firebase-admin');
const firebaseApplication=firebase.initializeApp(

functions.config().firebase
);

const engines=require('consolidate');


var index = require('./routes/index');

const app=express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.use('/', index);


exports.app = functions.https.onRequest(app);