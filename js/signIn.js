function switchTab(tab) {
    const loginForm = document.getElementById("form-login");
    const registerForm = document.getElementById("form-register");

    document.getElementById("tab-login").classList.remove("active");
    document.getElementById("tab-register").classList.remove("active");

    if (tab === "login") {
      loginForm.classList.remove("d-none");
      registerForm.classList.add("d-none");
      document.getElementById("tab-login").classList.add("active");
    } else {
      loginForm.classList.add("d-none");
      registerForm.classList.remove("d-none");
      document.getElementById("tab-register").classList.add("active");
    }
  }

  // ✅ إظهار/إخفاء الباسورد
  function togglePwd(id, btn) {
    const input = document.getElementById(id);
    const icon = btn.querySelector("i");
    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("bi-eye-slash", "bi-eye");
    }
  }

  // ✅ سنة تلقائية
  document.getElementById("year").textContent = new Date().getFullYear();

  // ✅ Placeholder functions للـ Login/Register
  function handleLogin(e) {
    e.preventDefault();
    window.location.href = "index.html";
  }

  function handleRegister(e) {
    e.preventDefault();
    window.location.href = "sign.html";
  }

  // ✅ تأثير 3D Tilt على الكارت
  VanillaTilt.init(document.querySelector(".tilt"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });

  function validateLoginForm() {
    let valid = true;
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");

    // reset errors
    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    // Email check
    if (email.value.trim() === "" || !email.value.includes("@")) {
      showError(email, "Please enter a valid email");
      valid = false;
    }

    // Password check
    if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  }

  function validateRegisterForm() {
    let valid = true;
    const name = document.getElementById("reg-name");
    const email = document.getElementById("reg-email");
    const password = document.getElementById("reg-password");

    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    if (name.value.trim().length < 3) {
      showError(name, "Full name must be at least 3 characters");
      valid = false;
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
      showError(email, "Enter a valid email address");
      valid = false;
    }

    if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  }

  function showError(input, message) {
    input.classList.add("is-invalid");
  
    const msg = document.createElement("div");
    msg.className = "invalid-feedback d-block"; // d-block يخليها تنزل سطر
    msg.innerText = message;
  
    // نحط الرسالة بعد الـ input نفسه
    input.insertAdjacentElement("afterend", msg);
  }

  // update handlers
  function handleLogin(e) {
    e.preventDefault();
    if (validateLoginForm()) {
      window.location.href = "index.html";
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    if (validateRegisterForm()) {
      window.location.href = "sign.html";
    }
  }