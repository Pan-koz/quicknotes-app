const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
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

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(dateLabel);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);

  render();

  noteInput.value = "";
});