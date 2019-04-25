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
    res.json({
        "contacts": [
          {
            "id": "Contacts_Total",
            "contactList": [
              "Amy",
              "Bob",
              "Catlin",
              "David"
            ],
            "description": "This is a list of all contacts of the user "
          },
          {
            "id": "Contacts_Journey1",
            "contactList": [
              "Bob",
              "Catlin"
            ],
            "description": "This is a list of contacts for Journey 1 of the user "
          },
          {
            "id": "Contacts_Journey2",
            "contactList": [
              "Amy",
              "Catlin",
              "David"
            ],
            "description": "This is a list of contacts for Journey 1 of the user "
          }
        ],
        "history": [
          {
            "id": "a9b2b073-2d2d-4c15-b03d-961e40f7d09d",
            "contactName": "Bob",
            "contactTime": "2018-09-16 20:18:30"
          },
          {
            "id": "2ceb6067-c61b-48e5-8ddd-842e9262f429",
            "contactName": "Amy",
            "contactTime": "2019-02-08 16:21:02"
          },
          {
            "id": "aa2cf020-748d-45ee-93ad-1a8af8834856",
            "contactName": "Catlin",
            "contactTime": "2019-03-02 10:56:28"
          },
          {
            "id": "0529bacc-7724-4af6-b9a2-7d485fb71906",
            "contactName": "Bob",
            "contactTime": "2019-04-03 09:35:01"
          },
          {
            "id": "0529bacc-7724-4af6-b9a2-7d485fb71906",
            "contactName": "Catlin",
            "contactTime": "2019-04-10 11:20:56"
          }
        ]
      })
});

// http://localhost:3000
app.listen(3000, () =>{
    console.log("Loop server is listening on port 3000...")
});