document.getElementById("login_btn").addEventListener("click", click);
document
    .getElementById("teacherList")
    .addEventListener("click", click_teacherList);
function init() {
    let classfication = localStorage.getItem("classfication");
    let id = localStorage.getItem("id");
    let name = localStorage.getItem("name");

    if (classfication == "student") {
    } else if (classfication == "teacher") {
        document.getElementById("my_board").style.display = "inline-block";
        document.getElementById("register_board").style.display =
            "inline-block";
    } else {
    }
}
function click_teacherList() {
    open("./teacherList.html");
}

function click() {
    open("./login.html");
}
init();
