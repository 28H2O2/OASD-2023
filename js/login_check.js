function validateLoginForm() {
  var email = document.getElementById('email');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // If the email is invalid, show an alert and return false
  if (!email.value.match(emailPattern)) {
    alert("Invalid email address.");
    return false;
  }

  var password = document.getElementById('password');
  var passwordPattern = /^(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;

  // If the password is invalid, show an alert and return false
  if (!password.value.match(passwordPattern)) {
    alert("Your password must contain at least one number, one uppercase letter, and be between 8-16 characters.");
    return false;
  }

  return true;
}