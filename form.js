var editUserIndex = null;
var selectedRow = null;
let editMode = false;
let previousIndex = null;
/**
 *  userFormValidation()
 *used  logical opertor (&&,||)
 *used comparsion opertor(!==,==)
 *used contional if else
 *used assignment opertor(=)
 *used regular funation
 *
 *  pageonLoad()
 * used ! not equal opertor
 * used if else condtion
 * used  regular function
 *
 *   pageonLoad2()
 * used comprasion opertor (>=)
 * used logical opertor (||)
 * used if condtion
 *
 *  validateUserName()
 *  used Regular Expression to validate user Full name
 * used if  else condtion
 * used not opertor !
 *
 *  emailValidation()
 * used regular Exprssion to validate email Id
 * used if else condtion
 * used compairsion opertor (===)
 * used booleon opertor
 *
 *  contactNumberValidation()
 * used regular expression to validdate number
 * used ! logical opertor
 * used trim() method to trim value of string
 *  
 *  schoolNamevalidation()
 * used trim method ,regular expression, booleon,const varibale
 * and test method to validate pattern of regular expression
 *
 *    cgpaShowing()
 * used compersion opetor(===),if else,boolean
 * used regualr function
 *
 
 *  onEdit()
 * array method split,map,push,foreach,includes
 *
 *  onDelete()
 * array splice
 * used findIndex method
 * 
 *  addRow()
 * table method insert Cell .insertrow,
 *
 *  toSaveLocalStorage()
 * used object
 * used local Storage and their method (getItem,setItem,removeItem)
 * used json prase and json stringyfy
 * used array and method(push)
 * 
 * formRestOnLoad()
 * event
 * objectt
 * confrim
 * rest from and relod method
 *
 *
 *
 */
function pageonLoad() {
  if (!localStorage.getItem("hasRun")) {
    toSaveDefoultData();
    console.log("Defoult Data Saved");
    localStorage.setItem("hasRun", "true");
  }
}

function pageonLoad2() {
  let runCount = parseInt(localStorage.getItem("runCount") || "0");

  if (runCount >= 1) {
    pageLoad();
    console.log("Hii2");
  }

  localStorage.setItem("runCount", runCount + 1);
}
/**
 *used  logical opertor (&&,||)
 *used comparsion opertor(!==,==)
 *used contional if else
  *used assignment opertor(=)
 *used regular funation
  

  */
function userFormValidation() {
  const submitButton = document.getElementById("submit-btn");
  const fullName = document.getElementById("user-name").value.trim();
  const emailId = document.getElementById("email-id").value.trim();
  const contactNumber = document.getElementById("contact-number").value.trim();
  const schoolName = document.getElementById("school-name").value.trim();
  const Cgpa = document.getElementById("High-school-cgpa").value.trim();
  const Age = document.getElementById("user-age").value.trim();
  const userPassword = document.getElementById("user-password").value.trim();
  const userConfrimPass = document
    .getElementById("user-confirm-password")
    .value.trim();
  const genderDropdown = document.getElementById("user-gender").value.trim();
  const English = document.getElementById("lang-en").checked;
  const hindi = document.getElementById("lang-hi").checked;
  const gujarati = document.getElementById("lang-gu").checked;
  const languagesKnownEnglish = document.getElementById("chk-en").checked;
  const languagesKnownHindi = document.getElementById("chk-hi").checked;
  const languagesKnownGujarati = document.getElementById("chk-gu").checked;
  const languagesKnownMarathi = document.getElementById("chk-mr").checked;

  if (
    fullName &&
    emailId &&
    contactNumber &&
    schoolName &&
    Age &&
    userPassword &&
    userConfrimPass &&
    Cgpa !== "0" &&
    genderDropdown !== "Choosegender" &&
    !isDuplicateEmail(editUserIndex) &&
    (English || hindi || gujarati) &&
    (languagesKnownEnglish ||
      languagesKnownHindi ||
      languagesKnownGujarati ||
      languagesKnownMarathi) &&
    userPassword === userConfrimPass
  ) {
    submitButton.disabled = false;
    return true;
  } else {
    submitButton.disabled = true;
  }
}

/**
 *
 */
