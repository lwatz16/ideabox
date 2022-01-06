// global variable
var ideas = [];

var saveButton = document.getElementById('save-button');
var titleInput = document.getElementById('title');
var bodyInput = document.getElementById('body');
var searchIdeas = document.getElementById('search-ideas');
var cardBox = document.querySelector('.card-box');

saveButton.addEventListener('click', createIdea);
saveButton.disabled = true;
body.addEventListener('input', event => {
  if (titleInput.value.length > 0 && bodyInput.value.length > 0) {
    saveButton.disabled = false;
    saveButton.classList.remove('greyed');
  }
})

function createIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(newIdea);
  makeCard();
  clearInput(titleInput);
  clearInput(bodyInput);
  saveButton.disabled = true;
  saveButton.classList.add('greyed');
}

function clearInput(input) {
  input.value = "";
}

function makeCard() {
  cardBox.innerHTML = ``
  for (var i=0; i<ideas.length; i++) {
  cardBox.innerHTML += `
  <div class="card" id=${ideas[i].id}>
    <div class="top-bar">
      <img class="star-active icon hidden" src="./assets/star-active.svg" alt="star-active">
      <img class="star icon" src="./assets/star.svg" alt="star">
      <img class="delete-active icon hidden" src="./assets/delete-active.svg" alt="delete-active">
      <img class="delete icon" src="./assets/delete.svg" alt="delete">
    </div>
    <section class="idea-section">
      <h2>${ideas[i].title}</h2>
      <p>${ideas[i].body}</p>
    </section>
    <div class="bottom-bar">
      <img class="comment icon" src="./assets/comment.svg" alt="comment">
      <h3 class="comment">Comment</h3>
      </div>
    </div>`
    }
}

// function add(element, selector) {
//   element.classList.add(selector);
// }
//
// function remove(element, selector) {
//   element.classList.remove(selector);
// }
