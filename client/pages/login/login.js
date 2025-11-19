document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login");
  const btn = form.querySelector('button[type="submit"]');

  const showMessage = (text, isError = true) => {
    let el = document.getElementById("login-msg");
    if (!el) {
      el = document.createElement("div");
      el.id = "login-msg";
      form.prepend(el);
    }
    el.textContent = text;
    el.style.color = isError ? "#ff7777" : "#9ef3b8";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showMessage("Please fill all the fields");
      return;
    }

    if (password.length < 6) {
      showMessage("Incorrect password!");
      return;
    }

    btn.disabled = true;
    const previousText = btn.textContent;
    btn.textContent = "Loading...";

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        showMessage(data.message || "Login successful!", false);

        setTimeout(() => {
          window.location.href = "/pages/my-profile/my-profile.html";
        }, 1200);
      } else {
        showMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.log(error);
      showMessage("Network error. Try again later!");
    } finally {
      btn.disabled = false;
      btn.textContent = previousText;
    }
  });
});
