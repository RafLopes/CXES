function UpdateDB(){
    var config = {
    apiKey: "AIzaSyCCEO3O9LLKHdq0dj5oMxriDEipe4UFoqg",
    authDomain: "clubeerbostenzelxadrez.firebaseapp.com",
    projectId: "clubeerbostenzelxadrez",
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  
      // WriteDB()
      countDB()

}


function countDB() {
  var db = firebase.firestore()

  db.collection("Players").where("Name", "==", "carlsendetaubate")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("Document data:", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
};

function WriteDB(){
  console.log(members)
  count = 0

  var db = firebase.firestore()

  members.map(member => {
    db.collection('Players').doc(count.toString()).set({
      Name: member.name,
      FinalScore: member.finalScore,
      Tournaments: member.tournament
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', count.toString())
      // location.reload()
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
    count = count + 1
  })
}

