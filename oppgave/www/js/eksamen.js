// Fetches all users in the DB and creates a list of them.
function getAllUsers() {
    fetch(`api/fetchUsers.php`, {
    }).then(res=>res.json())
    .then(data=>{  
        var userContainer = document.getElementById("users"); 

        data.forEach(x=> {
            
        // Creates a new element and appends it to the userContainer element
         var newUserElement = document.createElement('div');
        newUserElement.setAttribute("id", x.uid)
        newUserElement.innerText = x.uname + "\n" + x.firstName + " " + x.lastName + "\n";
        userContainer.appendChild(newUserElement);
            
        // Makes the div/newUserElement clickable
        newUserElement.onclick = function() {getUser(newUserElement.id)};
        });
    });
}

// Fetches all info about a spesific user
// using the userID when you click a user.
function getUser(e){
    var user = document.getElementById("user");
    user.style.display = "block";
    fetch("api/fetchUser.php?id=" + e.toString(), {
  
    }).then(res=>res.json())
    .then(data=>{

        // Transfers the info about the user into the HTML form. 
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("uid").value = e;
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("uname").value = data.uname;

    });
}

// Calls getAllUsers to update list if a user is edited
// using the 'Edit User' button.
document.getElementById("submitForm").addEventListener('click', e=>{
    const dataForm = new FormData(e.target.form);
    fetch('api/updateUser.php', {
     method: 'POST',
     body: dataForm
    }).then(res=>res.json())
      .then(data=>{
        if (data.status=='success') {
            console.log("The user was updated");
            getAllUsers();
        } else {
            console.log("The user was not updated");
        }
      })
  })