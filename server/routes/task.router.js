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



// export router (get import to server side)
module.exports = router;
