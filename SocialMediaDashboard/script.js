document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
  
    // Validate form input
    if (!username || !email) {
      alert('Please enter your username and email.');
      return;
    }
  
    // Store the username and email in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  
    // Simulate successful authentication
    // In a real application, this would be replaced with server-side authentication
    var authenticated = true;
  
    if (authenticated) {
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid username or email.');
    }
});
