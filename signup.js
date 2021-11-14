var cancel = document.getElementById("cancel");
cancel.addEventListener("click", cancel_display);

let check_id = false;

function cancel_display() {
    open("./login.html","_self");
}


document.getElementById("signup1").addEventListener("click", signup); 
//회원가입 정보 입력

function signup() {
    var kk = false;
    
    var name1 = document.getElementById("name").value;
    var id1 = document.getElementById("id1").value;
    var pw1 = document.getElementById("pw1").value;

    var length = document.getElementsByName("classfication").length;
    for(var i=0; i<length; i++) {
        if(document.getElementsByName("classfication")[i].checked == true) {
            var classfication1 = document.getElementsByName("classfication")[i].value;
        }
    }

    //아이디 중복검사

    if(classfication1=="student"){
        db.collection("students")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(`${doc.data().id}` == id1) {
                    alert("존재하는 아이디 입니다.");
                    kk = true;
                }
            })
        })
        .then(() => {
            if(kk) {

            } else {
                db.collection("students").doc(id1)
                .set({
                    name: name1,
                    id: id1,
                    pw: pw1,
                    classfication: classfication1,
                })
                .then(() => {
                    console.log("Document written with ID: ");
                    open("./login.html","_self");
                });
            }
        })
    }else if(classfication1=="manager") {
        db.collection("managers")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(`${doc.data().id}` == id1) {
                    alert("존재하는 아이디 입니다.");
                    kk = true;
                }
            })
        })
        .then(() => {
            if(kk) {

            } else {
                db.collection("managers").doc(id1)
                .set({
                    name: name1,
                    id: id1,
                    pw: pw1,
                    classfication: classfication1,
                })
                .then(() => {
                    console.log("Document written with ID: ");
                    open("./login.html","_self");
                });
            }
        })
    }else if(classfication1=="teacher") {

        db.collection("teachers")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(`${doc.data().id}` == id1) {
                    alert("존재하는 아이디 입니다.");
                    kk = true;
                }
            })
        })
        .then(() => {
            if(kk) {

            } else {
                var file = document.querySelector('#img').files[0];
                var storageRef = storage.ref();
                var path = storageRef.child(`images/${file.name}`);
                var Upload = path.put(file);
                console.log(file.name);

                var subject1 = document.getElementById("subject").value;
                var school1 = document.getElementById("school").value;
                var award1 = document.getElementById("award").value;
                var career1 = document.getElementById("career").value;
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
                    open("./login.html","_self");
                });
            }
        })




        var file = document.querySelector('#img').files[0];
        var storageRef = storage.ref();
        var path = storageRef.child(`images/${file.name}`);
        var Upload = path.put(file);
        console.log(file.name);

        var subject1 = document.getElementById("subject").value;
        var school1 = document.getElementById("school").value;
        var award1 = document.get
    }
    
}

document.getElementsByName("classfication")[1].addEventListener("click", inputteacher);
document.getElementsByName("classfication")[0].addEventListener("click", disableteacher);
document.getElementsByName("classfication")[2].addEventListener("click", disableteacher);

function inputteacher() {
    document.getElementById("img").disabled=false;
    document.getElementById("subject").disabled=false;
    document.getElementById("school").disabled=false;
    document.getElementById("award").disabled=false;
    document.getElementById("career").disabled=false;
}

function disableteacher() {
    document.getElementById("img").disabled=true;
    document.getElementById("subject").disabled=true;
    document.getElementById("school").disabled=true;
    document.getElementById("award").disabled=true;
    document.getElementById("career").disabled=true;
}
