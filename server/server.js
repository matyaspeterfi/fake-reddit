'use strict';

require('dotenv').config();
let {conn, PORT, app, jsonParser, express} = require('./config');


conn.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    console.log(err);
    return;
  }else{console.log('Connection Established')};
});

//---server---//
app.use(express.static('../'));

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.status(200);
  res.sendfile('../index.html');
})

app.get('/hello', (req, res) => {
  res.status(200);
  res.send('Hello World');
})

app.get('/posts', (req, res) => {

  res.status(200);
  res.set('Content-Type', 'application/json')
  conn.query('SELECT * FROM posts;', function (err, rows) {
    if (err) {
      console.log(err.toString());
    }else{
    console.log('Posts data received from Db\n');
    let posts = rows;
    res.send({ "posts": posts });
    }
  })
})

app.post('/posts', jsonParser, (req, res) => {
  let response = '';
  res.status(200);
  res.set('Content-Type', 'application/json');
  let postTitle = conn.escape(req.body.title);
  let postURL = conn.escape(req.body.url);
  let owner = conn.escape(req.body.owner);
//task for later: validate incoming url to make sure it starts with 'http://'


  conn.query(`INSERT INTO posts(title, url, timestamp, owner) 
  VALUES (${postTitle}, ${postURL}, UNIX_TIMESTAMP(),${owner});`, function (err, rows) {
    if (err) {
      console.log(err.toString());
    }else{
    console.log('Post added to DB');
    }
  })
  conn.query(`SELECT post_id, title, url, timestamp, score, owner 
  FROM posts 
  ORDER BY post_id 
  DESC LIMIT 1;`, function (err, rows2) {
    if (err) {
      console.log(err.toString());
    }
    response = rows2[0];
    // console.log(response);
    res.send(response);
  })
})

app.put('/posts/:id/:action', (req, res) => {
  res.status(200);
  res.header({ 'Content-Type': "application/json" })
  let id = conn.escape(req.params.id);
  let score = 0;
  let action = req.params.action;
  let response = '';

  conn.query(`SELECT score FROM posts WHERE post_id = ${id};`, function (err, rows3) {
    if (err) {
      console.log(err.toString());
    }
    score = rows3[0].score;
    if (action == 'upvote') {
      score++
    } else if (action == 'downvote') {
      score--
    }
    conn.query(`UPDATE posts SET score = ${score} 
                WHERE post_id = ${id}`, function (err, rows4) {
      if (err) {
        console.log(err.toString());
      }
      conn.query(`SELECT post_id, title, url, timestamp, score 
                  FROM posts 
                  WHERE post_id = ${id};`, function (err, rows5) {
        if (err) {
          console.log(err.toString());
        } response = rows5[0];
        res.send(response);
      });
    });
  });
});