function validateUserName() {
  const userName = document.getElementById("user-name").value.trim();
  const nameError = document.getElementById("name-error");
  const userNamepatern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
  userFormValidation();
  if (userName === "") {
    nameError.textContent = "Name is required";
    return false;
  } else if (!userNamepatern.test(userName)) {
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
  userFormValidation();
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

  if (userEmail === "") {
    emailError.textContent = "Email is required";
    return false;
  }
  if (!regexEmail.test(userEmail)) {
    emailError.textContent = "Enter valid email";
    return false;
  }
  // if (editMode === true) {
  // }

  if (isDuplicateEmail(editUserIndex)) {
    emailError.textContent = "Email already exists";
    console.log("duplicate email");
    return false;
  }

  emailError.textContent = "";
  console.log("email true");
  return true;
}

function contactNumberValidation() {
  const contactNumber = document.getElementById("contact-number");
  const contactError = document.getElementById("contact-error");
  userFormValidation();
  const contactRegex = /^\d{10}$/;
  if (contactNumber.value.trim() === "") {
    contactError.textContent = "Contact Number is required";
    return false;
  }
  if (!contactRegex.test(contactNumber.value)) {
    contactError.textContent = "Enter valid Mobile Number";
    return false;
  } else {
    contactError.textContent = "";
    return true;
  }
}

function schoolNamevalidation() {
  const schoolName = document.getElementById("school-name").value.trim();
  const schoolNameError = document.getElementById("school-error");
  userFormValidation();
  const schoolpatern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
  if (schoolName === "") {
    schoolNameError.textContent = "School Name is required";
    return false;
  } else if (!schoolpatern.test(schoolName)) {
    schoolNameError.textContent = "Enter Valid School Name";
    return false;
  } else {
    schoolNameError.textContent = "";
    return true;
  }
}

function cgpaShowing() {
  const rangeInput = document.getElementById("High-school-cgpa");
  const rangeValue = document.getElementById("rangeCgpaValue");
  userFormValidation();

  rangeValue.textContent = rangeInput.value;
  if (rangeInput.value === "0") {
    document.getElementById("cgpa-error").textContent = "Choose CGPA(1-10)";
    console.log("cgpa-error");
    return false;
  } else {
    document.getElementById("cgpa-error").textContent = "";
    console.log("cgpa-true");
    return true;
  }
}

function ageValidation() {
  const userAge = document.getElementById("user-age");
  const ageError = document.getElementById("age-error");
  userFormValidation();

  const numberPattern = /^(1[0-1][0-9]|120|[1-9][0-9]?)$/;
  if (userAge.value.trim() === "") {
    ageError.textContent = "Age is required";
    // console.log("Age not selected")
    return false;
  }
  if (!numberPattern.test(userAge.value)) {
    ageError.textContent = "Enter valid age";
    return false;
  } else {
    ageError.textContent = "";
    return true;
  }
}

function passValidation() {
  const userPassword = document.getElementById("user-password").value.trim();
  const passError = document.getElementById("pass-error");
  userFormValidation();

  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  if (userPassword === "") {
    passError.textContent = "Password is required";
    return false;
  }
  if (!passregex.test(userPassword)) {
    passError.textContent = `At least one uppercase letter (A-Z).
                At least one lowercase letter (a-z).
                At least one numerical digit (0-9).
                At least one special character (e.g., ! @ # $ % & * - _ + = ^).`;
    return false;
  } else {
    passError.textContent = "";
    return true;
  }
}

function confirmPassValidation() {
  const userPassword = document.getElementById("user-password").value;
  const confirmPass = document.getElementById("user-confirm-password").value;
  const passNotMatch = document.getElementById("pass-not-match");
  userFormValidation();
  if (confirmPass === "") {
    passNotMatch.textContent = "Confirm Password is required";
    return false;
  }
  if (userPassword === confirmPass) {
    passNotMatch.textContent = "Password Matched";
    return true;
  } else {
    passNotMatch.textContent = "Passward did not match";
    return false;
  }
}
/**
 *
 *
 */
function formResetOnLoad(event) {
  const userform = document.getElementById("reg-form");
  const confirmReset = confirm("The form is being reset. Continue?");

  if (confirmReset) {
    userform.reset();
    console.log("Form reset");
  } else {
    console.log("Form not reset");
    event.preventDefault();
    event.returnValue = "";
  }
}

function formReset() {
  const userform = document.getElementById("reg-form");

  text = "Form Cleared!";
  userform.reset();
  editMode = false;
  window.location.reload();
  console.log("form reset");
}

function checkBox() {
  const checkBoxinput = document.getElementById("agree");
  const agreeCheck = document.getElementById("agreecheck");

  if (checkBoxinput.checked) {
    agreeCheck.textContent = "I agree to";
    return true;
  } else {
    agreeCheck.textContent = "Mark check box";
    return false;
  }
}

function dropDown() {
  const choosedGender = document.getElementById("user-gender");
  userFormValidation();
  const selectedValue = choosedGender.value;
  if (selectedValue === "Choosegender") {
    document.getElementById("gender-error").textContent =
      "Please select a Gender.";
    console.log("hello");
    return false;
  } else {
    document.getElementById("gender-error").textContent =
      "You selected: " + selectedValue;
    return true;
  }
}
/**
 *  addRow()
 * table method insert Cell .insertrow,
 *
 *  toSaveLocalStorage
 *   used object
 *  used local Storage and their method (getItem,setItem,removeItem)
 * used json prase and json stringyfy
 * used array and method(push)
 *
 */
function addRow(user) {
  const table = document.getElementById("user-table");
  let tbody = table.querySelector("tbody");
  if (!tbody) {
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
  }

  const newRow = tbody.insertRow(-1);
  newRow.insertCell(0).innerText = user.userName;
  newRow.insertCell(1).innerText = user.userAge;
  newRow.insertCell(2).innerText = user.gender;
  newRow.insertCell(3).innerText = user.contactNum;
  newRow.insertCell(4).innerText = user.email;
  newRow.insertCell(5).innerText = user.school;
  newRow.insertCell(6).innerText = user.schoolCgpa;
  newRow.insertCell(7).innerText = user.userPassword;
  newRow.insertCell(8).innerText = user.primaryLanguage;
  newRow.insertCell(9).innerText = Array.isArray(user.languagesKnown)
    ? user.languagesKnown.join(", ")
    : user.languagesKnown;
  newRow.insertCell(
    10
  ).innerHTML = `<a class="link" onClick="onEdit(this)">Edit</a>
                       <a class="link" onClick="onDelete(this)">Delete</a>`;
}
// let users = JSON.parse(localStorage.getItem("users")) || [];

// function loadTable(data) {
//   const tbody = document
//     .getElementById("user-table")
//     .getElementsByTagName("tbody")[0];

//   // clear rows safely
//   tbody.innerHTML = "";

//   // add new rows
//   data.forEach((user) => addRow(user));
// }

// // show all users initially
// loadTable(users);

// document.getElementById("cgpaFilter").addEventListener("change", function () {
//   const value = this.value;

//   if (value === "all") {
//     // show all rows
//     loadTable(users);
//     console.log("cgpa filter");
//   } else {
//     // filter by CGPA
//     const filteredUsers = users.filter(
//       (user) => Number(user.schoolCgpa) >= Number(value)
//     );

//     addRow(filteredUsers);
//   }
// });

function toSaveLocalStorage() {
  // const table = document.getElementById("user-table");
  const fullName = document.getElementById("user-name").value.trim();
  const emailId = document.getElementById("email-id").value.trim();
  const userGender = document.getElementById("user-gender").value;
  const contactNumber = document.getElementById("contact-number").value.trim();
  const schoolName = document.getElementById("school-name").value.trim();
  const Cgpa = document.getElementById("High-school-cgpa").value.trim();
  const Age = document.getElementById("user-age").value.trim();
  const password = document.getElementById("user-password").value.trim();
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
    userPassword: password,
    primaryLanguage: primaryLanguage,
    languagesKnown: languagesKnown,
  };

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
  console.log(newUser.userName);
  addCurrentRow();
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
  let user1 = [
    {
      userName: "XYZ",
      email: "abc@gmail.com",
      gender: "male",
      contactNum: "9999999999",
      school: "Public School",
      schoolCgpa: "7",
      userAge: "32",
      userPassword: "Abcs@1234",
      primaryLanguage: "English",
      languagesKnown: ["Hindi", "Marathi"],
    },
    {
      userName: "John Doe",
      email: "john.doe@gmail.com",
      gender: "male",
      contactNum: "9876543210",
      school: "Green Valley High",
      schoolCgpa: "8.5",
      userAge: "28",
      userPassword: "Abcs@1234",
      primaryLanguage: "English",
      languagesKnown: ["Hindi", "Marathi"],
    },
    {
      userName: "Jane Smith",
      email: "jane.smith@gmail.com",
      gender: "female",
      contactNum: "9123456789",
      school: "Sunrise Public School",
      schoolCgpa: "9",
      userAge: "25",
      userPassword: "Abcs@1234",
      primaryLanguage: "English",
      languagesKnown: ["Hindi", "Marathi"],
    },
  ];

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!Array.isArray(users) || users.length === 0) {
    users = [...user1];
  }

  localStorage.setItem("users", JSON.stringify(users));
  renderTable(users);
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
    e.returnValue = "";
  }
});

