let myHeaders = new Headers();
myHeaders.append("apikey", "AiCdaGg4ECBz8sFfSc3HYgwWvxYDfdZL");

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders
};

const amount = document.getElementById("amount");
const convertAmount = document.getElementById("converted-amount");
const convertButton = document.getElementById("convert-currency");
const base = document.getElementById("base-currency");
const target = document.getElementById("target-currency");



const list = () => {
  fetch(`https://api.apilayer.com/exchangerates_data/latest`, requestOptions)
    .then(response => response.text())
    .then(results => {
      let obj = JSON.parse(results);
      let currencyL = Object.keys(obj.rates);
      currencyL.map(i => {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        base.append(option);
      });
      currencyL.map(i => {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        target.append(option);
      });
    })
    .catch(error => {
      console.log("error", error);
      alert("Something went wrong. Please try again.");
    });
};

const convert = (base, target, amount) => {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?from=${base}&to=${target}&amount=${amount}`, requestOptions)
    .then(response => response.text())
    .then(results => (convertAmount.innerText = JSON.parse(results).result))
    .catch(error => {
      console.log("error", error);
      convertAmount.innerText = "Couldn't compare. Try again.";
    });
};

list();

convertButton.addEventListener("click", e => {
  e.preventDefault();
  convert(base.value, target.value, amount.value);
});
