 function newUser(){
    let emailId = document.getElementById("newEmailId").value
    let passcode = document.getElementById("newpwd").value

    
    let usersEmail = []
    let userPassword=[]
    usersEmail.push(emailId)
    userPassword.push(passcode)
 }

 function validate() {
    let user1 = { emailId: "admin@gmail.com", password: "admin@123" }
    let user2 = { emailId: "Manju@gmail.com", password: "Manju@123" }
    let user3 = { emailId: "Ravi@gmail.com", password: "Ravi@123" }

    let users = [user1, user2, user3];

    let emailId = document.getElementById("emailID").value;
    let passcode = document.getElementById("pwd").value;

    let validUser = users.find(
        user => user.emailId == emailId && user.password == passcode
    );

    if (validUser) {
        alert("Login successful");
        sessionStorage.setItem("user", emailId);
        return true;
    } else {
        alert("Login failed, try again");
        return false;
    }
}
