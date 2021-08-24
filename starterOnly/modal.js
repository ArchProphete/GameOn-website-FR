function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");
const form = document.querySelector("form");

class Validator {
  constructor() {
  }

  get ValidLastString() {
    return this.validLastString()
  }

  validLastString (string) {
    return string.length <= 2
  }
}

class User {
  constructor(
      firstName,
      lastName,
      email,
      birthDate,
      howMuchTournament,
      tournamentTown,
      cgvAllowed,
      newsletterAllowed,
  ) {
    this.firstName = document.getElementById('first').value;
    this.lastName = document.getElementById('last').value;
    this.email = document.getElementById('email').value;
    this.birthDate = document.getElementById('birthdate').value;
    this.howMuchTournament = document.getElementById('quantity').value;
    this.tournamentTown = document.querySelector('input[name="location"]:checked').value;
    this.cgvAllowed = document.querySelector('#checkbox1:checked').value;
    this.newsletterAllowed = document.querySelector('#checkbox2:checked')?.value;
  }
}

// this.tournamentTown = document.querySelector('input[name="location"]:checked').value;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal when you click on the Close span
closeModal.addEventListener("click",(e) => {
  modalbg.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
})

function validate() {
  const newUser = new User()
  console.log(newUser.tournamentTown);
}
