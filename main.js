var ideas = [];
var starButtonStatus = false;
var filteredCards = [];

var saveButton = document.getElementById('save-button');
var titleInput = document.getElementById('title');
var bodyInput = document.getElementById('body');
var searchIdeas = document.getElementById('search-ideas');
var cardBox = document.querySelector('.card-box');
var starToggleButton = document.querySelector('.show-starred-button');

window.addEventListener('load', function() {
  saveButton.disabled = true;
});
saveButton.addEventListener('click', createIdea);
body.addEventListener('input', event => {
  if (titleInput.value.length > 0 && bodyInput.value.length > 0) {
    saveButton.disabled = false;
    saveButton.classList.remove('greyed');
  }
})

cardBox.addEventListener('click', function(e) {
  if (e.target && e.target.matches('.delete')) {
    deleteCard(e);
  } else if (e.target && e.target.matches('.star')) {
    favoriteCard(e);
  } else if (e.target && e.target.matches('.star-active')) {
    favoriteCard(e);
  }
});

starToggleButton.addEventListener('click', updateButtonStatus);

searchIdeas.addEventListener('input', function(e) {
  if (searchIdeas.value.length > 0) {
    var input = searchIdeas.value.toLowerCase();
    filteredCards = [];
    for (var i=0; i < ideas.length; i++) {
      if (ideas[i].title.includes(input) || ideas[i].body.includes(input)) {
        filteredCards.push(ideas[i]);
      }
    }
    makeCard(filteredCards);
  } else {
    makeCard(ideas);
  }
});

function updateButtonStatus() {
  if (starButtonStatus === false) {
    starToggleButton.innerText = 'Show All Ideas';
    starButtonStatus = true;
  } else {
    starToggleButton.innerText = 'Show Starred Ideas';
    starButtonStatus = false;
  }
  makeCard(ideas);
}

function createIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(newIdea);
  makeCard(ideas);
  clearInput(titleInput);
  clearInput(bodyInput);
  saveButton.disabled = true;
  saveButton.classList.add('greyed');
}

function clearInput(input) {
  input.value = "";
}

function makeCard(arrayName) {
  cardBox.innerHTML = ``
  if (starButtonStatus === false) {
    for (var i=0; i<arrayName.length; i++) {
      if (arrayName[i].star === false) {
        createUnstarredCard(arrayName[i]);
      } else if (arrayName[i].star === true) {
        createStarredCard(arrayName[i]);
      }
    }
  } else if (starButtonStatus === true) {
    for (var i=0; i<arrayName.length; i++) {
      if (arrayName[i].star === true) {
        createStarredCard(arrayName[i]);
      }
    }
  }
}
//
// function makeCard() {
//   cardBox.innerHTML = ``
//   if (starButtonStatus === false) {
//     for (var i=0; i<ideas.length; i++) {
//       if (ideas[i].star === false) {
//         createUnstarredCard(ideas[i]);
//       } else if (ideas[i].star === true) {
//         createStarredCard(ideas[i]);
//       }
//     }
//   } else if (starButtonStatus === true) {
//     for (var i=0; i<ideas.length; i++) {
//       if (ideas[i].star === true) {
//         createStarredCard(ideas[i]);
//       }
//     }
//   }
// }
// goal: display only the cards that exactly match the same characters in the same order
// access the text values of title input and body input
// if there are 1 or more letters in the field, check the string of current letters
// against each of the cards in the array
// if the card matches the input, keep the card up
// if the card doesn't match, do not display card

function createStarredCard(idea) {
  cardBox.innerHTML += `
  <div class="card" id=${idea.id}>
    <div class="top-bar">
      <img class="star-active icon" src="./assets/star-active.svg" alt="star">
      <img class="delete icon" src="./assets/delete.svg" alt="delete">
    </div>
    <section class="idea-section">
      <h2>${idea.title}</h2>
      <p>${idea.body}</p>
    </section>
    <div class="bottom-bar">
      <img class="comment icon" src="./assets/comment.svg" alt="comment">
      <h3 class="comment">Comment</h3>
    </div>
  </div>`
}

function createUnstarredCard(idea) {
  cardBox.innerHTML += `
  <div class="card" id=${idea.id}>
    <div class="top-bar">
      <img class="star icon" src="./assets/star.svg" alt="star">
      <img class="delete icon" src="./assets/delete.svg" alt="delete">
    </div>
    <section class="idea-section">
      <h2>${idea.title}</h2>
      <p>${idea.body}</p>
    </section>
    <div class="bottom-bar">
      <img class="comment icon" src="./assets/comment.svg" alt="comment">
      <h3 class="comment">Comment</h3>
    </div>
  </div>`
}

function deleteCard(e) {
  var id = e.target.parentNode.parentNode.id;
  for (var i = 0; i < ideas.length; i++) {
    if (id === ideas[i].id.toString()) {
      ideas.splice(i, 1);
    }
  }
  makeCard(ideas);
}

function favoriteCard(e) {
  var id = e.target.parentNode.parentNode.id;
  for (var i = 0; i < ideas.length; i++) {
    if (id === ideas[i].id.toString()) {
      ideas[i].updateIdea();
    }
  }
  makeCard(ideas);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
