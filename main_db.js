// db.collection("users")
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${doc.data()}`);
//         });
//     });
function format(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "." + month + "." + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}
// let userId = localStorage.getItem("id"); //id
// let userClassfication = localStorage.getItem("classfication"); //student, teacher, manager
// let userName = localStorage.getItem("name");
let tempDate = new Date();
let userDate = format(tempDate);
let docData = {
    // id: userId,
    // classfication: userClassfication,
    // title: userTitle,
    // author: userName,
    date: userDate,
};
db.collection("board")
    .doc("recruitment")
    .set(docData)
    .then(() => {
        console.log(`doc written`);
    });
