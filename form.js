


function userFormValidation() {
    const submitButton = document.getElementById("submit-btn")

    const fullName = document.getElementById("user-name").value.trim();
    const emailId = document.getElementById("email-id").value.trim();
    const contactNumber = document.getElementById("contact-number").value.trim();
    const schoolName = document.getElementById("school-name").value.trim();
    const Cgpa = document.getElementById('High-school-cgpa').value.trim();
    const Age = document.getElementById("user-age").value.trim();
    const userPassword = document.getElementById("user-password").value.trim();
    const userConfrimPass = document.getElementById("user-confirm-password").value.trim();
    const genderDropdown = document.getElementById("user-gender").value.trim();

    if (fullName && emailId && contactNumber && schoolName
        && Age && userPassword && userConfrimPass && Cgpa && genderDropdown) {

        submitButton.disabled = false;
        return true;

    }
    else {
        submitButton.disabled = true;
    }


};

function validateUserName() {
    const userName = document.getElementById("user-name").value.trim();
    const nameError = document.getElementById("name-error");
    const userNamepatern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/
    userFormValidation()
    if (!userNamepatern.test(userName)) {
        nameError.textContent = "Name is required";
        return false;
    } else {
        nameError.textContent = "";
        return true;
    }

}

//for email
function emailValidation() {
    const userEmail = document.getElementById("email-id");
    const emailError = document.getElementById("email-error");
    userFormValidation()

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(userEmail.value)) {
        emailError.textContent = "Enter valid email"
        return false;
    }
    else {
        emailError.textContent = "";
        return true;
    }

}


//for mobile

function contactNumberValidation() {
    const contactNumber = document.getElementById("contact-number");
    const contactError = document.getElementById("contact-error");
    userFormValidation()
    const contactRegex = /^\d{10}$/

    if (!contactRegex.test(contactNumber.value)) {
        contactError.textContent = "Enter valid Mobile Number"
        return false;
    }
    else {
        contactError.textContent = ""
        return true;
    }


}



function schoolNamevalidation() {
    const schoolName = document.getElementById("school-name");
    const schoolNameError = document.getElementById("school-error");
    userFormValidation()
    const schoolpatern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/
    if (!schoolpatern.test(schoolName.value)) {
        schoolNameError.textContent = "Enter Valid School Name"
        return false;
    }
    else {
        schoolNameError.textContent = ""
        return true;
    }
}


function cgpaShowing() {
    const rangeInput = document.getElementById('High-school-cgpa');
    const rangeValue = document.getElementById('rangeCgpaValue');
    userFormValidation()

    rangeValue.textContent = rangeInput.value;
    if ((rangeInput.value) === "0") {
        document.getElementById("cgpa-error").textContent = "Choose CGPA(1-10)"
        console.log("cgpa-error")
        return false;
    }
    else {
        document.getElementById("cgpa-error").textContent = ""
        console.log("cgpa-true")
        return true;
    }



};




function ageValidation() {
    const userAge = document.getElementById("user-age");
    const ageError = document.getElementById("age-error");
    userFormValidation()

    const numberPattern = /^(1[0-1][0-9]|120|[1-9][0-9]?)$/
    if (!numberPattern.test(userAge.value)) {
        ageError.textContent = "Enter valid age"
        return false;
    }
    else {
        ageError.textContent = "";
        return true;
    }

}

function passValidation() {
    const userPassword = document.getElementById("user-password").value.trim();
    const passError = document.getElementById("pass-error")
    userFormValidation()

    const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
    if (!passregex.test(userPassword)) {
        passError.textContent = `At least one uppercase letter (A-Z).
                At least one lowercase letter (a-z).
                At least one numerical digit (0-9).
                At least one special character (e.g., ! @ # $ % & * - _ + = ^).`
        return false;
    }
    else {
        passError.textContent = ""
        return true;
    }

}

function confirmPassValidation() {
    const userPassword = document.getElementById("user-password").value;
    const confirmPass = document.getElementById("user-confirm-password").value;
    const passNotMatch = document.getElementById("pass-not-match")
    userFormValidation()

    if (userPassword === confirmPass) {
        passNotMatch.textContent = "Password Matched"
        return true
    }
    else {
        passNotMatch.textContent = "Passward did not match"
        return false;
    }

}

function formReset() {
    const userform = document.getElementById("reg-form")
    let text = confirm("The form is being reset.");


    if (text == true) {
        text = "Form Cleared!";
        //document.getElementById("myForm").reset();
        userform.reset()

        console.log("form reset")

    } else {
        text = "";


        console.log("not reset")
    }
}


function checkBox() {
    const checkBoxinput = document.getElementById("agree");
    const agreeCheck = document.getElementById("agreecheck");

    if (checkBoxinput.checked) {
        agreeCheck.textContent = "I agree to";
        return true
    } else {
        agreeCheck.textContent = "Mark check box";
        return false
    }
}





function dropDown() {

    // Get the dropdown element
    const choosedGender = document.getElementById("user-gender");
    userFormValidation()

    // Get the selected value
    const selectedValue = choosedGender.value;

    // Validate selection
    if (selectedValue === "Choosegender") {
        document.getElementById("gender-error").textContent = "Please select a Gender.";
        console.log("hello")
        return false;

    } else {
        document.getElementById("gender-error").textContent = "You selected: " + selectedValue;
        return true;
    }

}


