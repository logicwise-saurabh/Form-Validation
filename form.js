var editUserIndex = null;
var selectedRow = null
let editMode = false;

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
    const English = document.getElementById("lang-en").checked
    const hindi = document.getElementById("lang-hi").checked
    const gujarati = document.getElementById("lang-gu").checked
    const languagesKnownEnglish = document.getElementById("chk-en").checked
    const languagesKnownHindi = document.getElementById("chk-hi").checked
    const languagesKnownGujarati = document.getElementById("chk-gu").checked
    const languagesKnownMarathi = document.getElementById("chk-mr").checked

    if (fullName && emailId && contactNumber && schoolName
        && Age && userPassword && userConfrimPass && Cgpa !== "0" &&
        genderDropdown !== "Choosegender" && !isDuplicateEmail(editUserIndex) && (English || hindi || gujarati)
        && (languagesKnownEnglish || languagesKnownHindi || languagesKnownGujarati || languagesKnownMarathi)) {

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
    if (userName === "") {
        nameError.textContent = "Name is required"
        return false

    }
    if (!userNamepatern.test(userName)) {
        nameError.textContent = "Enter Valid Name";
        return false;
    } else {
        nameError.textContent = "";
        return true;
    }

}

function emailValidation() {
    const userEmail = document.getElementById("email-id").value.trim();
    const emailError = document.getElementById("email-error");
    userFormValidation()
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

    if (userEmail === "") {
        emailError.textContent = "Email is required"
        return false
    }
    if (!regexEmail.test(userEmail)) {
        emailError.textContent = "Enter valid email"
        return false;
    }
    if (isDuplicateEmail()) {
        emailError.textContent = "Email already exists"
        console.log("duplicate email")
        return false;
    }

    emailError.textContent = "";
    console.log("email true")
    return true;

}




function contactNumberValidation() {
    const contactNumber = document.getElementById("contact-number");
    const contactError = document.getElementById("contact-error");
    userFormValidation()
    const contactRegex = /^\d{10}$/
    if (contactNumber.value.trim() === "") {
        contactError.textContent = "Contact Number is required"
        return false
    }
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
    const schoolName = document.getElementById("school-name").value.trim();
    const schoolNameError = document.getElementById("school-error");
    userFormValidation()
    const schoolpatern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/
    if (schoolName === "") {
        schoolNameError.textContent = "School Name is required"
        return false

    }
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
    if (userAge.value.trim() === "") {
        ageError.textContent = "Age is required"
        // console.log("Age not selected")
        return false
    }
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

    if (userPassword === "") {
        passError.textContent = "Password is required"
        return false
    }
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
    if (confirmPass === "") {
        passNotMatch.textContent = "Confirm Password is required"
        return false
    }
    if (userPassword === confirmPass) {
        passNotMatch.textContent = "Password Matched"
        return true
    }
    else {
        passNotMatch.textContent = "Passward did not match"
        return false;
    }

}



function formResetOnLoad(event) {
    const userform = document.getElementById("reg-form");
    const confirmReset = confirm("The form is being reset. Continue?");

    if (confirmReset) {
        userform.reset();
        console.log("Form reset");
    } else {
        console.log("Form not reset");
        // Prevent page unload if user cancels
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
    }
}

