var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

let activeNote = {};

//pull notes from database
var getNotes = function() {
  return $.ajax({
    url: '/api/notes',
    method: 'GET'
  });
};

//save note to db
var saveNote = () => {
  return $.ajax({
    url: '/api/notes',
    data: none,
    method: 'POST'
  });
};

//remove note from db
var deleteNote = () => {
  return $.ajax({
    url: '/api/notes' + id,
    method: 'DELETE'
  });
};

