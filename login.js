var sign_up = document.getElementById("signup");
sign_up.addEventListener("click", signup_display);

function signup_display() {
    window.open("./signup.html","_self");
    
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
        var b = false;

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
                        b = true;
                        open("./index.html");
                        close();
                    }else if((id0==id1) && (pw0!=pw1)) {
                        b = true;
                        alert("아이디와 비밀번호가 일치하지 않습니다.");
                    }
                });
            }).then(()=>{
                if(b==false) {
                    alert("아이디가 존재하지 않습니다.");
                }
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
                        b = true;
                        open("./index.html");
                        close();
                    }else if((id0==id1) && (pw0!=pw1)) {
                        b = true;
                        alert("아이디와 비밀번호가 일치하지 않습니다.");
                    }
                });
            }).then(()=>{
                if(b==false) {
                    alert("아이디가 존재하지 않습니다.","_self");
                }
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
                        b = true;
                        open("./managerPage.html");
                        close();
                    }else if((id0==id1) && (pw0!=pw1)) {
                        b = true;
                        alert("아이디와 비밀번호가 일치하지 않습니다.");
                    }
                });
            }).then(()=>{
                if(b==false) {
                    alert("아이디가 존재하지 않습니다.","_self");
                }
            });
    
        }
        

    }

}
