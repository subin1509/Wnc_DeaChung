document.getElementById("login_btn").addEventListener("click", click);
document
    .getElementById("teacherList")
    .addEventListener("click", click_teacherList);
let update = document.getElementById("update");
let logout_btn = document.getElementById("logout_btn");
let register = document.getElementById("register_board");
let my_board = document.getElementById("my_board");
let search = document.getElementById("category_search");
function click_register() {
    open("./register_board.html");
}
function click_my_board() {
    open("./my_board.html");
}
function click_logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("classfication");
    localStorage.removeItem("timestamp");
    localStorage.removeItem("teacher_id");

    document.getElementById("users").innerHTML = "";
    document.getElementById("users").style.color = "blue";
    document.getElementById("users").style.display = "none";

    document.getElementById("register_board").style.display = "none";
    document.getElementById("my_board").style.display = "none";

    document.getElementById("login_btn").style.display = "inline-block";
    document.getElementById("update").style.display = "none";
    document.getElementById("logout_btn").style.display = "none";
}
function click_update() {
    open("./update.html");
}
function init() {
    let classfication = localStorage.getItem("classfication");
    let id = localStorage.getItem("id");
    let name = localStorage.getItem("name");
    console.log(id);
    if (id != null) {
        console.log(id);
        document.getElementById("users").innerHTML = name;
        document.getElementById("users").style.color = "blue";

        document.getElementById("login_btn").style.display = "none";
        document.getElementById("update").style.display = "inline-block";
        document.getElementById("logout_btn").style.display = "inline-block";

        if (classfication == "student") {
            document.getElementById("users").innerHTML += " 학생";
        } else if (classfication == "teacher") {
            document.getElementById("users").innerHTML += " 선생님";

            document.getElementById("my_board").style.display = "inline-block";
            document.getElementById("register_board").style.display =
                "inline-block";
        } else {
        }
    }
}
function click_teacherList() {
    open("./teacherList.html");
}

function click() {
    open("./login.html");
}
init();
logout_btn.addEventListener("click", click_logout);
update.addEventListener("click", click_update);
my_board.addEventListener("click", click_my_board);
register.addEventListener("click", click_register);
