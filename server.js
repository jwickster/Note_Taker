const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

let PORT = process.env['PORT'] ? process.env.PORT : 8080;

let dataNotes = [];

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, "Develop/public")));


//GET
app.get("/api/notes", function(err, res) {
  try {
    // reads the notes from json file
    dataNotes = fs.readFileSync("/db.json", "utf8");
    console.log("hello!");
    // parse it so dataNotes is an array of objects
    dataNotes = JSON.parse(dataNotes);
    
    // error handling
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  //send objects to the browser
  res.json(dataNotes);
});
//POST
app.post("/api/notes", function(req, res) {
  try {
    // reads the json file
    dataNotes = fs.readFileSync("./Develop/db/db.json", "utf8");
    console.log(dataNotes);
    
    // parse the data to get an array of objects
    dataNotes = JSON.parse(dataNotes);
    // Set new notes id
    req.body.id = dataNotes.length;
    // add the new note to the array of note objects
    dataNotes.push(req.body);
    // make it string(stringify)so you can write it to the file
    dataNotes = JSON.stringify(dataNotes);
    // writes the new note to file
    fs.writeFile("./db/db.json", dataNotes, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });
    // change back to an array of objects & send it back to the browser(client)
    res.json(JSON.parse(dataNotes));
    
    // error Handling
  } catch (err) {
    throw err;
    console.error(err);
  }
});

// Delete a note
app.delete("/api/notes/:id", function(req, res) {
  try {
    //  reads the json file
    dataNotes = fs.readFileSync("./db/db.json", "utf8");
    // parse the data to get an array of the objects
    dataNotes = JSON.parse(dataNotes);
    // delete the old note from the array on note objects
    dataNotes = dataNotes.filter(note => {
      return note.id != req.params.id;
    });
    // make it string(stringify)so you can write it to the file
    dataNotes = JSON.stringify(dataNotes);
    // write the new notes to the file
    fs.writeFile("./db/db.json", dataNotes, "utf8", function(err) {
      // error handling
      if (err)
        throw err;
    });
    
    // change it back to an array of objects & send it back to the browser (client)
    res.send(JSON.parse(dataNotes));
    
    // error handling
  } catch (err) {
      throw err;
      console.log(err);
  }
});



// Web page when the Get started button is clicked
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./notes.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "./db/db.json"));
});

// Start the server on the port
app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});
