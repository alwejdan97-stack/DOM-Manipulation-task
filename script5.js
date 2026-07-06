// ==========================================
// 1. STATE DEFINITIONS & ELEMENT SELECTION
// ==========================================
// Global empty array to contain all active note object profiles
let notes = [];

const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const noteCounter = document.getElementById("noteCounter");

function addNote() {
    const titleValue = titleInput.value.trim();
    const contentValue = contentInput.value.trim();

    if (titleValue === "") {
        alert("Please provide a title for your note.");
        return;
    }

    const newNote = {
        id: Date.now(),
        title: titleValue,
        content: contentValue
    };

    notes.push(newNote);

    saveNotes();
    renderNotes(notes);

    titleInput.value = "";
    contentInput.value = "";
}

function renderNotes(notesArrayToRender) {
    notesContainer.innerHTML = "";

    notesArrayToRender.forEach(note => {

        const noteCard = document.createElement("div");
        noteCard.className = "note-card";
        noteCard.setAttribute("data-note-id", note.id);

        const noteTitle = document.createElement("h3");
        noteTitle.className = "note-title";
        noteTitle.textContent = note.title;

        const noteContent = document.createElement("p");
        noteContent.className = "note-content";
        noteContent.textContent = note.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        noteCard.appendChild(noteTitle);
        noteCard.appendChild(noteContent);
        noteCard.appendChild(deleteBtn);

        
        notesContainer.appendChild(noteCard);
    });

    noteCounter.textContent = notesArrayToRender.length;
}

function deleteNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    saveNotes();
    searchNotes();
}

function saveNotes() {
    localStorage.setItem("notesData", JSON.stringify(notes));
}

function loadNotes() {
    const rawData = localStorage.getItem("notesData");
    
    if (rawData) {
        notes = JSON.parse(rawData);
    } else {
        notes = [];
    }

    renderNotes(notes);
}

function searchNotes() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredNotes = notes.filter(note => {
        const matchesTitle = note.title.toLowerCase().includes(query);
        const matchesContent = note.content.toLowerCase().includes(query);
        return matchesTitle || matchesContent;
    });

    renderNotes(filteredNotes);
}

notesContainer.addEventListener("click", function(event) {
    const targetElement = event.target;

    if (targetElement.classList.contains("delete-btn")) {
        const parentCard = targetElement.closest(".note-card");
        const noteId = parseInt(parentCard.getAttribute("data-note-id"), 10);
        
        deleteNote(noteId);
    }
});

searchInput.addEventListener("input", searchNotes);
document.addEventListener("DOMContentLoaded", loadNotes);