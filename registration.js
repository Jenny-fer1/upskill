document.getElementById("continueBtn").addEventListener("click", function() {
  const choice = document.querySelector('input[name="choice"]:checked').value;

  if (choice === "create") {
    window.location.href = "createAccount.html"; 
  } else {
    window.location.href = "userProfile.html"; 
  }
});
