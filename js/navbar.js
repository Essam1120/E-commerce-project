var navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    document.addEventListener("DOMContentLoaded", () => {
        const userArea = document.getElementById("user-area");
      
        // نجيب اليوزر من localStorage
        const username = localStorage.getItem("username");
      
        if (username) {
          // لو مسجّل دخول
          userArea.innerHTML = `
            <span class="me-2 fw-bold">👋 ${username}</span>
            <button id="logoutBtn" class="btn btn-outline-danger btn-sm">Logout</button>
          `;
      
          document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("username");
            window.location.reload(); // نعمل تحديث للصفحة
          });
      
        } else {
          // لو مش مسجّل دخول
          userArea.innerHTML = `
            <a href="sign.html" class="btn btn-outline-dark">Login</a>
          `;
        }
      });
});