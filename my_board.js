let teacher_name = document.getElementById("teacher_name");
function init() {
    let name = localStorage.getItem("name");
    $(document).ready(function () {
        db.collection("board")
            .doc(name)
            .collection("register_board")
            .doc("data")
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log(doc.data().author);
                    console.log(`exists`);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    });
    teacher_name.innerHTML = localStorage.getItem("name");
}
init();
