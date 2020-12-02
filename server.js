const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

let PORT = process.env.PORT ? process.env.PORT : 8080;

let notesData = [];

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, "Develop/public")));

app.post('/notes', function (req, res) {
  try{
  
  }
})