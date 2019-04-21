const express = require('express');
const app = express();
const morgan = require('morgan');

app.get('/', (req, res) => {
    res.send('Loop makes your professional network better')
});

app.get('/api/loops/users', (req, res) =>{
    var user1 = {firstName: 'David Lee', school: 'Kellog', careerGoal: 'Project Manager'}
    var user2 = {firstName: 'John Doe', school: 'McCormick', careerGoal: 'Software Engineer'}
    var user3 = {firstName: 'Tony Stark', school: 'Kellog', careerGoal: 'Consultant'}
    var user4 = {firstName: 'Bessie Berry', school: 'Medill', careerGoal: 'Content Marketing Manager'}
    res.json([user1, user2, user3, user4])
});

// http://localhost:3000
app.listen(3000, () =>{
    console.log("Loop server is listening on port 3000...")
});