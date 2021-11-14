/*firebase*/
const firebaseConfig = {
    apiKey: "AIzaSyDiOMeXpGNgYBSphTJZN4cZLeJRCtV9Ae4",
    authDomain: "wnc-deachung.firebaseapp.com",
    projectId: "wnc-deachung",
    storageBucket: "wnc-deachung.appspot.com",
    messagingSenderId: "769266517788",
    appId: "1:769266517788:web:7f37d9571d2850627ddcd9",
    measurementId: "G-Y3NNN50WLQ",
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//storage
var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child('images');
/*firebase*/

let parentDiv = document.getElementById("teacherList");

db.collection("teachers").get().then((querySnapshot) =>{ //페이지에 선생님 목록 업데이트
    querySnapshot.forEach((doc) =>{
        //console.log(`${doc.id} => ${doc.data().career[1]}`); 정보 확인
        let item = document.createElement("div");
        let image = document.createElement("div");
        let info = document.createElement("div");
        let blacklist = document.createElement("div");

        item.className = "item";
        item.id = doc.data().name;
        image.className = "image";
        info.className = "info";
        blacklist.className = "blacklist";

        /*image div*/
        var fileName = doc.data().imgpath;
        var spaceRef = imagesRef.child(fileName);
        var path = spaceRef.fullPath;
        var img = document.createElement("img");
        img.id = fileName;
        //console.log(path); 이미지 경로 확인
        image.appendChild(img);


        storageRef.child(path).getDownloadURL().then(function(url) {
          
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
            };
            xhr.open('GET', url);
          
            // Or inserted into an <img> element:
            var img = document.getElementById(fileName);
            img.src = url;
          }).catch(function(error) {
            // Handle any errors
          });

          

        /*info div*/
        let name = document.createElement("p");
        let ul = document.createElement("ul");
        let field = document.createElement("li");
        let estimate = document.createElement("li");
        let career = document.createElement("li");
        let ol = document.createElement("ol");

        name.innerHTML = doc.data().name+" 선생님";
        field.innerHTML = "분야: "+doc.data().field;
        estimate.innerHTML = "별점: "+doc.data().estimate;
        career.innerHTML = "경력: ";
        
        for(let i=0; i<doc.data().career.length; i++){
            let li = document.createElement("li");
            li.innerHTML = doc.data().career[i];
            ol.appendChild(li);
        }

        career.appendChild(ol);
        
        ul.appendChild(field);
        ul.appendChild(estimate);
        ul.appendChild(career);

        info.appendChild(name);
        info.appendChild(ul);


        /*blacklist div*/
        let span = document.createElement("span");
        let btn = document.createElement("button");

        span.id = "report";
        btn.id = doc.data().name+"Btn";
        btn.className = "blacklistBtn";
        btn.addEventListener("click", function(){
            var btnId = `${doc.data().name}`;
            //var blackval = `${doc.data().blacklist}`;
            blacklistfunc(btnId);
        });
        

        span.innerHTML = "신고 접수 : "+doc.data().report+"   ";

        if(doc.data().report < 3){
            btn.disabled = true;
        }

        blacklist.appendChild(span);
        blacklist.appendChild(btn);

        /*모두 추가*/
        item.appendChild(image);
        item.appendChild(info);
        item.appendChild(blacklist);
        parentDiv.appendChild(item);


        if(doc.data().blacklist==true){
            document.getElementById(doc.data().name).style.backgroundColor = "rgb(175, 115, 115)";
            btn.innerHTML = "블랙리스트 해제";

        }else{
            document.getElementById(doc.data().name).style.backgroundColor = "rgb(243, 243, 243)";
            btn.innerHTML = "블랙리스트 등록";
        }
    });
});

//var docRef = db.doc("teachers/한석원"); 정보 가져올 대상


/*blacklist function*/
let blacklistBtn = document.getElementsByClassName("blacklistBtn");

for(let i=0; i<blacklistBtn.length; i++){
    document.getElementById("blacklist"+i)
            .addEventListener("click", blacklistAdd);
}

function blacklistfunc(name){
    db.doc("teachers/"+name).get().then(function(querySnapshot){
        for(let doc in querySnapshot.data()){
            if(`${doc}`== "blacklist" && `${querySnapshot.data()[doc]}`=="false"){
                blacklistAdd(name);
                break;
            }else if(`${doc}`== "blacklist" && `${querySnapshot.data()[doc]}`=="true"){
                blacklistDel(name);
                break;
            }
        }
    })
}
function blacklistAdd(name){
    db.doc("teachers/"+name).update({
        blacklist: true
    })
    alert("블랙리스트로 등록되었습니다.");
    document.getElementById(name).style.backgroundColor = "rgb(175, 115, 115)";
    document.getElementById(name+"Btn").innerHTML = "블랙리스트 해제";
}

function blacklistDel(name){
    db.doc("teachers/"+name).update({
        blacklist: false
    })
    alert("블랙리스트가 해제되었습니다.");
    document.getElementById(name).style.backgroundColor = "rgb(243, 243, 243)";
    document.getElementById(name+"Btn").innerHTML = "블랙리스트 등록";
}
/*blacklist function*/


/*goToMain function*/
let mainBtn = document.getElementById("goToMain");

mainBtn.addEventListener("click", gotoMain);

function gotoMain(){
    open("./index.html", "_self");
}
/*goToMain function*/


/*blacklistCheck function*/
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(){
    let searchVal = document.getElementById("searchInput").value;
    blacklistCheck(searchVal);
});

function blacklistCheck(searchVal){
    db.doc("teachers/"+searchVal).get().then(function(querySnapshot){
        for(let doc in querySnapshot.data()){
            if(`${doc}`== "blacklist" && `${querySnapshot.data()[doc]}`=="false"){
                alert("블랙리스트에 등록되지 않은 선생님입니다.");
                break;
            }else if(`${doc}`== "blacklist" && `${querySnapshot.data()[doc]}`=="true"){
                alert("블랙리스트에 등록되어있는 선생님입니다.")
                break;
            }
        }
    })
}
/*blacklistCheck function*/
