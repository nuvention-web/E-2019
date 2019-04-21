const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Loop makes your professional network better')
});

app.get('/api/loops/users', (req, res) =>{
    var user1 = {firstName: 'David Lee', school: 'Kellog', careerGoal: 'Project Manager'}
    var user2 = {firstName: 'John Doe', school: 'McCormick', careerGoal: 'Software Engineer'}
    res.json([user1, user2])
});

app.listen(3000, () =>{
    console.log("Loop server is listening on port 3000...")
})