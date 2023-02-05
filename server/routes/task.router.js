// import express, router, and pool modules
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// 2. CRUD goes here (req/res = POST, GET, UPDATE, DELETE) goes here!
router.post('/add-task',  (req, res) => {
    console.log('res body: ', req.body);  // always check req.body first to see what it it
    console.log('res body.data: ', req.body.data); // then check the data
    let taskName = req.body.data;

    let queryText = `INSERT INTO "tasks" ("is_complete", "name")
                     VALUES ($1, $2);`;
    pool.query(queryText, [ false , taskName ])
      .then(result => {
        console.log('test if result is complete', result);
        res.sendStatus(201);

      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });


  router.get('/get-task-list', (req, res) => {
   
    // insert this code to grab the tasks from the db
    let queryText = 'SELECT * FROM "tasks";';
    
    pool.query(queryText)
    .then((result) => {
        
        // array of object that gets return in that query
        let payload = {
          data: result.rows
        }

        console.log('My payload:', payload);
        res.send(payload);
    })
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
        res.sendStatus(500)
    })
});


router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM tasks WHERE id = $1;`;

  const queryParams = [req.params.id];

  pool.query(queryText, queryParams)
  .then((dbRes) => { 
      res.sendStatus(204); // NO CONTACT STATUS
  })
  .catch((error) => { 
      console.log(`Error making query: ${queryText}`, error);
      res.sendStatus(500);
  });
});


router.put('/:id', (req, res) => {
  
  const queryText = `UPDATE tasks SET is_complete = $1 WHERE id = $2;`;

  const queryParams = [ req.body.data, req.params.id];

  pool.query(queryText, queryParams)
  .then((dbRes) => { 
      res.sendStatus(204); // NO CONTACT STATUS
  })
  .catch((error) => { 
      console.log(`Error making query: ${queryText}`, error);
      res.sendStatus(500);
  });
});

// export router (get import to server side)
module.exports = router;
