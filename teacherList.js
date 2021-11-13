//for firebase

let btn_div = document.getElementById("btn_div");
let chatting = document.getElementsByClassName("chat")
let mainDiv = document.getElementById("listDiv");

// for(let i = 0; i < chatting.length; i++) {
//     chatting[i].addEventListner("click", chat)
// }

//별점순 / 수강생 수
//검색 이름 / 분야 

 $( document ).ready(function() {
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
            
            storageRef.child('images/' + `${doc.data().name}` + '.jpg').getDownloadURL().then(function(url) {
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
        });
    });
 })

function do_chat() {
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
                });
            }
        })
    })
}