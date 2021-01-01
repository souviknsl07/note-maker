showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj={
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value=''
  addTxt.value=''
  //console.log(notesObj);
  showNotes();
});

//function to show notes
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.map((element, index) => {
    html += `
    <div class="noteCard mx-2 my-2 card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>
  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else{
      notesElm.innerHTML=`Nothing to show add some notes!`
  }
}

// function to delete notes
function deleteNote(index){
    //console.log("I m deleting",index);
    let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes()
}

let search=document.getElementById("searchTxt")
search.addEventListener("input", function(){
    let inputVal=search.value.toLowerCase();
    //console.log(inputVal);
    let noteCards= document.getElementsByClassName("noteCard");
    Array.from(noteCards).map((element)=>{
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})