function addRow(user) {
    const table = document.getElementById("user-table");
    const newRow = table.insertRow(-1);
    newRow.insertCell(0).innerText = user.userName;
    newRow.insertCell(1).innerText = user.userAge;
    newRow.insertCell(2).innerText = user.gender;
    newRow.insertCell(3).innerText = user.contactNum;
    newRow.insertCell(4).innerText = user.email;
    newRow.insertCell(5).innerText = user.school;
    newRow.insertCell(6).innerText = user.schoolCgpa;
    // newRow.insertCell(7).innerText =



}

function pageLoad() {

    // formReset()
    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    storedData.forEach(users => addRow(users));
    // localStorage.clear()
}

// function add3row(data) {
//     const tableBody = document.getElementById("user-table")
//     tableBody.innerHTML = ""
//     data.forEach(item => {
//         const row = document.createElement("tr");
//         row.innerHTML = `<td>${String(item.name)}</td><td>${String(item.age)}</td>
//         <td>${String(item.age)}</td><td>${String(item.age)}</td><td>${String(item.age)}</td>
//         <td>${String(item.age)}</td><td>${String(item.age)}</td>`;
//         tableBody.appendChild(row);
//     })


// }


function addRow3() {


    const tableBody = document.getElementById("user-table").querySelector("tbody");
    const newRow = document.createElement("tr");

    // Create 3 cells dynamically
    tableBody.rows[1].

    tableBody.appendChild(newRow);

}



// function toaddFirst3Data() {
//     const storedData = JSON.parse(localStorage.getItem("users")) || [];
//     const first3data = storedData.slice(0, 3)
//     console.log(first3data);
//     first3data.forEach(users => add3row(users))

//     // first3data.forEach(users => add3row(users))
//     // storedData.forEach(users => addRow(users));

// }


function addToTable() {
    const form = document.getElementById("reg-form")
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    })
    const table = document.getElementById("user-table");
    const fullName = document.getElementById("user-name").value.trim();
    const emailId = document.getElementById("email-id").value.trim();
    const userGender = document.getElementById("user-gender").value;
    const contactNumber = document.getElementById("contact-number").value.trim();
    const schoolName = document.getElementById("school-name").value.trim();
    const Cgpa = document.getElementById('High-school-cgpa').value.trim();
    const Age = document.getElementById("user-age").value.trim();
    // const userPassword = document.getElementById("user-password").value.trim();
    // const userConfrimPass = document.getElementById("user-confirm-password").value.trim();


    // let storedData = JSON.parse(localStorage.getItem("users"))
    // console.log(storedData)
    // addRow()
    // const table = document.getElementById("user-table");
    // const newRow = table.insertRow(-1);
    // newRow.insertCell(0).innerText = storedData.userName;
    // newRow.insertCell(1).innerText = storedData.userAge;;
    // newRow.insertCell(2).innerText = storedData.gender;
    // newRow.insertCell(3).innerText = storedData.contactNum;
    // newRow.insertCell(4).innerText = storedData.email;
    // newRow.insertCell(5).innerText = storedData.school;
    // newRow.insertCell(6).innerText = storedData.schoolCgpa;

    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);


    // console.log(storedData.userName)

    cell1.innerHTML = fullName;
    cell2.innerHTML = Age;
    cell3.innerHTML = userGender;
    cell4.innerHTML = contactNumber;
    cell5.innerHTML = emailId;
    cell6.innerHTML = schoolName;
    cell7.innerHTML = Cgpa;

}



function toSaveLocalStorage() {
    // const table = document.getElementById("user-table");
    const fullName = document.getElementById("user-name").value.trim();
    const emailId = document.getElementById("email-id").value.trim();
    const userGender = document.getElementById("user-gender").value;
    const contactNumber = document.getElementById("contact-number").value.trim();
    const schoolName = document.getElementById("school-name").value.trim();
    const Cgpa = document.getElementById('High-school-cgpa').value.trim();
    const Age = document.getElementById("user-age").value.trim();

    const newUser = {
        userName: fullName,
        email: emailId,
        gender: userGender,
        contactNum: contactNumber,
        school: schoolName,
        schoolCgpa: Cgpa,
        userAge: Age
    }


    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (!Array.isArray(users)) {
        users = [];
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User saved");
    console.log(newUser.userName)


}
function toSaveDefoultData() {
    let user1 = {

        userName: "XYZ",
        email: "abc@gmail.com",
        gender: "Male",
        contactNum: "9999999999",
        school: "Public School",
        schoolCgpa: "7",
        userAge: "32"
    }
    let user2 = {
        userName: "John Doe",
        email: "john.doe@gmail.com",
        gender: "Male",
        contactNum: "9876543210",
        school: "Green Valley High",
        schoolCgpa: "8.5",
        userAge: "28"
    }
    let user3 = {
        userName: "Jane Smith",
        email: "jane.smith@gmail.com",
        gender: "Female",
        contactNum: "9123456789",
        school: "Sunrise Public School",
        schoolCgpa: "9.1",
        userAge: "25"
    }


    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (!Array.isArray(users)) {
        users = [];
    }
    users.push(user1);
    users.push(user2);
    users.push(user3);
    localStorage.setItem("users", JSON.stringify(users));
}



function getData() {
    return JSON.parse(localStorage.getItem("users")) || [];

}

// Save data to LocalStorage
function saveData(data) {
    localStorage.setItem("users", JSON.stringify(data));
}



function editUser(index) {
    const user = getData()[index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("editIndex").value = index;
    document.getElementById("formTitle").innerText = "Edit User";
}




