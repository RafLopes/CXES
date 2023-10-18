async function onSubmit() {
  var Nome = document.getElementById("Nome").value
  var email = document.getElementById("email").value
  var mensagem = document.getElementById("comentario").value
  var now = new Date
  var DataHoje = now.getDate() + "/" + parseInt(parseInt(now.getMonth())+1) + "/" +  now.getFullYear()

  WriteDB(Nome, email, mensagem, DataHoje)

}


async function WriteDB (Nome, email, mensagem, DataHoje) {
  console.log('Executando a count')
  var NumMensagens = await countDB()
  var db = firebase.firestore()
    
    db.collection('Comentarios').doc(NumMensagens.toString()).set({
    id: NumMensagens,
    Nome: Nome,
    email: email,
    mensagem: mensagem,
    DataHoje: DataHoje,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', NumMensagens.toString())
      location.reload()
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
        
};

function countDB () {
  var db = firebase.firestore()
  var sizedb
  sizedb = db.collection('Comentarios').get().then(function (querySnapshot) {
    return sizedb = querySnapshot.size
  })
  return sizedb
};

async function searchDB (idnumber) {
  var db = firebase.firestore()
  var docRef = await db.collection('Comentarios').doc(idnumber)

  var DBOBJ = docRef.get().then(async function (doc) {
      if (doc.exists) {
      // console.log('Document data exist:', doc.data())
      return doc.data();
      } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      }
  }).catch(function (error) {
      console.log('Error getting document:', error)
  })
  
  return DBOBJ
}

// Não usei
async function searchAllDB () {
  var db = firebase.firestore()

  DBOBJ = db.collection("Comentarios").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        return doc.data();
    }); 
  });
  
  return DBOBJ
}

async function WriteAllComents(){

  var NumMensagens = await countDB()

  // console.log(NumMensagens)

  for (var i = NumMensagens-1; i>=0 ; i--) {
    //  console.log(i)
    var JsondoDB = await searchDB (i.toString())
    //  console.log(JsondoDB)

    var elementHtml = document.getElementById("CarregarComentarios")
    var icon = "<img src='./src/vectorpaint.png' width='22' height='22' alt='logo xadrez'/>"

    // console.log(JsondoDB.DataHoje)

    var newElementHtml = icon + " " + JsondoDB.Nome + "  comentou em " + JsondoDB.DataHoje +  ":<br>" + JsondoDB.mensagem + "<br><br>"
    elementHtml.insertAdjacentHTML( 'beforeend' , newElementHtml )
  }
  
}

// Não usei
async function WriteAllComentsAllAnswers(){

  var NumMensagens = await countDB()

  var Answers = await searchAllDB ()

  console.log(Answers)

  
}