import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }

  render() {
    return html`
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    </head>
    <form onsubmit="javascript: return false;" id="userForm" method="POST">

    <div class="form-group pt-3 ml-5" style="width: 20rem;">
      <label for="email">Email</label>
      <input class="form-control" id="uname" name="uname" type="text" value="${this.user.uname}" required>
      <input type="hidden" id="uid" name="uid" value="${this.user.uid}">
    </div>

    <div class="form-group pt-1 ml-5" style="width: 20rem;">
      <label for="firstName">First Name</label>
      <input class="form-control" id="firstName" name="firstName" type="text" value="${this.user.firstName}" required>
    </div>

    <div class="form-group pt-1 ml-5" style="width: 20rem;">
      <label for="lastName">Last Name</label>
      <input class="form-control" id="lastName" name="lastName" type="text" value="${this.user.lastName}" required>
    </div>

    <div class="form-group pt-1 ml-5" style="width: 20rem;">
      <label for="oldpwd">Old Password</label>
      <input type="password" class="form-control" id="oldpwd" name="oldpwd" type="text" value="">
    </div>

    <div class="form-group pt-1 ml-5" style="width: 20rem;">
      <label for="newpassword">New Password</label>
      <input type="password" class="form-control" id="pwd" name="pwd" type="text" value="">
    </div>

    <input type="submit" @click=${this.updateUser} id="submitForm" name="editUser" class="btn btn-info mt-4 ml-2" value="Edit User"></input>
  
    </form>
    `;
  }

  // Updates the user information
  updateUser(e) {
    const dataForm = new FormData(e.target.form); // Gets the data from the form
    console.log(e)
    fetch('api/updateUser.php', {                 // Fetches the user from the database
     method: 'POST',                              // Posts/updates the user with the information from the form
     body: dataForm
    }).then(res=>res.json())
      .then(data=>{
        if (data.status=='success') {
            console.log("The user was updated");
        } else {
            console.log("Error - the user was not updated");
        }
      })
  }

}
customElements.define('edit-user', EditUser);
