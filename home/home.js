var database = firebase.database().ref('/')
var dua = document.getElementById("textbox");
var duaoutput = document.getElementById("duaoutput");
var auth = firebase.auth();
var navuser = document.getElementById("navuser");

function duapost() {
    if (dua.value != "") {
        var localuser = localStorage.getItem("user");
        localuser = JSON.parse(localuser);
        console.log("no err")
        database.child('userdua').push({ dua: dua.value, user: localuser.name })


    }
    else {
        alert("field empty")
    }
}

function getdatafun() {
    var localuser = localStorage.getItem("user");
    localuser = JSON.parse(localuser);
    var username = localuser.name;
    var fchar = username.slice(0, 1);
    fchar = fchar.toUpperCase();
    var lchar = username.slice(1)
    lchar = lchar.toLowerCase();
    var fullname = fchar + lchar;
    navuser.innerHTML = fullname;
    database.child('userdua').on("child_added", function (snap) {
        var obj = snap.val()
        obj.key = snap.key

        // var span2 = document.createElement("button");
        // span2.style.cssFloat="right"

        // span2.innerHTML = "X"
        // var button = document.createElement("button").innerHTML = "Remove"


        var newTag = document.createElement("div");
        var praybutton = document.createElement("button");
        praybutton.setAttribute("class", "btn btn-outline-primary btn-sm custombtnsize");
        praybutton.setAttribute("onclick", "prayfunc(this.id)");
        praybutton.setAttribute("id","like"+obj.key)
        praybutton.innerHTML = "pray";


        var commentdiv=document.createElement("div")
        var commenttextarea=document.createElement("textarea");
        commenttextarea.setAttribute("class","textareaclass");
         
        var commentbtn=document.createElement("button");
        commentbtn.innerHTML="comment";
        commentbtn.setAttribute("onclick","commentfunc(this.id)");
        commentbtn.setAttribute("class","btn btn-outline-primary btn-sm commentbtnstyle");
        commentbtn.setAttribute("id",obj.key);        
        commentbtn.setAttribute("onclick","submitcomment(this.id)")
            

        commentdiv.appendChild(commenttextarea);
        commentdiv.appendChild(commentbtn);        







        newTag.setAttribute("style", "word-wrap: break-word")

        newTag.innerHTML = "<strong>" + obj.user + "</strong>" + "<br>" + obj.dua;
        newTag.appendChild(praybutton);
                    newTag.appendChild(commentdiv);
                   

        newTag.setAttribute("class", "alert alert-light customstylingofmainalert")
        newTag.setAttribute("role", "alert")

        // span2.setAttribute("id", obj.key)
        // span2.setAttribute("class","removetodo")
        // span2.setAttribute("onclick", "removetodo(this,this.id)")
        // newTag.appendChild(span2)
        duaoutput.appendChild(newTag)
        dua.value = ""
        console.log(obj)
        console.log(snap)
    })
}
function logout() {
    console.log("logout")
    localStorage.removeItem("user");
    window.location.href = "../signin/signin.html"
}

function prayfunc(id) {
    var localuser = localStorage.getItem("user");
    localuser = JSON.parse(localuser);
    var btnid = document.getElementById(id);
          var nodeid=id
        nodeid=nodeid.slice(4)

  
    database.child('userdua').child(nodeid).once("child_added", function (snap) {
        var obj = snap.val();
        // console.log(obj)

        console.log(obj)

        if (obj.like == undefined) {

            database.child('userdua').child(nodeid).push({ like: 1 })

            btnid.innerHTML = 1
            setTimeout(function () { btnid.innerHTML = "pray" }, 2000);
        }
        else {
            database.child('userdua').child(nodeid).child(snap.key).update({ like: obj.like + 1 })
            btnid.innerHTML = obj.like + 1;
            setTimeout(function () { btnid.innerHTML = "pray" }, 2000);
        }

    })
}

function submitcomment(id){
    var commentuser=localStorage.getItem("user");
    commentuser=JSON.parse(commentuser).name;
    var commentbtn=document.getElementById(id);
    var textarea=commentbtn.parentElement.firstChild;
    if(textarea.value!=""){
    var comment={
            comment:commentuser+" : "+textarea.value
    }
    
    database.child("userdua").child(id).child("comments").push(comment);
    comment="";
textarea.value="";
    }
    }

// else{
//     database.child('userdua').child(id).update({likes:obj.likes+1})
// }











getdatafun()


database.child('userdua').on("child_added", function (snap) {
    var obj = snap.val()
    obj.key = snap.key;
    var maindiv=document.getElementById(obj.key).parentElement;
    
database.child("userdua").child(obj.key).child("comments").on("child_added", function(snap){
    
            var obj2=snap.val();
            obj2.key=snap.key;
            var maincommentrenderdiv=document.createElement("div");
            maincommentrenderdiv.setAttribute("class","maincommentdivstyling")

            var commentrenderdiv=document.createElement("div");
            commentrenderdiv.setAttribute("class", "alert alert-light customcommentalert")
            commentrenderdiv.setAttribute("role", "alert")
            var commentrenderheading=document.createElement("h5");
            var commentrenderheadingtext=document.createTextNode(obj2.comment);
            commentrenderheading.appendChild(commentrenderheadingtext);
            commentrenderdiv.appendChild(commentrenderheading);
            maincommentrenderdiv.appendChild(commentrenderdiv)
            maindiv.appendChild(maincommentrenderdiv)
        })
    })

