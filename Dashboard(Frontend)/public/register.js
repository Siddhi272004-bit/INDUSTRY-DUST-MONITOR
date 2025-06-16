document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
  
    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (res.ok) {
        alert("🎉 Registration successful! You can now log in.");
        window.location.href = "http://localhost:3000/login.html";
      }
      else {
        const text = await res.text();
        alert("❌ Registration failed: " + text);
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Error registering");
    }
  });
  