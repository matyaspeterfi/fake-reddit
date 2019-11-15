'use strict';

const mysql = require('mysql');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const PORT = process.env.PORT;
const express = require('express');
const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();

module.exports = { conn, PORT, app, jsonParser, express };