function formReset() {
    const userform = document.getElementById("reg-form")
    let text = confirm("The form is being reset.");


    if (text == true) {
        text = "Form Cleared!";
        //document.getElementById("myForm").reset();
        userform.reset()
        // Reloads the current page
        // window.location.reload();


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


    const choosedGender = document.getElementById("user-gender");
    userFormValidation()
    const selectedValue = choosedGender.value;
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
    newRow.insertCell(7).innerText = user.primaryLanguage;
    newRow.insertCell(8).innerText = user.languagesKnown
    newRow.insertCell(9).innerHTML = `<a class="link" onClick="onEdit(this)">Edit</a>
                       <a class="link" onClick="onDelete(this)">Delete</a>`






}

function pageLoad() {


    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    storedData.forEach(users => addRow(users));
    // localStorage.clear()
}


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
    const primaryLanguage = getPrimaryLanguage();
    const languagesKnown = getLanguagesKnown();

    const newUser = {
        userName: fullName,
        email: emailId,
        gender: userGender,
        contactNum: contactNumber,
        school: schoolName,
        schoolCgpa: Cgpa,
        userAge: Age,
        primaryLanguage: primaryLanguage,
        languagesKnown: languagesKnown
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (editUserIndex === null) {

        users.push(newUser);
        console.log("User added");
    } else {

        users[editUserIndex] = newUser;

        console.log("User updated");
    }

    localStorage.setItem("users", JSON.stringify(users));
    console.log("User saved");
    console.log(newUser.userName)
    addCurrentRow()
    formChanged = false;
    editMode = false;




}

function addCurrentRow() {


    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    if (storedData.length > 0) {
        const lastIndex = storedData.length - 1;
        addRow(storedData[lastIndex]);
    }

}
function toSaveDefoultData() {
    let user1 = {

        userName: "XYZ",
        email: "abc@gmail.com",
        gender: "Male",
        contactNum: "9999999999",
        school: "Public School",
        schoolCgpa: "7",
        userAge: "32",
        primaryLanguage: "English",
        languagesKnown: ["Hindi", "Marathi"]


    }
    let user2 = {
        userName: "John Doe",
        email: "john.doe@gmail.com",
        gender: "Male",
        contactNum: "9876543210",
        school: "Green Valley High",
        schoolCgpa: "8.5",
        userAge: "28",
        primaryLanguage: "English",
        languagesKnown: ["Hindi", "Marathi"]

    }
    let user3 = {
        userName: "Jane Smith",
        email: "jane.smith@gmail.com",
        gender: "Female",
        contactNum: "9123456789",
        school: "Sunrise Public School",
        schoolCgpa: "9.1",
        userAge: "25",
        primaryLanguage: "English",
        languagesKnown: ["Hindi", "Marathi"]

    }


    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length < 3) {
        if (!Array.isArray(users)) {
            users = [];
        }
        users.push(user1);
        users.push(user2);
        users.push(user3);
        localStorage.setItem("users", JSON.stringify(users));
    }
    pageLoad()

}
let formChanged = false;

function setFormChanged() {
    formChanged = true;
}

// window.addEventListener("beforeunload", function (e) {
//     if (formChanged) {
//         e.preventDefault();
//         e.returnValue = '';
//     }
// });


window.addEventListener("beforeunload", function (e) {
    if (editMode && formChanged) {
        e.preventDefault();
        e.returnValue = '';
    }
});


function onEdit(td) {

    editMode = true;
    formChanged = false;
    const userform = document.getElementById("reg-form")
    userform.reset()

    const selectedRow = td.parentElement.parentElement;
    editUserIndex = selectedRow.rowIndex - 1;
    document.getElementById("user-name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("user-age").value = selectedRow.cells[1].innerHTML;
    document.getElementById("user-gender").value = selectedRow.cells[2].innerHTML;
    document.getElementById("contact-number").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email-id").value = selectedRow.cells[4].innerHTML;
    document.getElementById("school-name").value = selectedRow.cells[5].innerHTML;
    document.getElementById("High-school-cgpa").value = selectedRow.cells[6].innerHTML;

    const primaryLang = selectedRow.cells[7].innerText.trim();
    document.querySelectorAll('input[name="primaryLanguage"]').forEach(radio => {
        radio.checked = (radio.value === primaryLang);
    });


    const Value = selectedRow.cells[8].innerText;
    const seperatdValue = Value.split(",").map(v => v.trim());
    const checkboxes = document.querySelectorAll('input[name="languagesKnown"]');
    checkboxes.forEach(checkbox => {
        if (seperatdValue.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });


    document.getElementById("submit-btn").innerText = "Update";
    userFormValidation();


}
function onDelete(td) {
    const row = td.parentElement.parentElement;
    const rowIndex = row.rowIndex - 1;
    const confirmDelete = confirm('Are you sure to delete this record ?');
    if (confirmDelete) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(rowIndex, 1);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("user-table").deleteRow(row.rowIndex);
    }
    else {
        return;
    }
}



function isDuplicateEmail(editIndex) {
    // const emailError = document.getElementById("email-error");
    const inputEmail = document.getElementById("email-id").value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < users.length; i++) {


        if (editIndex !== null && i === editIndex) {
            continue;
        }

        if (users[i].email.toLowerCase() === inputEmail.toLowerCase()) {
            return true;


        }
    }

    return false;
}

