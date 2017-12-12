var username=document.getElementById("username");
var email=document.getElementById("email");
var password=document.getElementById("password");
var database=firebase.database().ref("/")
// var auth=firebase.auth();
function submit(){
  var  user={
        name:username.value,
        email:email.value,
        password:password.value
    }
    // database.child("users").push(user)
    // console.log(user)

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(function (res){
      user.useruid=res.uid;
        database.child("user/" + res.uid).set(user)
            .then(function (success) {
            window.location.href="signin/signin.html"
        })
        })
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
username.value="";
email.value="";
password.value=""
}