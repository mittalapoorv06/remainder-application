showNote();
//ADD NOTE BUTTON
let addbtn = document.getElementById("addbtn");
let addtitle = document.getElementById("addtitle")
addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById("addtxt");
    let note = localStorage.getItem("note");
    if (note == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(note);
    }
    let myobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem("note", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesobj);
    showNote();
})
//SHOW NOTE FUNCTION
function showNote() {
    let note = localStorage.getItem("note");
    if (note == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(note);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += ` <div class="card noteCard my-2 mx-2" style="width: 18rem;">
        <div id="cardbody" class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Note</button>
          <button onclick="remainder(this.id)" id="setreminder${index}"class="btn btn-primary">set Reminder</button>
          
        </div>
      </div>  
        `

    });
    let noteElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        noteElm.innerHTML = html;

    }
    else {
        noteElm.innerHTML = 'Nothing to show! plz add note';
    }
}
//DELETE NOTE FUNCTION
function deleteNote(index) {
    console.log(index);
    let note = localStorage.getItem("note");
    if (note == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(note);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(notesobj));
    showNote();


}
//SEARCHDE
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inptval = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inptval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});
//alarm
function remainder(ids) {
    console.log(ids);
    // let setreminder = document.getElementById("setreminder");
    // setreminder.addEventListener("click", () => {
    console.log("hello");
    $('#alarmModal').modal('toggle');

    // })
    let setalarm = document.getElementById("setalarm");
    setalarm.addEventListener("click", () => {
        let alarmdate = document.getElementById("alarmdate").value;
        console.log(alarmdate);
        let date = new Date(alarmdate)
        let now = new Date()
        let ring = date - now;
        if (ring >= 0) {
            setTimeout(() => {
                ringbell(ids);
            }, ring);
        }


    })
}
function ringbell(ids) {
    let msg = ids.charAt(ids.length - 1);
    let remmod = document.getElementById("remmod");
    let note = localStorage.getItem("note");
    if (note == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(note);
    }
    remmod.innerText = "you have remainder " + notesobj[msg].title;
    $('#ringModal').modal('toggle')

    console.log("sss");
    let audio = new Audio("js/r.mp3");
    audio.play();
}