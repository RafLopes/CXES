var config = {
    apiKey: "AIzaSyCCEO3O9LLKHdq0dj5oMxriDEipe4UFoqg",
    authDomain: "clubeerbostenzelxadrez.firebaseapp.com",
    databaseURL: "https://clubeerbostenzelxadrez.firebaseio.com",
    projectId: "clubeerbostenzelxadrez",
    storageBucket: "clubeerbostenzelxadrez.appspot.com",
    messagingSenderId: "917698917572",
    appId: "1:917698917572:web:d197c47bd0ce1fe7aec591",
    measurementId: "G-HMEPWEBG64"
};
// Initialize Firebase
firebase.initializeApp(config);
var db = firebase.firestore()

var members = []

db.collection('IIICopaCXES').doc("Tabela").collection("Etapa Atual")
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        members.push(new Member(doc.data().finalScore, doc.data().position, doc.data().realname, doc.data().nickname))
    });
    return(members.sort( (a,b) => a.finalScore < b.finalScore ? -1 : 1))
    })
    .then(members => render(members))

console.log("read DB")

class Member {
    finalScore = 0
    position = 0
    realname = ""
    nickname = ""

    constructor(finalScore, position, realname, nickname){
        this.finalScore = finalScore 
        this.position = position 
        this.realname = realname  
        this.nickname = nickname  
    }
}


function render(members){
    var table = document.getElementById("mytable");
    // console.log(members)
    members.map(member => {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        cell1.className = "tooltip";
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell2.innerHTML = '<div class="tooltip">'+member.nickname+'<span class="tooltiptext">'+member.realname+'</span></div>'
        cell3.innerHTML = member.finalScore;
        cell1.innerHTML = member.position;
    })

    document.getElementById("idloader").style.display = 'none';
}