import './styles.css';
// import './js/notification.js';


import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import fetchCountries from './js/fetchCountries.js';
import countriesListTemplate from './templates/countriesList.hbs';
import countryInfoTemplate from './templates/countryInfo.hbs';


const debounce = require('lodash.debounce');

const inputRef = document.querySelector('input');
const countryRef = document.querySelector(".country");




inputRef.addEventListener('input', debounce(renderCountryDescriprion, 500));




function renderCountryDescriprion(event) {
  countryRef.innerHTML = "";
  let searchQuery = event.target.value;

    fetchCountries(searchQuery).then(data => {
    const markup = countryInfoTemplate(data);
    const countriesList = countriesListTemplate(data);
    if (!data) {
    } else if (data.length > 10) {
        error({
  text: "Too many matches found. Please, enter a correct country name!"
      });
      return error;
    } else if (data.length === 1) {
      countryRef.insertAdjacentHTML('beforeend', markup);
      inputRef.value = "";
    }else if (data.length >= 2 && data.length <= 10) {
      countryRef.insertAdjacentHTML('beforeend', countriesList);

      if (countryRef !== "") {
        const countriesItemRef = document.querySelectorAll(".counrties-item");
        Array.prototype.map.call(countriesItemRef,
        function (obj) {obj.addEventListener('click', renderNewCountryDescriprion); })
        function renderNewCountryDescriprion(event) {
          countryRef.innerHTML="";
          searchQuery = event.currentTarget.textContent;

        fetchCountries(searchQuery).then(data => {
          const markup = countryInfoTemplate(data);
          countryRef.insertAdjacentHTML('beforeend', markup);
          searchQuery = "";
        })
      };
        }
    } else {
      const alertNotification = alert({
  text: "Nothing found. Please, enter a more specific query"
});
      return alertNotification;
    }
  }).catch(error => console.log(error))
}
