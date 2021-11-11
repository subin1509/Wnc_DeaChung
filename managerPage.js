let searchBtn = document.getElementById("searchBtn");
let blacklistBtn = document.getElementById("blacklistBtn");
let searchSelect = document.getElementById("searchSelect");

searchSelect.addEventListener("change", changeSearch);

function changeSearch(){
    console.log(searchSelect.options[searchSelect.selectedIndex].text);
}
