const form = document.querySelector("#signUpForm");
const inputs = form.querySelectorAll("input"); // NodeList
const submitBtn = form.querySelector(".sign-up-btn");

// Safety check
if (form && inputs && submitBtn) {
  /* Validate on typing - Comeback 
  after the functions */
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      updateSubmitState();
    });
  });

  /* Validate as well when we submit 
  - Comeback after the functions */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formIsValid = true;

    inputs.forEach((input) => {
      if (!validateInput(input)) formIsValid = false;
    });

    if (formIsValid) {
      form.submit();
    }
  });

  function validateInput(input) {
    const wrapper = input.closest(".input-wrapper");
    const icon = wrapper.querySelector(".status-icon");
    const message = wrapper.querySelector(".message");
    const value = input.value.trim();
    let isValid = true;

    // We need to reset our UI
    input.classList.remove("valid", "invalid");
    icon.style.display = "none";
    message.textContent = "";
    message.style.display = "none";

    /* Validation */
    if (value === "") {
      // Empty input check
      setError("This field is required.");
    } else if (input.name === "lastName" || input.name === "firstName") {
      // Name validation
      if (value.length < 2) {
        setError("Name must be at least 2 characters long.");
      } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(value)) {
        setError("Name must only contain letters.");
      } else {
        setSuccess("Looks good!");
      }
    } else if (input.type === "email") {
      // Email validation
      const isValueValid = input.validity.valid;

      if (!isValueValid) {
        setError("Please enter a valid email address.");
      } else {
        setSuccess("Looks good!");
      }
    } else if (input.type === "password") {
      const passWordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (value.length < 0) {
        setError("Password must be at least 8 characters.");
      } else if (!passWordRegex.test(value)) {
        setError("Include upper, lower, number & symbol.");
      } else {
        setSuccess("Strong password!");
      }
    } else {
      setSuccess("Looks good!");
    }

    // Error and Success Handlers
    function setError(msg) {
      isValid = false;
      input.classList.add("invalid");
      icon.style.display = "block";
      icon.innerHTML = `
        <img
            src="./images/icon-error.svg"
            alt="icon-error"
            width="24"
            height="24"
        />

        <figcaption class="offscreen">icon-error</figcaption>
      `;
      message.style.display = "block";
      message.textContent = msg;
      message.classList.add("error-message");
      message.classList.remove("success-message");
    }

    function setSuccess(msg) {
      isValid = true;
      input.classList.add("valid");
      icon.style.display = "block";
      icon.innerHTML = `
        <img
            src="./images/icon-success.svg"
            alt="icon-success"
            width="24"
            height="24"
        />

        <figcaption class="offscreen">icon-success</figcaption>
      `;
      message.style.display = "block";
      message.textContent = msg;
      message.classList.remove("error-message");
      message.classList.add("success-message");
    }

    return isValid;
  }

  function updateSubmitState() {
    const allValid = Array.from(inputs).every((input) => validateInput(input));
    submitBtn.disabled = !allValid;
  }
}
