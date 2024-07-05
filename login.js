const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link'); // Fixed class name

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active'); // Removed dot prefix
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Registration form submission event listener
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const terms = document.getElementById('terms').checked;

    if (!terms) {
        alert('You must agree to the terms and conditions.');
        return;
    }

    // Prepare the data to be sent in the request
    const data = {
        username: username,
        email: email,
        password: password
    };

    // Make the API call for registration
    fetch('http://localhost:5500/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registration response:', data); // Debug log
        if (data.id) { // assuming json-server adds an id to the created user
            alert('Registration successful! You can log in.');
            // Redirect to booking.html after 2 seconds (simulated delay)
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
});

// Login form submission event listener
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Prepare the data to be sent in the request
    const data = {
        email: email,
        password: password
    };

    // Make the API call for login
    fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response:', data); // Debug log
        if (data.id) { // assuming the server responds with an id for the logged-in user
            alert('Login successful! Redirecting...');
            // Redirect to booking.html after 2 seconds (simulated delay)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
});