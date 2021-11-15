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
const modalregister = document.getElementById("modale-register-success");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModal = document.querySelector(".close");
const closeModalSuccess = document.querySelector(".close-success");
const subscriptionForm = document.getElementById("btn-form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// Close modal when you click on the Close span
closeModal.addEventListener("click", (e) => {
    modalbg.style.display = "none";
});

// Close confirmation when you click on the Close span
closeModalSuccess.addEventListener("click", (e) => {
    modalregister.style.display = "none";
});

// SubscriptionForm validation system
subscriptionForm.addEventListener("click", (e) => {
    const newUser = new SubscriptionForm();
    newUser.validate();

    console.log(newUser);
});


