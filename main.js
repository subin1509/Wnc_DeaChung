document.getElementById("login_btn").addEventListener("click", click);
document
    .getElementById("teacherList")
    .addEventListener("click", click_teacherList);
function click_teacherList() {
    open("./teacherList.html");
}

function click() {
    open("./login.html");
}
