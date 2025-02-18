function editNav() {
  var x = document.getElementById("myTopnav");
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
// declaration des variable du formulaires 
const submitModal = document.forms[0];
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const mailAdress = document.getElementById('email');
const birthDate = document.getElementById('birthdate');
const tourneys = document.getElementById('quantity');
const radioLocations = document.querySelectorAll('input[type="radio"]');
const conditions = document.getElementById('checkbox1');


// creation d'une fonction qui permet de fermer la modal et utilisation de la fonction reset .
const modalClose = document.getElementsByClassName("close")[0];
modalClose.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
  document.forms[0].reset();
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// EVENT : SOUMETTRE LE FORMULAIRE
submitModal.addEventListener('submit', function(e) {
  e.preventDefault();

  // Vérification du prénom +regex 
  if (firstName.value.length < 2 ||
    !firstName.value.match(/^[A-Za-z-éèêàâäiîçô\s]{2,}$/)) {
    formData[0].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    formData[0].dataset.errorVisible = 'true';
  } else {
    formData[0].removeAttribute('data-error');
    formData[0].removeAttribute('data-error-visible');
  }

  // Vérification du nom de famille + regex 
  if (lastName.value.length < 2 || !lastName.value.match(/^[A-Za-z-éèêàâäiîçô\s]{2,}$/)) {
    formData[1].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    formData[1].dataset.errorVisible = 'true';
  } else {
    formData[1].removeAttribute('data-error');
    formData[1].removeAttribute('data-error-visible');
  }

  // Vérification de l'adresse mail avec regex
  mailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,63})$/;

  if (!mailFormat.test(mailAdress.value || mailAdress.value == ' ' || mailAdress.value == null)) {
    formData[2].dataset.error = 'Veuillez entrer une adresse email valide et conforme!';
    formData[2].dataset.errorVisible = 'true';
  } else {
    formData[2].removeAttribute('data-error');
    formData[2].removeAttribute('data-error-visible');
  }

  // Vérification de la date de naissance + ajout condition d'age 
  const birth = new Date(birthDate.value);
  const today = new Date();

  if  ((isNaN(Date.parse(birthDate.value))|| birth.getFullYear() > today.getFullYear()-18) ) {
    formData[3].dataset.error = 'Veuillez entrer une date valide au format jj-mm-aaaa';
    formData[3].dataset.errorVisible = 'true';
  } else {
    formData[3].removeAttribute('data-error');
    formData[3].removeAttribute('data-error-visible');
  }

  // Vérification du nombre de tournois
  tourneyFormat = /^[0-9]{1,100}$/;
  if (!tourneyFormat.test(tourneys.value)) {
    formData[4].dataset.error = 'Vous devez insérez une valeur numérique.';
    formData[4].dataset.errorVisible = 'true';
  } else {
    formData[4].removeAttribute('data-error');
    formData[4].removeAttribute('data-error-visible');
  }

  // Vérification du choix de la ville
  let isLocationChecked;
  for (radioLocation of radioLocations) {
    if (radioLocation.checked) {
      isLocationChecked = 1;
      break;
    }
  };

  if (isLocationChecked !== 1) {
    formData[5].dataset.error = 'Veuillez selectionnez une ville';
    formData[5].dataset.errorVisible = 'true';
  } else {
    formData[5].removeAttribute('data-error');
    formData[5].removeAttribute('data-error-visible');
  }

  // Vérification des conditions d'utilisation
  if (!(conditions.checked)) {
    formData[6].dataset.error = "Veuillez accepter les conditions d'utilisation ";
    formData[6].dataset.errorVisible = 'true';
  } else {
    formData[6].removeAttribute('data-error');
    formData[6].removeAttribute('data-error-visible');
  }

  // Comportement du formulaire
  let hasError;
  for (var i = 0; i < formData.length; i++) {
    if (formData[i].hasAttribute('data-error')) {
      hasError = 1;
      break;
    }
  }

  if (!(hasError === 1)) {
    closeModal();

    // Validation du formulaire si tout est ok
    const div = document.createElement('div');
    document.querySelector('body').appendChild(div);
    document.querySelector('body > div:last-child').classList.add('content', 'validBox');
    // Validation Box Span Close
    document.querySelector('.validBox').appendChild(document.createElement('span'));
    document.querySelector('.validBox > span').classList.add('close');
    document.querySelector('.validBox > span').addEventListener('click', function() {
      document.querySelector('body').removeChild(div);
    });

    // Validation Box Content
    document.querySelector('.validBox').appendChild(document.createElement('div'));
    document.querySelector('.validBox > div').classList.add('modal-body', 'validMessage');
    let newSpan = document.createElement('span');
    document.querySelector('.validMessage').appendChild(newSpan);
    document.querySelector('.validMessage > span').innerHTML = "Merci pour votre inscription.";
   


    //  CLOSE BUTTON
    const btn = document.createElement("button");
    document.querySelector('.validBox').appendChild(btn);
    document.querySelector('.validBox > button').innerHTML = "Fermer";
    document.querySelector('.validBox > button').style.margin = '0 auto';
    document.querySelector('.validBox > button').classList.add("btn-signup");
    document.querySelector('.validBox > button').addEventListener('click', function() {
      document.querySelector('body').removeChild(div);
    });
  } 
});


