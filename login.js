

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

//로그인
document.getElementById("login").addEventListener("click", login);
var loginOk = 0;

function login() {
    
    var id0 = document.getElementById("id").value;
    var pw0 = document.getElementById("password").value;

    var length = document.getElementsByName("member").length;
    for(var i=0; i<length; i++) {
        if(document.getElementsByName("member")[i].checked == true) {
            var classfication = document.getElementsByName("member")[i].value;
        }
    }

    if(id0==""||pw0==""||classfication==undefined) {

        alert("빈칸을 입력해주세요.");
    
    }else {
        
        if(classfication=="student") {
            console.log(classfication);
            db.collection("students").get().then((querySnapshot) =>{ 
                querySnapshot.forEach((doc) =>{
                    var name = `${doc.data().name}`;
                    var id1 = `${doc.data().id}`;
                    var pw1 = `${doc.data().pw}`;
                    console.log(id1+" "+pw1);
                    if((id0==id1) && (pw0==pw1)) {
                        localStorage.setItem("id", id1);
                        localStorage.setItem("classfication", classfication);
                        localStorage.setItem("name", name);
                        open("./index.html");
                        close();
                    }
                });
            });
    
        }else if(classfication=="teacher") {
            db.collection("teachers").get().then((querySnapshot) =>{ 
                querySnapshot.forEach((doc) =>{
                    var name = `${doc.data().name}`;
                    var id1 = `${doc.data().id}`;
                    var pw1 = `${doc.data().pw}`;
                    if((id0==id1) && (pw0==pw1)) {
                        localStorage.setItem("id", id1);
                        localStorage.setItem("classfication", classfication);
                        localStorage.setItem("name", name);
                        open("./index.html");
                        close();
                    }
                });
            });
            
        }else if(classfication=="manager") {
            db.collection("managers").get().then((querySnapshot) =>{ 
                querySnapshot.forEach((doc) =>{
                    var name = `${doc.data().name}`;
                    var id1 = `${doc.data().id}`;
                    var pw1 = `${doc.data().pw}`;
                    if((id0==id1) && (pw0==pw1)) {
                        localStorage.setItem("id", id1);
                        localStorage.setItem("classfication", classfication);
                        localStorage.setItem("name", name);
                        open("./index.html");
                        close();
                    }
                });
            });
    
        }
        

    }

}



//var storageRef = firebase.storage().ref();
//var storage = firebase.storage();

document.getElementById("signup1").addEventListener("click", signup); 
//회원가입 정보 입력

// imagesRef now points to 'images'

function signup() {
    
    var name1 = document.getElementById("name").value;
    var id1 = document.getElementById("id1").value;
    var pw1 = document.getElementById("pw1").value;

    var length = document.getElementsByName("classfication").length;
    for(var i=0; i<length; i++) {
        if(document.getElementsByName("classfication")[i].checked == true) {
            var classfication1 = document.getElementsByName("classfication")[i].value;
        }
    }

    //

    if(classfication1=="student"){
        db.collection("students").doc(id1)
            .set({
                name: name1,
                id: id1,
                pw: pw1,
                classfication: classfication1,
            })
            .then(() => {
                console.log("Document written with ID: ");
            });
    }else if(classfication1=="manager") {
        db.collection("managers").doc(id1)
            .set({
                name: name1,
                id: id1,
                pw: pw1,
                classfication: classfication1,
            })
            .then(() => {
                console.log("Document written with ID: ");
            });
    }else if(classfication1=="teacher") {

        var file = document.querySelector('#img').files[0];
        var storageRef = storage.ref();
        var path = storageRef.child(`images/${file.name}`);
        var Upload = path.put(file);
        console.log(file.name);

        var subject1 = document.getElementById("subject").value;
        var school1 = document.getElementById("school").value;
        var award1 = document.getElementById("award").value;
        var career1 = document.getElementById("career").value;
        //var img1 = document.getElementById("img");
        db.collection("teachers").doc(id1)
            .set({
                name: name1,
                id: id1,
                pw: pw1,
                classfication: classfication1,
                field: subject1,
                career: [school1,award1,career1],
                imgpath: file.name,
                blacklist: false,
                report: 0,
                estimate: 0,
                estimate_count: 0,
            })
            .then(() => {
                console.log("Document written with ID: ");
            });
    }
    
}

/*document.getElementsByName("classfication")[1].addEventListener("click", inputteacher);
document.getElementsByName("classfication")[0].addEventListener("click", disableteacher);
document.getElementsByName("classfication")[2].addEventListener("click", disableteacher);

function inputteacher() {
    var l = document.getElementsByClassName("teacher").length;
    var inputs = document.getElementsByClassName("teacher")
    for(var i=0; i<l; i++) {
        inputs[i].ariaReadOnly=false;
    }
}

function disableteacher() {
    alert("x");
}*/