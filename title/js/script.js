function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

function toggleDialog() {
  var dialog = document.getElementById("dialog");
  if (dialog.style.display === "none" || dialog.style.display === "") {
    dialog.style.display = "block";
  } else {
    dialog.style.display = "none";
  }
}
