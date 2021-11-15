class SubscriptionForm {
    constructor() {
        this.errors = 0;
        this.firstName = document.getElementById('first').value;
        this.lastName = document.getElementById('last').value;
        this.email = document.getElementById('email').value;
        this.birthDate = document.getElementById('birthdate').value;
        this.howMuchTournament = document.getElementById('quantity').value;
        this.tournamentTown = null;
        this.cgvAllowed = document.getElementById('checkbox1');
        this.newsletterAllowed = document.getElementById('checkbox2:checked')?.value;
        this.checkTournamentTown();

        this.closelBtn = document.querySelectorAll(".close");
    }

    checkTournamentTown() {
        // TODO Si la personne a mis 0. Elle ne peut pas acceder aux bouton radios
        let radios = document.getElementsByName('location');
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].type === 'radio' && radios[i].checked) {
                this.tournamentTown = radios[i].value;
            }
        }
    }

    validate() {
        this.validateFirstName();
        this.validateLastName();
        this.validateEmail();
        this.validateBirthDate();
        this.validateHowMuchTournament();
        this.validateTournamentTown();
        this.validateCgvAllowed();
        this.validateNewsletterAllowed();
        if (this.errors === 0) {
            // on vide le formulaire
            /*
            this.firstName.reset();
            this.lastName.reset();
            this.email.reset();
            this.birthDate.reset();
            this.howMuchTournament.reset();
            this.tournamentTown.reset();
            this.cgvAllowed.reset();
            this.newsletterAllowed.reset();
            // ici on cache le formulaire
            this.closeModal()
            // on affiche une modale inscription ok

             */
            document.getElementById('form-register').reset();
            modalbg.style.display = "none";
            modalregister.style.display = "block";
        }
    }

    errorsMessage = {
        firstName: {
            empty: `Le champ prénom est vide.`,
            minCarac: `Le champ doit posséder plus de 2 caractères.`,
            regEx: `Votre prénom ne doit pas posseder de caractèrse alphanumérique.`,
            onlyStrings: 'Votre prénom ne peut contenir que des lettres'
        },
        lastName: {
            empty: `Le champ nom est vide.`,
            minCarac: `Le champ doit posséder plus de 2 caractères.`,
            regEx: `Votre prénom ne doit pas posséder de caractères alphanumérique.`,
            onlyStrings: 'Votre nom ne peut contenir que des lettres'
        },
        email: {
            empty: `Le champ eMail est vide.`,
            regEx: 'Votre email n\'est pas correct'
        },
        birthdate: {
            empty: `Le champ date de naissance est vide.`,
            minYear: 'Vous devez avoir au moins 16 ans pour participer'
        },
        howMuchTournament: {
            negative: 'Le nombre de tournois ne peut etre négatif'
        },
        tournamentTown: {
            noTown: 'Aucune ville séléctionnée',
        },
        cgvAllowed: `Pour vous inscrire, vous devez accepter les termes et conditions.`,
    };

    handleErrorMessage(input, msgerror, visibility = true) {
        let inputParentNode = document.getElementById(input).parentNode;
        if (visibility) {
            inputParentNode.setAttribute('data-error-visible', 'true');
            inputParentNode.setAttribute('data-error', msgerror);
        } else {
            inputParentNode.removeAttribute('data-error-visible');
            inputParentNode.removeAttribute('data-error');
        }
    }

    validateFirstName() {
        const regFirstName = /^[a-z-]+$/i

        if (!this.firstName) {
            this.handleErrorMessage('first', this.errorsMessage.firstName.empty, true);
            this.errors++;
        } else if (this.validateLengthMin(this.firstName, 2)) {
            this.handleErrorMessage('first', this.errorsMessage.firstName.minCarac, true);
            this.errors++;
        } else if (!regFirstName.test(this.firstName)) {
            this.handleErrorMessage('first', this.errorsMessage.firstName.regEx, true);
            this.errors++;
        } else if (typeof this.firstName !== "string") {
            this.handleErrorMessage('first', this.errorsMessage.firstName.onlyStrings, true);
            this.errors++;
        } else {
            this.handleErrorMessage('first', 'vide', false);
        }
    }

    validateLastName() {
        const regLastName = /^[a-z -]+$/i

        if (!this.lastName) {
            this.handleErrorMessage('last', this.errorsMessage.lastName.empty, true);
            this.errors++;
        } else if (this.validateLengthMin(this.lastName, 2)) {
            this.handleErrorMessage('last', this.errorsMessage.lastName.minCarac, true);
            this.errors++;
        } else if (!regLastName.test(this.lastName)) {
            this.handleErrorMessage('last', this.errorsMessage.lastName.regEx, true);
            this.errors++;
        } else if (typeof this.lastName !== "string") {
            this.handleErrorMessage('last', this.errorsMessage.lastName.onlyStrings, true);
            this.errors++;
        } else {
            this.handleErrorMessage('last', 'vide', false);
        }
    }

    validateEmail() {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!this.email) {
            this.handleErrorMessage('email', this.errorsMessage.email.empty, true);
            this.errors++;
        } else if (!regexEmail.test(this.email)) {
            this.handleErrorMessage('email', this.errorsMessage.email.regEx, true);
            this.errors++;
        } else {
            this.handleErrorMessage('email', 'vide', false);
            // on peut mettre un display none et le vider
        }
    }

    validateBirthDate() {
        // Instancie la date actuelle
        let date = new Date();
        // Retire 16 ans à la date instanciée
        date.setFullYear(date.getFullYear() - 16);
        // Retire les "-" à la date
        let birthDate = this.birthDate.split('-');
        let birthDateObj = new Date(birthDate[0],
            birthDate[1] - 1,
            birthDate[2],
            0,
            0,
            0);
        if (!this.birthDate) {
            this.handleErrorMessage('birthdate', this.errorsMessage.birthdate.empty, true);
            this.errors++;
        } else if (date < birthDateObj) {
            this.handleErrorMessage('birthdate', this.errorsMessage.birthdate.minYear, true);
            this.errors++;
        } else {
            this.handleErrorMessage('birthdate', 'vide', false);
        }
    }

    validateHowMuchTournament() {
        // TODO Revoir
        console.log(this.howMuchTournament);
        if (!this.howMuchTournament) {
            this.howMuchTournament = 0;
            this.handleErrorMessage('quantity',
                this.errorsMessage.howMuchTournament.negative,
                true);
            let radios = document.getElementsByName('location');
            for (let i = 0; i < radios.length; i++) {
                let myBtn = radios[i];
                myBtn.disabled = false;
            }
            this.errors++;
        } else if (this.howMuchTournament < 0) {
            let radios = document.getElementsByName('location');
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].type === 'radio' && radios[i].checked) {
                    let myBtn = radios[i];
                    myBtn.checked = false;
                }
            }
            this.handleErrorMessage('quantity',
                this.errorsMessage.howMuchTournament.negative,
                true);
            this.errors++;
        } else if (this.howMuchTournament == 0) {
            let radios = document.getElementsByName('location');
            for (let i = 0; i < radios.length; i++) {
                let myBtn = radios[i];
                if (radios[i].type === 'radio' && radios[i].checked) {
                    myBtn.checked = false;
                }
                myBtn.disabled = false;
            }
        } else {
            let radios = document.getElementsByName('location');
            let check = 0;
            for (let i = 0; i < radios.length; i++) {
                let myBtn = radios[i];

                if (radios[i].type === 'radio' && radios[i].checked) {
                    check++;
                }
                console.log(check);
                myBtn.disabled = false;
            }
            if (check == 0) {
                console.log(check);
                this.errors++;
                this.handleErrorMessage('quantity', 'aucune ville sélectionnée', true);
            } else {

                this.handleErrorMessage('quantity', 'vide', false);
            }
            // on peut mettre un display none et le vider
        }
    }

    validateTournamentTown() {
        if (!this.tournamentTown) {
            this.tournamentTown = null;
        }
    }

    validateCgvAllowed() {
        if (!this.cgvAllowed.checked) {
            this.handleErrorMessage('checkbox2', this.errorsMessage.cgvAllowed, true);
            this.errors++;
        } else {
            this.handleErrorMessage('checkbox2', 'vide', false);
            // on peut mettre un display none et le vider
        }
    }

    validateNewsletterAllowed() {
        return this.newsletterAllowed;
    }

    validateLengthMin(field, lengthMin) {
        if (field.length < lengthMin) {
            return true;
        }
        return false;
    }
}
