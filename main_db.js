$(document).ready(function () {
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
                $title = $(
                    `<td id="${
                        doc.id
                    }" class="join_title" style="color : blue">${
                        doc.data().title
                    }</td>`
                );
                $($title).on("click", click_join_title);
                $count = doc.data().count;
                $recruitment = $(
                    `<td>${$count}/${doc.data().recruitment_number}</td>`
                );
                $author = $(`<td>${doc.data().author}</td>`);
                $date = $(`<td>${doc.data().date}</td>`);
                $term = $(`<td>${doc.data().term}</td>`);

                $($tr).append($num);
                $($tr).append($title);
                $($tr).append($recruitment);
                $($tr).append($author);
                $($tr).append($date);
                $($tr).append($term);

                console.log(doc.id, " => ", doc.data());
            });
        });
});
function click_join_title() {
    let child = open("./join.html", "_self");
    sessionStorage.setItem("timestamp", this.id);
    console.log(this.id);
}
