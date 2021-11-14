$(document).ready(function () {
    if (localStorage.getItem("classfication") == "teacher") {
        let teacher_id = localStorage.getItem("id");

        db.collection("board")
            .doc(teacher_id)
            .collection("register_board")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    db.collection("board")
                        .doc()
                        .collection("boards")
                        .doc(doc.id)
                        .onSnapshot((snapshot) => {
                            snapshot.docChanges().forEach((change) => {
                                if (change.type === "added") {
                                    console.log(
                                        "New city: ",
                                        change.doc.data()
                                    );
                                }
                                if (change.type === "modified") {
                                    console.log(
                                        "Modified city: ",
                                        change.doc.data()
                                    );
                                }
                                if (change.type === "removed") {
                                    console.log(
                                        "Removed city: ",
                                        change.doc.data()
                                    );
                                }
                            });
                        });

                    // .onSnapshot((dd) => {
                    //     // dd.docChanges().forEach((change) => {
                    //     //     if (change.type === "added") {
                    //     //         console.log("New city: ", change.doc.data());
                    //     //     }
                    //     //     if (change.type === "modified") {
                    //     //         console.log(
                    //     //             "Modified city: ",
                    //     //             change.doc.data()
                    //     //         );
                    //     //     }
                    //     //     if (change.type === "removed") {
                    //     //         console.log(
                    //     //             "Removed city: ",
                    //     //             change.doc.data()
                    //     //         );
                    //     //     }
                    //     // });
                    //     // console.log(dd.data());
                    // });
                });
            });
        // .onSnapshot((doc) => {
        //     console.log("Current data: ", doc.data());
        // });
    }

    console.log(`main`);
    let tables = [];
    let len = 0;
    db.collection("board")
        .doc("main")
        .collection("boards")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                len++;
                // console.log(doc.id, " => ", doc.data());
            });
        });
    let idx = 1;
    db.collection("board")
        .doc("main")
        .collection("boards")
        .get()
        .then((querySnapshot) => {
            console.log(len);
            querySnapshot.forEach((doc) => {
                $tr = $(`<tr class="tr"></tr>`);
                $("tbody").append($tr);

                $num = $(`<td>${idx++}</td>`);
                $author = $(`<td>${doc.data().author}</td>`);

                $title = $(
                    `<td id="${doc.id}" class="${
                        doc.data().id
                    }" style="color : blue">${doc.data().title}</td>`
                );
                $($title).on("click", click_join_title);
                $count = doc.data().count;
                $recruitment = $(
                    `<td>${$count}/${doc.data().recruitment_number}</td>`
                );

                $date = $(`<td>${doc.data().date}</td>`);
                $term = $(`<td>${doc.data().term}</td>`);

                $($tr).append($num);
                $($tr).append($title);
                $($tr).append($recruitment);
                $($tr).append($author);
                $($tr).append($date);
                $($tr).append($term);
                // console.log(doc);
                // console.log(doc.id, " => ", doc.data());
            });
        });
});
function click_join_title() {
    let child = open("./join.html");
    localStorage.setItem("teacher_id", this.className);
    localStorage.setItem("timestamp", this.id);
    console.log(this.id);
}
