const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app = express();

// // For saving data into databases 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactGym', { useNewUrlParser: true, useUnifiedTopology: true });

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// compiling the model
const contact = mongoose.model('contact', contactSchema);

// sets template engine here "pugs"
app.set('view engine', 'pug');


app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/submit', (req, res) => {
//     console.log("name :" + req.body.name)
//     console.log("email :" + req.body.email)
//     console.log("message :" + req.body.message)
//     res.redirect('/');
// })

app.post('/submit', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("Thanks for your feedback")
    }).catch(() => {
        res.status(400).send("oops! try again ")
    })
    // res.status(200).render('index.pug')
})


app.get('/', (req, res) => {
    res.render('index')
});

app.listen(PORT, () => {
    console.log(`the website is runing at ${PORT}`)
})
