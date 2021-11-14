let p = document.getElementById("pp");

function init() {
    let timestamp = sessionStorage.getItem("timestamp");
    let name = localStorage.getItem("name");
    console.log(timestamp);
    p.innerHTML = timestamp;
    $(document).ready(function () {
        db.collection("board")
            .doc(name)
            .collection("register_board")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id == timestamp) {
                        console.log(`matched : ${timestamp}`);

                        $tr = $(`<tr class="tr"></tr>`);
                        $("tbody").append($tr);

                        $title = $(
                            `<td id="${
                                doc.id
                            }" class="join_title" style="color : blue">${
                                doc.data().title
                            }</td>`
                        );
                        // $($title).on("click", click_join_title);
                        $recruitment = $(
                            `<td>${doc.data().recruitment_number}</td>`
                        );
                        $author = $(`<td>${doc.data().author}</td>`);
                        $date = $(`<td>${doc.data().date}</td>`);
                        $term = $(`<td>${doc.data().term}</td>`);
                        // $text = $(`<td>${doc.data().text}</td>`);
                        $($tr).append($title);
                        $($tr).append($recruitment);
                        $($tr).append($author);
                        $($tr).append($date);
                        $($tr).append($term);
                        let text = document.getElementById("text");
                        text.innerHTML = `${doc.data().text}`;
                        // $($tr).append($text);
                    }
                });
            });
    });
}
init();
