// global variable
var ideas = [];

var saveButton = document.getElementById('save-button');
var titleInput = document.getElementById('title');
var bodyInput = document.getElementById('body');
var searchIdeas = document.getElementById('search-ideas');
var cardBox = document.querySelector('card-box');

saveButton.addEventListener('click', createIdea);

function createIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(newIdea);
}
