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

 $( document ).ready(function() {
    if(localStorage.getItem("id") == null) {
        let log_in_btn = document.createElement("button");
        log_in_btn.innerHTML = "로그인";
        log_in_btn.addEventListener("click", log_in);
        memberdiv.appendChild(log_in_btn);
    } else {
        let mem_id = document.createElement("span");
        if(localStorage.getItem("classfication") == "teacher") {
            mem_id.innerHTML = localStorage.getItem("name") + "선생님";
        } else if(localStorage.getItem("classfication") == "student") {
            mem_id.innerHTML = localStorage.getItem("name") + "학생";
        } else if(localStorage.getItem("classfication") == "manager") {
            mem_id.innerHTML = localStorage.getItem("name") + "매니저님";
        }
        memberdiv.appendChild(mem_id);
    }
    
    db.collection("teachers")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let len = 0;
            db.collection("teachers").doc(doc.data().id).collection("teaching").get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    len++;
                })
            }).then(() => {
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
                contents_name.innerHTML = `${doc.data().name}` + " 선생님";
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
                makeRealDiv_btn.id = `${doc.data().id}`;
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
                    var getId = `${doc.data().id}`;
                    do_put_star(getId);
                });
                makeRealDiv_btn.appendChild(putstar);
                let repotbtn = document.createElement("input");
                repotbtn.type = "button";
                repotbtn.setAttribute("class", "contents_btn report");
                repotbtn.value = "신고하기";
                repotbtn.addEventListener("click", function() {
                    var getId = `${doc.data().id}`;
                    do_repot(getId);
                });
                makeRealDiv_btn.appendChild(repotbtn);

                //신고버튼이 눌리면 그 사람 리포트 횟수가 DB에 올라감.
                var myobj = {
                    my_div : makeDiv,
                    starNum : Number(`${doc.data().estimate}`),
                    t_name : `${doc.data().name}`,
                    t_field : `${doc.data().field}`,
                    std_count : len
                }
                star_list.push(myobj);
            });
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
        var teacher_report;
        db.collection("teachers")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(`${doc.data().id}` == who) {
                    teacher_report = `${doc.data().report}`;
                }
            })
        })
        db.collection("teachers")
        .doc(who)
        .collection("teaching") 
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if((`${doc.data().name}` == localStorage.getItem("name")) && (`${doc.data().report_check}` == "false")) {
                    //수강하는 학생이고 report_check가 false이면
                    db.collection("teachers").doc(who).update({
                        "report" : Number(teacher_report) + 1
                    })
                    db.collection("teachers")
                    .doc(who)
                    .collection("teaching")
                    .doc(localStorage.getItem("id")).update({
                        "report_check" : true
                    })
                    .then(() => {
                        alert("신고되었습니다.");
                    });
                } else if(`${doc.data().report_check}` == "true") {
                    alert("이미 신고하셨습니다.");
                } else {
                    alert("수강하는 학생만 신고가 가능합니다.");
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
    var isOK = false
    db.collection("teachers")
    .doc(who)
    .collection("teaching")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(`${doc.data().name}` == localStorage.getItem("name")) {
                isOK = true;
            }
        })
    }).then(() => {
        if(isOK) {
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
        } else {
            alert("수강하는 학생만 별점입력이 가능합니다.");
            return;
        }
    })
}

function doing_put_star(who, star_data) {
    var tmp_name_div = document.getElementById(who);
    tmp_name_div.removeChild(tmp_name_div.lastChild);
    tmp_name_div.removeChild(tmp_name_div.lastChild);
    //db에서 별점 준 사람의 카운트를 올리고 별점 계산해서 띄우기
    var teacher_estimate;
    var teacher_estimate_cnt;

    db.collection("teachers")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(`${doc.data().id}` == who) {
                teacher_estimate = `${doc.data().estimate}`;
                teacher_estimate_cnt = `${doc.data().estimate_count}`;
            }
        })
    })

    db.collection("teachers")
        .doc(who)
        .collection("teaching") 
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if((`${doc.data().name}` == localStorage.getItem("name")) && (`${doc.data().star_check}` == "false")) {
                    //수강하는 학생이고 report_check가 false이면
                    db.collection("teachers").doc(who).update({
                        "estimate_count" : Number(teacher_estimate_cnt) + 1,
                        "estimate" : (Number(teacher_estimate) * Number(teacher_estimate_cnt) + Number(star_data)) / (Number(teacher_estimate_cnt) + 1),
                    })
                    
                    db.collection("teachers")
                    .doc(who)
                    .collection("teaching")
                    .doc(localStorage.getItem("id")).update({
                        "star_check" : true
                    })
                    .then(() => {
                        alert("별점이 입력되었습니다.");
                    });
                } else if(`${doc.data().star_check}` == "true") {
                    alert("이미 별점을 주셨습니다..");
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
        //mainDiv(id =listDiv)의 모든 자식노드 없앰.
        while(mainDiv.hasChildNodes()) {
            mainDiv.removeChild(mainDiv.firstChild);
        }
        star_list.sort(function(a, b) {
            return b.std_count - a.std_count;   //오름차순정렬
        })
        for(var k = 0; k < star_list.length; k++) {
            mainDiv.appendChild(star_list[k].my_div);
        }
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