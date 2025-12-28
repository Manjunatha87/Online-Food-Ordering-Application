function openSignup() {
    document.getElementById("signupPopup").style.display = "block";
}

function closeSignup() {
    document.getElementById("signupPopup").style.display = "none";
}

function newUser() {
    let email = document.getElementById("newEmailId").value;
    let password = document.getElementById("newpwd").value;

    if (email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.some(user => user.email === email);
    if (exists) {
        alert("User already registered");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    closeSignup();
}
