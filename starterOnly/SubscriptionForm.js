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
    }

    checkTournamentTown() {
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
        return this.errors !== 0;

    }

    showErrorMessage(input, message) {
        const formData = input.parentElement;
        formData.className = 'formData error'
        const errorMessage = formData.querySelector('.errorMessage');
        errorMessage.innerHTML = message;
        input.focus();
    }

    errorsMessage = {
        firstName: {
            empty: `Le champ prénom est vide.`,
            minCarac: `Le champ doit posséder plus de 2 caractères.`,
            regEx: `Votre prénom ne doit posseder de caractèrse alphanumérique.`,
            onlyStrings: 'Votre prénom ne peut contenir que des lettres'
        },
        lastName: {
            empty: `Le champ nom est vide.`,
            minCarac: `Le champ doit posséder plus de 2 caractères.`,
            regEx: `Votre prénom ne doit posseder de caractèrse alphanumérique.`,
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

    validateFirstName() {
        const regFirstName = /^[a-z-]+$/i

        if (!this.firstName) {
            console.log(`${this.errorsMessage.firstName.empty}`)
            this.showErrorMessage()
            this.errors++;
        } else if (this.validateLengthMin(this.firstName, 2)) {
            console.log(`${this.errorsMessage.firstName.minCarac}`)
            this.errors++;
        } else if (!regFirstName.test(this.firstName)) {
            console.log(`${this.errorsMessage.firstName.regEx}`)
            this.errors++;
        } else if (typeof this.firstName !== "string") {
            console.log(`${this.errorsMessage.firstName.onlyStrings}`)
            this.errors++;
        } else {
            console.log(`Prénom: ${this.firstName}`);
            // on peut mettre un display none et le vider
        }
    }

    validateLastName() {
        const regLastName = /^[a-z -]+$/i

        if (!this.lastName) {
            console.log(`${this.errorsMessage.lastName.empty}`)
            this.errors++;
        } else if (this.validateLengthMin(this.lastName, 2)) {
            console.log(`${this.errorsMessage.lastName.minCarac}`)
            this.errors++;
        } else if (!regLastName.test(this.lastName)) {
            console.log(`${this.errorsMessage.lastName.regEx}`)
            this.errors++;
        } else if (typeof this.lastName !== "string") {
            console.log(`${this.errorsMessage.lastName.onlyStrings}`)
            this.errors++;
        } else {
            console.log(`Nom: ${this.lastName}`);
            // on peut mettre un display none et le vider
        }
    }

    validateEmail() {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!this.email) {
            console.log(`${this.errorsMessage.email.empty}`)
            this.errors++;
        } else if (!regexEmail.test(this.email)) {
            console.log(`${this.errorsMessage.email.regEx}`)
            this.errors++;
        } else {
            console.log(`Email: ${this.email}`);
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
        let datenaissanceobj = new Date(datenaissancearray[0],
            datenaissancearray[1] - 1,
            datenaissancearray[2],
            0,
            0,
            0);

        if (!this.birthDate) {
            console.log(`${this.errorsMessage.birthdate.empty}`)
            this.errors++;
        } else if (date < datenaissanceobj) {
            console.log(`${this.errorsMessage.birthdate.minYear}`);
            this.errors++;
        } else {
            console.log(`Date de naissance ${this.birthDate}`);
            // on peut mettre un display none et le vider
        }
    }

    validateHowMuchTournament() {
        if (!this.howMuchTournament) {
            this.howMuchTournament = 0;
        } else if (this.howMuchTournament < 0) {
            console.log(`${this.errorsMessage.howMuchTournament.negative}`)
            this.errors++;
        } else {
            console.log(`Tournois: ${this.howMuchTournament}  !`);
            // on peut mettre un display none et le vider
        }
    }

    validateTournamentTown() {
        if (!this.tournamentTown) {
            this.tournamentTown = null
            console.log(`${this.errorsMessage.tournamentTown.noTown}`)
            this.errors++;
        } else {
            console.log(`Ville: ${this.tournamentTown}`)
            // on peut mettre un display none et le vider
        }
    }

    validateCgvAllowed() {
        if (!this.cgvAllowed.checked) {
            console.log(`${this.errorsMessage.cgvAllowed}`)
            this.errors++;
        } else {
            console.log(`cvgAllowed: ${this.cgvAllowed}`)
            // on peut mettre un display none et le vider
        }
    }

    validateNewsletterAllowed() {
        return this.newsletterAllowed;
    }

    validateLengthMin(field, lengthMin) {
        return field <= lengthMin;
    }

    handlingError() {
    }
}
