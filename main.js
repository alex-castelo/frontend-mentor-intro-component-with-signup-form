/* eslint-disable no-alert */
const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

const setError = (element, message) => {
  const inputElement = element.parentElement.parentElement;
  const errorMessage = inputElement.querySelector(".error-message");
  const errorIcon = inputElement.querySelector(".icon");

  errorMessage.innerText = message;
  inputElement.classList.add("input-error");
  errorMessage.classList.add("error");
  errorIcon.style.display = "block";
};

const setSuccess = (element) => {
  const inputElement = element.parentElement.parentElement;
  const errorMessage = inputElement.querySelector(".error-message");
  const errorIcon = inputElement.querySelector(".icon");

  errorMessage.innerText = "";
  inputElement.classList.remove("input-error");
  errorMessage.classList.remove("error");
  errorIcon.style.display = "none";
};

const validateEmail = (emailToValidate) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailToValidate).toLowerCase());
};

const validateInputs = () => {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const errors = new Set([]);

  if (firstNameValue === "") {
    setError(firstName, "First name cannot be empty");
    errors.add("first-name");
  } else {
    errors.delete("first-name");
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    setError(lastName, "Last name cannot be empty");
    errors.add("last-name");
  } else {
    setSuccess(lastName);
    errors.delete("last-name");
  }

  if (emailValue === "") {
    setError(email, "Email cannot be empty");
    errors.add("email");
  } else if (!validateEmail(emailValue)) {
    setError(email, "Looks like this is not an email");
    errors.add("email");
  } else {
    setSuccess(email);
    errors.delete("email");
  }

  if (passwordValue === "") {
    errors.add("password");
    setError(password, "Password cannot be empty");
  } else {
    errors.clear("password");
    setSuccess(password);
  }

  return errors.size === 0;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValidForm = validateInputs();

  return isValidForm
    ? alert("You have submited your form without errors 🎉🎉🎉🎉")
    : alert("There seem to be some erroneous fields 😞😞😞");
});