function getPrimaryLanguage() {

    const radios = [
        document.getElementById("lang-en"),
        document.getElementById("lang-hi"),
        document.getElementById("lang-gu")
    ];

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }

    return "";
}
function getLanguagesKnown() {
    const languages = [];

    if (document.getElementById("chk-en").checked) languages.push("English");
    if (document.getElementById("chk-hi").checked) languages.push("Hindi");
    if (document.getElementById("chk-gu").checked) languages.push("Gujarati");
    if (document.getElementById("chk-mr").checked) languages.push("Marathi");

    return languages;
}

function validatePrimaryLanguage() {
    const radios = document.getElementsByName("primaryLanguage");
    const error = document.getElementById("primary-lang-error");
    userFormValidation()
    let isChecked = false;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        error.textContent = "Please select a primary language";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateLanguagesKnown() {
    const error = document.getElementById("languages-error");
    userFormValidation()
    if (
        document.getElementById("chk-en").checked ||
        document.getElementById("chk-hi").checked ||
        document.getElementById("chk-gu").checked ||
        document.getElementById("chk-mr").checked) {
        error.textContent = "";
        console.log("knownLang true")
        return true;
    }
    else {
        error.textContent = "Select at least one language";
        console.log("knownLang false")
        return false;
    }
}
function setPrimaryLanguage(value) {
    const radios = [
        document.getElementById("lang-en"),
        document.getElementById("lang-hi"),
        document.getElementById("lang-gu")
    ];

    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = (radios[i].value === value);
    }
}

function setLanguagesKnown(languages) {
    document.getElementById("chk-en").checked = languages.includes("English");
    document.getElementById("chk-hi").checked = languages.includes("Hindi");
    document.getElementById("chk-gu").checked = languages.includes("Gujarati");
    document.getElementById("chk-mr").checked = languages.includes("Marathi");
}

function validatePrimaryLanguage() {

    const English = document.getElementById("lang-en").checked
    const hindi = document.getElementById("lang-hi").checked
    const gujarati = document.getElementById("lang-gu").checked
    const primaryLangError = document.getElementById("primary-lang-error")
    userFormValidation()

    if (English || hindi || gujarati) {
        primaryLangError.innerHTML = "";
        console.log("primary lang true")
        return true
    }
    else {
        primaryLangError.innerHTML = "Please Select Your Primary Langauge"
        console.log("primary lang false")
        return false
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const userform = document.getElementById("reg-form");
    const inputs = userform.querySelectorAll("input");
    const checkboxes = document.querySelectorAll('input[name="languagesKnown"]');

    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            if (input.type === "checkbox") {
                input.checked = savedValue === "true";
            } else if (input.type === "radio") {
                input.checked = savedValue === "true";
            } else {
                input.value = savedValue;
            }
        }


        input.addEventListener("input", () => {
            localStorage.setItem(input.id, input.value);
        });

    });
    userform.addEventListener("submit", () => {
        inputs.forEach(input => localStorage.removeItem(input.id)

        )

    });


});


