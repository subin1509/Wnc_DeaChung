//for firebase

let btn_div = document.getElementById("btn_div");
let chatting = document.getElementsByClassName("chat")
let mainDiv = document.getElementById("listDiv");
let memberdiv = document.getElementById("member");
let input_option = document.getElementById("my_option");
let input_search = document.getElementById("my_search");

input_option.addEventListener("change", do_list);
input_search.addEventListener("change", find_list);
let star_list = new Array();

//수강생 수
//로그인 정보에 맞게 버튼 활성화.

 $( document ).ready(function() {
    if(localStorage.getItem("id") == null) {
        let log_in_btn = document.createElement("button");
        log_in_btn.innerHTML = "로그인";
        log_in_btn.addEventListener("click", log_in);
        memberdiv.appendChild(log_in_btn);
    } else {
        let mem_id = document.createElement("span");
        console.log(localStorage.getItem("classfication"));
        if(localStorage.getItem("classfication") == "teacher") {
            mem_id.innerHTML = localStorage.getItem("name") + "선생님";
        } else if(localStorage.getItem("classfication") == "student") {
            mem_id.innerHTML = localStorage.getItem("name") + "학생";
        } else if(localStorage.getItem("classfication") == "manager") {
            mem_id.innerHTML = localStorage.getItem("name") + "매니저님";
        }
        memberdiv.appendChild(mem_id);
        //로그아웃 넣을까?
    }
    

    db.collection("teachers")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let makeDiv = document.createElement("div");
            makeDiv.className = "item";
            mainDiv.appendChild(makeDiv);
            let makeRealDiv_img = document.createElement("div");
            makeRealDiv_img.className = "realitem"
            makeDiv.appendChild(makeRealDiv_img);
            
            storageRef.child('images/' + `${doc.data().imgpath}`).getDownloadURL().then(function(url) {
                // `url` is the download URL for 'images/stars.jpg'
              
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                  var blob = xhr.response;
                };
                xhr.open('GET', url);
              
                // Or inserted into an <img> element:
                let makeImg = document.createElement("img");
                makeImg.src = url;
                makeImg.width = 100;
                makeImg.height = 100;
                makeRealDiv_img.appendChild(makeImg);
              }).catch(function(error) {
                    console.log(error);
              });
            let makeRealDiv_contents = document.createElement("div");
            makeRealDiv_contents.className = "realitem";
            makeDiv.appendChild(makeRealDiv_contents);
            let contents_name = document.createElement("p");
            contents_name.innerHTML = `${doc.id}` + " 선생님";
            makeRealDiv_contents.appendChild(contents_name);
            let contents_li1 = document.createElement("li");
            contents_li1.innerHTML = "분야: " + `${doc.data().field}`;
            makeRealDiv_contents.appendChild(contents_li1);
            let contests_li2 = document.createElement("li");
            contests_li2.innerHTML = "별점: " + `${doc.data().estimate}`;
            makeRealDiv_contents.appendChild(contests_li2);
            let contests_li3 = document.createElement("li");
            contests_li3.innerHTML = "경력";
            makeRealDiv_contents.appendChild(contests_li3);
            let contents_ol = document.createElement("ol");
            makeRealDiv_contents.appendChild(contents_ol);
            for(var i = 0; i < `${doc.data().career.length}`; i++) {
                let ol_in_li = document.createElement("li");
                ol_in_li.innerHTML = `${doc.data().career[i]}`;
                contents_ol.appendChild(ol_in_li);
            }
            
            let makeRealDiv_btn = document.createElement("div");
            makeRealDiv_btn.className = "realitem";
            makeRealDiv_btn.id = `${doc.data().name}`;
            makeDiv.appendChild(makeRealDiv_btn);
            let chatbtn = document.createElement("input");
            chatbtn.type = "button";
            chatbtn.setAttribute("class", "contents_btn chatting");
            chatbtn.value = "채팅하기";
            chatbtn.addEventListener("click", do_chat);
            makeRealDiv_btn.appendChild(chatbtn);
            let putstar = document.createElement("input");
            putstar.type = "button";
            putstar.setAttribute("class", "contents_btn putStar");
            putstar.value = "별점주기";
            putstar.addEventListener("click", function() {
                var getName = `${doc.data().name}`;
                do_put_star(getName);
            });
            makeRealDiv_btn.appendChild(putstar);
            let repotbtn = document.createElement("input");
            repotbtn.type = "button";
            repotbtn.setAttribute("class", "contents_btn report");
            repotbtn.value = "신고하기";
            repotbtn.addEventListener("click", function() {
                var getName = `${doc.data().name}`;
                do_repot(getName);
            });
            makeRealDiv_btn.appendChild(repotbtn);
            //신고버튼이 눌리면 그 사람 리포트 횟수가 DB에 올라감.
            var myobj = {
                my_div : makeDiv,
                starNum : Number(`${doc.data().estimate}`),
                t_name : `${doc.data().name}`,
                t_field : `${doc.data().field}`
            }
            star_list.push(myobj);
        });
    });
 })

