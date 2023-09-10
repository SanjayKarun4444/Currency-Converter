const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");
for(let i =0;i<dropList.length;i++){
    for(currency_code in country_code){
        let selected;
        if(i==0){
            selected = currency_code == "USD" ? "selected" : "";
        } else if(i==1){
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`
        // inserting option tag after 
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });

    function loadFlag(element){
        for(code in country_code){
            if(code == element.value){
                let imgTag = element.parentElement.querySelector("img");
                imgTag.src = `https://www.countryflagicons.com/FLAT/64/${country_code[code]}.png`
            }
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
})

getButton.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
})

const exchangeRateIcon = document.querySelector(".drop-list .icon")
exchangeRateIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    getExchangeRate();
});


function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    //if there is nothing inputted, default value is 1
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/6210f5b4dca91632ef81336e/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        console.log(totalExchangeRate);  
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
}