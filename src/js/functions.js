
let countries;


export default function fetchCountries(searchQuery) {
    countryRef.innerHTML = "";
    fetch("https://restcountries.eu/rest/v2/name/${searchQuery}")
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Error fetching data");
        })
        .then(data => {
            console.log(data);
            countries = data;
            console.log(countries);
            const markup = countriesTemplate(data);
            console.log(markup);
            countryRef.insertAdjacentHTML('beforeend', markup)
        })
        .catch(error => {
            console.error("Error: ", error);
        });
}



// fetch('https://restcountries.eu/#api-endpoints-name', {
//   method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'X-Custom-Header': 'custom value',
//   },
// }).then(response => {});

    
//     console.log(targetCountry);
// }