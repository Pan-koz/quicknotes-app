const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function render() {
  notesList.textContent = "";

  const searchText = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText)
  );

  if (filteredNotes.length === 0 && searchText !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  filteredNotes.forEach((note) => {
    const listItem = document.createElement("li");
    const noteText = document.createElement("p");
    const categoryLabel = document.createElement("small");
    const dateLabel = document.createElement("small");
    const deleteButton = document.createElement("button");

    noteText.textContent = note.text;
    categoryLabel.textContent = `Category: ${note.category}`;
    dateLabel.textContent = note.createdAt;
    deleteButton.textContent = "Delete";

    listItem.classList.add(
      `category-${note.category.toLowerCase()}`
    );

    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      saveNotes();
      render();
    });

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(dateLabel);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
  });

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);

  saveNotes();
  render();

  noteInput.value = "";
});

searchInput.addEventListener("input", render);

render();