function do_chat() {
    if(localStorage.getItem("id") == null) {
        alert("로그인 후 이용가능합니다.");
        return ;
    }
    
    alert("미구현");
}

function do_repot(who) {
    if(localStorage.getItem("id") == null) {
        alert("로그인 후 이용가능합니다.");
    }
    else {
        db.collection("teachers").
        get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(`${doc.data().name}` == who) {
                    // To update age and favorite color:
                    db.collection("teachers").doc(who).update({
                        "report" : Number(`${doc.data().report}`) + 1
                    })
                    .then(() => {
                        alert("신고되었습니다.");
                    });
                }
            })
        })
    }
    
}

function do_put_star(who) {
    if(localStorage.getItem('id') == null) {
        alert("로그인 후 이용가능합니다.");
        return ;
    }
    var tmp_name_div = document.getElementById(who);
    let input_star = document.createElement("input");
    input_star.type = "number";
    input_star.max = 5;
    input_star.min = 0;
    tmp_name_div.appendChild(input_star);
    let input_star_btn = document.createElement("button");
    input_star_btn.innerHTML = "별점입력";
    tmp_name_div.appendChild(input_star_btn);
    input_star_btn.addEventListener("click", function() {
        var star_data = input_star.value;
        doing_put_star(who, star_data);
    })
}

function doing_put_star(who, star_data) {
    var tmp_name_div = document.getElementById(who);
    tmp_name_div.removeChild(tmp_name_div.lastChild);
    tmp_name_div.removeChild(tmp_name_div.lastChild);
    //db에서 별점 준 사람의 카운트를 올리고 별점 계산해서 띄우기
    db.collection("teachers").
    get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(`${doc.data().name}` == who) {
                // To update age and favorite color:
                db.collection("teachers").doc(who).update({
                    "estimate_count" : Number(`${doc.data().estimate_count}`) + 1,
                    "estimate" : (Number(`${doc.data().estimate}`) * Number(`${doc.data().estimate_count}`) + Number(star_data)) / (Number(`${doc.data().estimate_count}`) + 1)
                })
                .then(() => {
                    alert("별점주기 완료.");
                    //page.reload
                });
            }
        })
    })
}

function log_in() {
    open("./login.html");
}

function do_list() {
    if(input_option.value == "star") {
        //mainDiv(id =listDiv)의 모든 자식노드 없앰.
        while(mainDiv.hasChildNodes()) {
            mainDiv.removeChild(mainDiv.firstChild);
        }
        star_list.sort(function(a, b) {
            return b.starNum - a.starNum;   //오름차순정렬
        })
        for(var k = 0; k < star_list.length; k++) {
            mainDiv.appendChild(star_list[k].my_div);
        }
    } else if(input_option.value == "numberOfStudent") {
        alert("수강생 많은 순으로 정렬");
    } else {
        return ;
    }
}

function find_list() {
    if(input_option.value == "name") {
        //이름 찾기
        if(input_search.value == "") {
            //검색어를 지우면 원래상태로 돌아옴.
            while(mainDiv.hasChildNodes()) {
                mainDiv.removeChild(mainDiv.firstChild);
            }
            for(var k = 0; k < star_list.length; k++) {
                mainDiv.appendChild(star_list[k].my_div);
            }
        }
        else {
            while(mainDiv.hasChildNodes()) {
                mainDiv.removeChild(mainDiv.firstChild);
            }
            for(var k = 0; k < star_list.length; k++) {
                if(star_list[k].t_name == input_search.value) {
                    mainDiv.appendChild(star_list[k].my_div);
                }
            }
        }
    } else if(input_option.value == "subject") {
        //분야 찾기
        if(input_search.value == "") {
            //검색어를 지우면 원래상태로 돌아옴.
            while(mainDiv.hasChildNodes()) {
                mainDiv.removeChild(mainDiv.firstChild);
            }
            for(var k = 0; k < star_list.length; k++) {
                mainDiv.appendChild(star_list[k].my_div);
            }
        }
        else {
            while(mainDiv.hasChildNodes()) {
                mainDiv.removeChild(mainDiv.firstChild);
            }
            for(var k = 0; k < star_list.length; k++) {
                if(star_list[k].t_field == input_search.value) {
                    mainDiv.appendChild(star_list[k].my_div);
                }
            }
        }
    } else {
        alert("이름, 분야 목록으로 검색을 할 수 있습니다.");
    }
}