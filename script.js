document.getElementById("edit-button").addEventListener("click", function() {
    document.querySelector(".popup").style.display = "flex";
});

document.querySelector(".close-button").addEventListener("click", function() {
    document.querySelector(".popup").style.display = "none";
});