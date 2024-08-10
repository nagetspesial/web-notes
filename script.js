// Select DOM elements
const noteContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".create");
const confirmationModal = document.getElementById("confirmationModal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const cancelDeleteButton = document.getElementById("cancelDelete");
const closeButton = document.querySelector(".close"); // Select close button
let noteToDelete = null;

// Function to load notes from localStorage
function showNotes() {
  const notes = localStorage.getItem("note");
  if (notes) {
    noteContainer.innerHTML = notes;
  }
}

// Function to update localStorage with current notes
function updateStorage() {
  localStorage.setItem("note", noteContainer.innerHTML);
}

// Create a new note
function createNote() {
  const deleteArea = document.createElement("div");
  const title = document.createElement("p");
  const img = document.createElement("img");
  const textArea = document.createElement("div");
  const inputBox = document.createElement("p");

  deleteArea.className = "delete-area";
  title.className = "title";
  title.setAttribute("contenteditable", "true");
  deleteArea.appendChild(title);

  img.src = "image/cross.svg";
  img.alt = "Delete Note";
  deleteArea.appendChild(img);

  textArea.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  textArea.appendChild(inputBox);

  noteContainer.appendChild(deleteArea);
  noteContainer.appendChild(textArea);

  updateStorage();
}

// Event listener for create button
createButton.addEventListener("click", createNote);

// Event listener for deleting notes
noteContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    // Show confirmation modal
    noteToDelete = e.target.closest(".delete-area");
    if (noteToDelete) {
      confirmationModal.classList.add("show");
    }
  }
});

// Confirm delete button click
confirmDeleteButton.addEventListener("click", function () {
  if (noteToDelete) {
    const textArea = noteToDelete.nextElementSibling;
    noteToDelete.remove();
    if (textArea) {
      textArea.remove();
    }
    updateStorage();
    noteToDelete = null; // Reset the noteToDelete variable
    confirmationModal.classList.remove("show");
  }
});

// Cancel delete button click
cancelDeleteButton.addEventListener("click", function () {
  noteToDelete = null; // Reset the noteToDelete variable
  confirmationModal.classList.remove("show");
});

// Close button click
closeButton.addEventListener("click", function () {
  noteToDelete = null; // Reset the noteToDelete variable
  confirmationModal.classList.remove("show");
});

// Event listener for updating storage on input changes
noteContainer.addEventListener("input", updateStorage);

// Prevent default Enter key behavior in contenteditable elements
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.execCommand("insertLineBreak");
  }
});

// Preloader
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 2000);
});

// Initialize notes on page load
showNotes();
