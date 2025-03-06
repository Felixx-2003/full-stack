// Ensure userData is globally defined at the top of script.js
let userData = JSON.parse(localStorage.getItem('userData')) || {};

function checkLoyalty(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const fullNumber = `+60${phoneNumber}`;

    console.log("Page 1 - Input phoneNumber:", phoneNumber, "Full number:", fullNumber);
    
    if (phoneNumber.match(/^[0-9]*$/) && fullNumber === "+60173527250") {
        userData.phoneNumber = fullNumber;
        localStorage.setItem('userData', JSON.stringify(userData)); // Save to localStorage
        console.log("Page 1 - userData after setting:", userData);
        window.location.href = 'page2.html';
    } else {
        alert("Invalid mobile number. Please enter +60173527250.");
    }
}

function submitRegistration(event) {
    event.preventDefault();

    // Log form values before validation
    const name = document.getElementById('name').value.trim();
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const email = document.getElementById('email').value.trim();
    const noEmail = document.getElementById('noEmail').checked;

    console.log("Page 2 - Form values:", { name, day, month, year, email, noEmail });

    let isValid = true;

    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    if (!day || !month || !year) {
        document.getElementById('birthdayError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('birthdayError').style.display = 'none';
    }

    if (!noEmail && !email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    if (isValid) {
        userData.name = name;
        userData.birthday = `${day}/${month}/${year}`;
        userData.email = noEmail ? "No email address" : email;
        localStorage.setItem('userData', JSON.stringify(userData)); // Save to localStorage
        console.log("Page 2 - userData before navigation:", userData);
        window.location.href = 'page3.html';
    } else {
        console.log("Page 2 - Validation failed, userData remains:", userData);
    }
}

function displaySummary() {
    const summaryDiv = document.getElementById('summaryData');
    // Load userData from localStorage in case it wasn't passed
    userData = JSON.parse(localStorage.getItem('userData')) || {};
    console.log("Page 3 - userData:", userData);

    // Check if at least name, birthday, and email are present (phoneNumber is optional)
    if (userData.name && userData.birthday && userData.email) {
        let html = '';
        if (userData.phoneNumber) {
            html += `<p><strong>Phone Number:</strong> ${userData.phoneNumber}</p>`;
        }
        html += `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Birthday:</strong> ${userData.birthday}</p>
        `;
        summaryDiv.innerHTML = html;
    } else {
        summaryDiv.innerHTML = '<p>No data available.</p>';
    }
}

// Run on Page 3 load
if (window.location.pathname.includes('page3.html')) {
    console.log("Page 3 loaded, calling displaySummary");
    displaySummary();
}