function onEdit(td) {
  editMode = true;
  formChanged = false;
  const userform = document.getElementById("reg-form");
  userform.reset();

  const selectedRow = td.parentElement.parentElement;
  editUserIndex = selectedRow.rowIndex - 1;

  if (
    previousIndex !== null &&
    ~previousIndex &&
    previousIndex !== editUserIndex
  ) {
    const table = document.getElementById("user-table");
    const targetRow = table.rows[previousIndex + 1];
    targetRow.style.color = "black";
    previousIndex = null;
  }
  if (editMode && ~editUserIndex) {
    selectedRow.style.color = "blue";
    previousIndex = editUserIndex;
  }

  document.getElementById("user-name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("user-age").value = selectedRow.cells[1].innerHTML;
  document.getElementById("user-gender").value =
    selectedRow.cells[2].innerText.trim();
  document.getElementById("contact-number").value =
    selectedRow.cells[3].innerHTML;
  document.getElementById("email-id").value = selectedRow.cells[4].innerHTML;
  document.getElementById("school-name").value = selectedRow.cells[5].innerHTML;
  document.getElementById("High-school-cgpa").value =
    selectedRow.cells[6].innerHTML;
  document.getElementById("user-password").value =
    selectedRow.cells[7].innerHTML;
  const primaryLang = selectedRow.cells[8].innerText.trim();
  document
    .querySelectorAll('input[name="primaryLanguage"]')
    .forEach((radio) => {
      radio.checked = radio.value === primaryLang;
    });

  const Value = selectedRow.cells[9].innerText;
  const seperatdValue = Value.split(",").map((v) => v.trim());
  const checkboxes = document.querySelectorAll('input[name="languagesKnown"]');
  checkboxes.forEach((checkbox) => {
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
  const confirmDelete = confirm("Are you sure to delete this record ?");
  if (confirmDelete) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(rowIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("user-table").deleteRow(row.rowIndex);
    if (editMode && editUserIndex === rowIndex) {
      formReset();
    }
  } else {
    return;
  }
}

function isDuplicateEmail(editIndex) {
  // const emailError = document.getElementById("email-error");
  const inputEmail = document.getElementById("email-id").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUsers = users.findIndex(
    (a, i) => a.email === inputEmail && editIndex !== i
  );
  console.log("existingUsers :>> ", { editUserIndex, existingUsers });

  if (~existingUsers) {
    return true;
  }
  return false;
}

function getPrimaryLanguage() {
  const radios = [
    document.getElementById("lang-en"),
    document.getElementById("lang-hi"),
    document.getElementById("lang-gu"),
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
  userFormValidation();
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
  userFormValidation();
  if (
    document.getElementById("chk-en").checked ||
    document.getElementById("chk-hi").checked ||
    document.getElementById("chk-gu").checked ||
    document.getElementById("chk-mr").checked
  ) {
    error.textContent = "";
    console.log("knownLang true");
    return true;
  } else {
    error.textContent = "Select at least one language";
    console.log("knownLang false");
    return false;
  }
}
function setPrimaryLanguage(value) {
  const radios = [
    document.getElementById("lang-en"),
    document.getElementById("lang-hi"),
    document.getElementById("lang-gu"),
  ];

  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = radios[i].value === value;
  }
}

function setLanguagesKnown(languages) {
  document.getElementById("chk-en").checked = languages.includes("English");
  document.getElementById("chk-hi").checked = languages.includes("Hindi");
  document.getElementById("chk-gu").checked = languages.includes("Gujarati");
  document.getElementById("chk-mr").checked = languages.includes("Marathi");
}

function validatePrimaryLanguage() {
  const English = document.getElementById("lang-en").checked;
  const hindi = document.getElementById("lang-hi").checked;
  const gujarati = document.getElementById("lang-gu").checked;
  const primaryLangError = document.getElementById("primary-lang-error");
  userFormValidation();

  if (English || hindi || gujarati) {
    primaryLangError.innerHTML = "";
    console.log("primary lang true");
    return true;
  } else {
    primaryLangError.innerHTML = "Please Select Your Primary Langauge";
    console.log("primary lang false");
    return false;
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const userform = document.getElementById("reg-form");
//   const inputs = userform.querySelectorAll("input");

//   inputs.forEach((input) => {
//     const savedValue = localStorage.getItem(input.id);
//     if (savedValue !== null) {
//       if (input.type === "checkbox") {
//         if (savedValue == input.value) {
//           input.checked = "true";
//         }
//       } else if (input.type === "radio") {
//         if (savedValue == input.value) {
//           input.checked = "true";
//         }
//       } else {
//         input.value = savedValue;
//       }
//     }

//     input.addEventListener("input", () => {
//       localStorage.setItem(input.id, input.value);
//     });
//   });
//   userform.addEventListener("submit", () => {
//     inputs.forEach((input) => localStorage.removeItem(input.id));
//   });
// });

function pageLoad() {
  const storedData = JSON.parse(localStorage.getItem("users")) || [];
  renderTable(storedData);
  // localStorage.clear()
}

function renderTable(users) {
  const table = document.getElementById("user-table");

  table.innerHTML = "";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Name</th>
      
      <th>Age</th>
      <th>Gender</th>
      <th>Contact Number</th>
      <th>Email</th>
      <th>School Name</th>
      <th>CGPA</th>
      <th>Password</th>
      <th>Primary Language</th>
      <th>Known Languages</th>
      <th>Action</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.userName}</td>      
      <td>${user.userAge}</td>
      <td>${user.gender}</td>
      <td>${user.contactNum}</td>
      <td>${user.email}</td>
      <td>${user.school}</td>
      <td>${user.schoolCgpa}</td>
      <td>${user.userPassword}</td>
      <td>${user.primaryLanguage}</td>
      <td>${user.languagesKnown}</td>
      <td>
        <button onclick="onEdit(this)">Edit</button>
        <button onclick="onDelete(this)">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}

function applymultiColFilter() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const multiSearch = document.getElementById("search").value;

  const filteredMultiColU = users.filter((user) => {
    return (
      user.userName.toLowerCase().includes(multiSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(multiSearch.toLowerCase()) ||
      user.school.toLowerCase().includes(multiSearch.toLowerCase())
    );
  });
  console.log(filteredMultiColU);
  renderTable(filteredMultiColU);
}

function getLanguages() {
  const languages = [];

  if (document.getElementById("filter-lang-en")?.checked)
    languages.push("English");
  if (document.getElementById("filter-lang-hi")?.checked)
    languages.push("Hindi");
  if (document.getElementById("filter-lang-gu")?.checked)
    languages.push("Gujarati");
  if (document.getElementById("filter-lang-mr")?.checked)
    languages.push("Marathi");

  return languages;
}

function applyFilters() {
  const name = document.getElementById("Name-value")?.value.toLowerCase() || "";
  const email =
    document.getElementById("filter-email")?.value.toLowerCase() || "";
  const contact = document.getElementById("filter-contact")?.value || "";
  const gender = document.getElementById("filter-gender")?.value;
  const minCgpa = document.getElementById("min-value-cgpa")?.value;
  const maxCgpa = document.getElementById("max-value-cgpa")?.value;
  const maxAge = document.getElementById("max-age")?.value;
  const minAge = document.getElementById("min-age")?.value;
  const selectedLanguages = getLanguages();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const filteredUsers = users.filter((user) => {
    const matchName = !name || user.userName.toLowerCase().includes(name);

    const matchEmail = !email || user.email.toLowerCase().includes(email);

    const matchContact = !contact || user.contactNum.includes(contact);
    const matchAge =
      (!minAge || Number(user.userAge) >= Number(minAge)) &&
      (!maxAge || Number(user.userAge) <= Number(maxAge));

    const matchGender =
      !gender || gender === "Choosegender" || user.gender === gender;

    const matchCgpa =
      (!minCgpa || Number(user.schoolCgpa) >= Number(minCgpa)) &&
      (!maxCgpa || Number(user.schoolCgpa) <= Number(maxCgpa));

    const lang =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) => user.languagesKnown.includes(lang));

    return (
      matchName &&
      matchEmail &&
      matchContact &&
      matchGender &&
      matchCgpa &&
      matchAge &&
      lang
    );
  });

  renderTable(filteredUsers);
}

function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const debounced = debounce(applymultiColFilter, 1000);
const searchFilter = document.getElementById("search");
// searchFilter.addEventListener("input", (e) => {
//   debounced(e.target.value);
//   console.log("search typed");
// });

function throtel(func, limit = 100) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      func(...args);
    }
  };
}
const throteldFilter = throtel(applyFilters, 300);

function fakeStorageApi(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        resolve(data);
      } catch {
        reject(new Error("Corrupted storage"));
      }
    }, 1000);
  });
}

async function getUser() {
  const users = await fakeStorageApi("users");
  console.log(users);
  users.forEach((user) => console.log(user.userName));
}
