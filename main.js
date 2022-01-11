/*~~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~ */
var saveButton = document.getElementById("saveButton");
var titleInput = document.getElementById("title");
var bodyInput = document.getElementById("body");
var searchIdeas = document.getElementById("searchIdeas");
var formBox = document.getElementById("formBox");
var cardBox = document.getElementById("cardBox");
var starToggleButton = document.getElementById("starToggleButton");

/*~~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~ */
window.addEventListener("load", function() {saveButton.disabled = true;});
saveButton.addEventListener("click", saveIdea);
starToggleButton.addEventListener("click", updateStarToggleButtonStatus);
formBox.addEventListener("input", checkSaveButtonStatus);
cardBox.addEventListener("click", function(e) {matchTargetCard(e)});
searchIdeas.addEventListener("input", filterSearch);

/*~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~ */
function clearInput(input) {
	input.value = "";
}

function updateStarToggleButtonStatus() {
	if (starButtonStatus === false) {
		starToggleButton.innerText = "Show All Ideas";
		starButtonStatus = true;
	} else {
		starToggleButton.innerText = "Show Starred Ideas";
		starButtonStatus = false;
	}
	filterSearch();
}

function checkSaveButtonStatus() {
	if (titleInput.value.length > 0 && bodyInput.value.length > 0) {
		saveButton.disabled = false;
		saveButton.classList.remove("greyed");
	}
}

function saveIdea() {
	var newIdea = new Idea(titleInput.value, bodyInput.value);
	ideas.push(newIdea);
	makeCards(ideas);
	clearInput(titleInput);
	clearInput(bodyInput);
	saveButton.disabled = true;
	saveButton.classList.add("greyed");
}

function filterSearch() {
	if (searchIdeas.value) {
		filteredCards = [];
		var input = searchIdeas.value.toLowerCase();
		for (var i = 0; i < ideas.length; i++) {
			var ideaTitle = ideas[i].title.toLowerCase();
			var ideaBody = ideas[i].body.toLowerCase();
			if (ideaTitle.includes(input) || ideaBody.includes(input)) {
				filteredCards.push(ideas[i]);
			}
		}
		makeCards(filteredCards);
	} else {
		makeCards(ideas);
	}
}

function makeCards(arrayName) {
	cardBox.innerHTML = "";
	if (!starButtonStatus) {
		for (var i = 0; i < arrayName.length; i++) {
			if (!arrayName[i].star) {
				createUnstarredCard(arrayName[i]);
			} else if (arrayName[i].star) {
				createStarredCard(arrayName[i]);
			}
		}
	} else if (starButtonStatus) {
		for (var i = 0; i < arrayName.length; i++) {
			if (arrayName[i].star) {
				createStarredCard(arrayName[i]);
			}
		}
	}
}

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
  </div>`;
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
  </div>`;
}

function matchTargetCard(e) {
	if (e.target && e.target.matches(".delete")) {
		deleteCard(e);
	} else if (e.target && e.target.matches(".star")) {
		favoriteCard(e);
	} else if (e.target && e.target.matches(".star-active")) {
		favoriteCard(e);
	}
}

function deleteCard(e) {
	var id = e.target.parentNode.parentNode.id;
	for (var i = 0; i < ideas.length; i++) {
		if (id === ideas[i].id.toString()) {
			ideas.splice(i, 1);
		}
	}
	filterSearch();
}

function favoriteCard(e) {
	var id = e.target.parentNode.parentNode.id;
	for (var i = 0; i < ideas.length; i++) {
		if (id === ideas[i].id.toString()) {
			ideas[i].updateIdea();
		}
	}
	filterSearch();
}
