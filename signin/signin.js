var database = firebase.database().ref("/")
var email = document.getElementById("inputemail");
var password = document.getElementById("inputpassword")



document.getElementById("stop").addEventListener("submit",

    function submit(event) {
        if (email.value != "" || password.value != "") {
            event.preventDefault()
            var user = {
                email: email.value,
                password: password.value
            }
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(function (success) {
                    database.child('user/' + success.uid).once("value", function (snapshot) {
                        localStorage.setItem("user", JSON.stringify(snapshot.val()))
                    }).then(function (success) {
                        window.location.href = "../home/home.html"
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        }
        else if(email.value == ""||password.value==""){
    alert("Please Enter Email/Password");
        }
    })
