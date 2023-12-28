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

function copyCode() {
  var codeElement = document.getElementById("code");
  var codeText = codeElement.innerText.trim();

  var tempInput = document.createElement("input");
  tempInput.value = codeText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  alert("提取码已复制: " + codeText);
}

document.querySelector('.dropdown-btn').addEventListener('click', function() {
    this.classList.toggle('active');
});