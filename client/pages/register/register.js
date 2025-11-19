document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register");
  const btn = form.querySelector('button[type="submit"]');

  const showMessage = (text, isError = true) => {
    let el = document.getElementById("register-msg");
    if (!el) {
      el = document.createElement("div");
      el.id = "register-msg";
      form.prepend(el);
    }
    el.textContent = text;
    el.style.color = isError ? "#ff7777" : "#9ef3b8";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!userName || !email || !password || !confirmPassword) {
      showMessage("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match");
      return;
    }

    btn.disabled = true;
    const previousText = btn.textContent;
    btn.textContent = "Registering...";

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        showMessage(data.message || "Registration successful!", false);

        setTimeout(() => {
          window.location.href = "/pages/login/login.html";
        }, 1200);
      } else {
        showMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      console.log(err);
      showMessage("Network error. Try again later!");
    } finally {
      btn.disabled = false;
      btn.textContent = previousText;
    }
  });
});
