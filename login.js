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