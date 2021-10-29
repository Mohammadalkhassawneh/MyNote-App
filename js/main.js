let addBtn = document.getElementById ("add-btn");
let addTitle = document.getElementById ("note-title");
let addText = document.getElementById ("note-text");
// console.log (addTitle);
// console.log (addText);
addBtn.addEventListener ("click" , (e) => {
if (addTitle.value == "" || addText.value == ""){
     alert ("Please add note and details");
}
let notes = localStorage.getItem ("notes");
if (notes == null){
    notesObj = [];
} else {
    notesObj = JSON.parse(notes);
}
 let myObj = {
     title: addTitle.value,
     text: addText.value
 }
 notesObj.push (myObj);
 localStorage.setItem ("notes", JSON.stringify (notesObj));
 addTitle.value = "";
 addText.value = "";

 showNotes ();

});

//Show Notes on the page
function showNotes () {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index){
        html += `  
        <div id="note">
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
        <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">edit Note</button>

    </div>`
    ;
    });

    let notesElm = document.getElementById ("notes");
    if (notesObj.length != 0){
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = "No Notes Yet! add a note using the form above";

    }

}

//Function to delete notes
function deleteNote(index){
    let confirmDelete = confirm("You are deleting this note!")

    if (confirmDelete == true){
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem ("notes" , JSON.stringify(notesObj));
        showNotes();
    }


}

//Function to edit the notes
function editNote(index) {
    let notes = localStorage.getItem ("notes");
    if (addTitle.value !== "" || addText.value !== ""){
        return alert ("please clear the form before editing a note");
    }
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.findIndex ((element, index) => {
        addTitle.value = element.title;
        addText.value = element.text;


    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
showNotes();

}

showNotes();


