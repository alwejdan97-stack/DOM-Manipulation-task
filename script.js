const title=document.getElementById("titleInput");
const author=document.getElementById("authorInput");
const button=document.getElementById("addBtn");
const container=document.getElementById("bookContainer");
const counter=document.getElementById("bookCounter");
let totalBook=0;

function addBook(){
    const titleValue=title.value.trim();
    const authorValue=author.value.trim();

    if(title==="" || author===""){
        alert("Title And Author Can't Be Empty...");
        return;
    }

    const card=document.createElement("div");
    card.className="bookCard";

    const information=document.createElement("span");
    information.textContent="Title: ${titleValue} | Author: ${authorValue}";
    card.append(information);

    const deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.className="deleteButton";

    deleteButton.addEventListener("click", function(){
        deleteButton(card);
    });

    card.appendChild(deleteButton);
    container.appendChild(card);

    totalBook++;
    title.value="";
    author.value="";
}

function updateCounter(){
    counter.textContent=totalBook;
}

function deleteBook(bookElement){
    bookElement.remove();
    totalBook--;
    updateCounter();
}

