
>**TABLE OF CONTENT:**
1. [Task List](#base-mode-task-list-crud) 
2. [Stretch Goals - selective](#stretch-goals-my-selective-of-choices)
3. [setups & installation](#setups) 
    * [html](#folder-serverpublichtmlindex)
    * [stylesheet](#folder-serverpubliccssstylecss)
    * [jQuery](#folder-serverpublicvendorsjqueryjs)
    * [client.js](#folder-serverpublicscriptclientjs)
    * [database.sql](#root-folder-databasesql)
    * [server.js](#folder-serverserverjs)
    * [routers](#folder-serverrouters)
    * [modules](#folder-servermodulespooljs)
4. [GitHub merge/branch](#github-pullmerge)
5. [go to README](./README.md)
6. [go to official instruction](https://github.com/PrimeAcademy/weekend-sql-to-do-list/blob/main/INSTRUCTIONS.md)
---

## BASE MODE: task list (crud)

### <ins>HTML + with Bootstrap</ins>
- *UI that allow user to create a task on front end*
    * [x] input text field
    * [x] button: add new task
  

### <ins>CSS + with Bootstrap</ins>
- *When a task is done, it should look different on the UI. This is done using CSS and connected to the code that determines if the task is done*
    * [x] background color, must have 
    * [x] font family, must have
    * [x] font size, must have  
    * [x] input/task crossed out when task is completed 


### <ins>CLIENT + SERVER + DATABASE</ins>
- *When a task is created the front end it should be able to store data inside the database* 
    * [x] `POST`req/res from client to server -> server via router -> to database; add new task to database

- *When a task is created the front end should refresh to show all tasks that needs to be complete.*
    * [x] `GET`req/res from client to server -> server via router -> to database; retrieve task list and respond back with task list to server --> server will provide client with the update by displaying task list on the DOM
    * [x] render() to append 
         -- [x] new task
         -- [x] buttons: delete & complete - dynamic added with each task with functionality 


- *Each task should have an option to 'complete'*
    * [x] `PUT`req/res with `unique ID` from client to server -> server via router -> to database to update task (toggle complete button) 
        -- [x] when task is complete - it will `update` a strike through the task name
        -- [x] if task is complete the background color will change to solid green 
   

- *Each task should have an option to 'delete'*
    * [x] `DELETE` req/res with `unique ID` from client to server -> server via router -> to database to permanently remove data from database 
      -- [x] Deleting a Task will remove it from the front end as well as the Database.
      -- [x] an alert will be prompt to confirm deletion 


- *Any tasks that is COMPLETE or INCOMPLETE should remain on the database (unless deleted)*
    * [x] filter tabs - can be filter via tabs of all, active, or complete status

<br>

----

## STRETCH GOALS (*my selective of choices*)
1. [x] Practice git branching with each of the task listed above 

2. [x] Style with bootstrap 

3. [x] Buttons -- make completion buttons green and the delete red.

4. [x] `feature-confirm-delete`
     - create an 'are you sure: yes / no' option when deleting a task.
     [Sweet Alerts](https://sweetalert.js.org/guides/): Use the CDN option.

5. [x] responsive website application

<br>

---

## setups:
1. installation
    - [x] npm init -y (if package JSON IS NOT present on repo)
    - [x] npm install express
    - [x] npm install pg
    - [x] npm install nodemon (optional)

2. folders
   [x] - `server/`
       [x] - `modules/`
           [x] - pool.js
       [x] - server.js
       [x] - `routers/`
           [] - name.router.js
    
   [x] - `public/` 
       [x] - `css/`
           [x] - styles.css 
       [x] - html (index)
       [x] - `script/` 
           [x] - client.js
       [x] - `vendors/`
            [x]- jQuery 

3. `database.sql` [x]

4. `.gitignore` 
    - node_modules/
    - *.log
    - .DS_Store
    - .vscode/

----

## folder: server/public/html.index
* [x] Your boilerplate and HTML codes goes here!

## folder: server/public/css/style.css
* [x] Your styling codes goes in this file

## folder: server/public/vendors/jquery.js
* [x] Source CDN or add your jQuery files here

## folder: server/public/script/client.js
1. if using jQuery - document on ready!
    ```js
    $(document).ready(function () {
    console.log('jQuery sourced.');
    });
    ```

2. Any event handlers, Render, DOM manipulation goes here!

3. CRUD goes here (req/res = POST, GET, UPDATE, DELETE) goes here - communication with the server side

----

## root folder: database.sql
1. create a new database through Postico

2. database name = `weekend-to-do-app`

3. inside the root folder: `database.sql`
* this is where your database instruction go! See examples below:
    ```js
    CREATE TABLE "tasks" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(200) NOT NULL,
        "is_complete" BOOLEAN DEFAULT FALSE);
    ```
    ```js
    INSERT INTO "tasks" ("name", "is_complete")
    VALUES 
    ('buy oat milk', false),
    ('grind coffee bean', false),
    ('get starbucks', false);
    ```
    ```js
    SELECT * FROM "tasks";
    ```
   
----

## folder: server/server.js
1. imports such as examples below: 
    ```js
        const express = require('express');
        const bodyParser = require('body-parser');
        const taskRoute = require('./routes/task.router.js');
        const app = express();
    ```

2. Setup body parser - to translating request body into JSON
    ```js
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    ```

3. Serve back static files by default
    ```js
    app.use(express.static('server/public'))
    ```

4. connect app with the router
    ```js
    app.use('/task', taskRoute);
    ```

5. Start listening for requests on a specific port
    ```js
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log('listening on port', PORT);
    });
    ```

----

## folder: server/routes/
1.  import express, router, and pool modules
    ```js
    const express = require('express');
    const router = express.Router();
    const pool = require('../modules/pool');
    ```
2. CRUD between server and database (req/res = POST, GET, UPDATE, DELETE) goes here!

3. export router (get import to server side)
    ```js
    module.exports = router;
    ```
---

## folder: server/modules/pool.js
1. import pg module
    ```js
    const pg = require('pg');
    ```
2. setup environment:
    * name of the database
    * the location of the database within the network
    * the port to listen to

    ```js
    const pool = new pg.Pool({
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432, 
    })
    ```

3. export module 
    ```js
    module.exports = pool;
    ```

---

## GitHub Pull/Merge 

* **If working with a group use the following shortcut for your git stuff!**

1. one person create a repo and invite team to join 
1. accept invite to repo 
1. `git clone` to your local 
1. `git pull origin main`
1. `git branch YOUR NEW BRANCH NAME HERE`
1. `git checkout` (this will switch to YOUR NEW BRANCH NAME HERE)
1. make your changes, once done continue next step below:
    * `git add .`
    * `git commit -m 'message'`
    * `git push YOUR NEW BRANCH NAME HERE`
1. READY TO MERGE? once merge --> merge == final! ALWAYS check work, comments BEFORE you merge!!!
    * `git checkout main`
    * Merge from YOUR NEW BRANCH NAME HERE into main:
        * `git merge --no-ff YOUR NEW BRANCH NAME HERE`
    

[See step-by-steps source here](https://github.com/PrimeAcademy/amethyst-syllabus/blob/main/lecture-notes/week-08-fullstack-sql/08-01_git-branching.md)

---

## Common Tasks/Commands

- `git branch BRANCH-NAME` - Create a branch with the name of **BRANCH-NAME**
- `git branch` - Display the branch you're currently on
- `git branch -a` - Show all available branches that have been created
- `git checkout BRANCH-NAME` - Switch to the branch with name **BRANCH-NAME**
- `git checkout -b BRANCH-NAME` - Create a new branch and check it out
- `git merge --no-ff BRANCH-NAME` - Merge **BRANCH-NAME** into the current branch (use `git branch` to determine the current branch)
- `git pull origin BRANCH-NAME` - Pull down changes from the remote
- `git checkout -b BRANCH-NAME` - Combines branch creation with checkout in one handy command

[source here](https://github.com/PrimeAcademy/amethyst-syllabus/blob/main/lecture-notes/week-08-fullstack-sql/git-branching-cheatsheet.md)

