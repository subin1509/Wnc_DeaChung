//아이디 -->세션

var sign_up = document.getElementById("signup");
sign_up.addEventListener("click", signup_display);

var cancel = document.getElementById("cancel");
cancel.addEventListener("click", cancel_display);

document.getElementById("signup_box").style.display="none";
function signup_display() {
    document.getElementById("signup_box").style.display="block";
    document.getElementById("login_box").style.display="none";
}

function cancel_display() {
    document.getElementById("signup_box").style.display="none";
    document.getElementById("login_box").style.display="block";
}


document.getElementById("login").addEventListener("click", login);

function login() {
    var id = document.getElementById("id").value;

    var length = document.getElementsByName("member").length;

    for(var i=0; i<length; i++) {
        if(document.getElementsByName("member")[i].checked == true) {
            var classfication = document.getElementsByName("member")[i].value;
        }
    }

    localStorage.setItem("id", id);
    localStorage.setItem("classfication", classfication);
}

document.getElementById("signup1").addEventListener("click", signup); 


function signup() {
    var name = document.getElementById("name").value;
    localStorage.setItem("name", name);
}