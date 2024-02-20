const form = document.querySelector('.calculationForm');
const result = document.querySelector('.result');
const carBrandSelect = document.getElementById('selectedCar');
const carModelSelect = document.getElementById('carModel');
const radioFuel = document.querySelectorAll('input[name="radio-fuel"]');
const radioCondition = document.querySelectorAll('input[name="radio-condition"]');
const radioOwners = document.querySelectorAll('input[name="radio-owners"]');
const radioPayment = document.querySelectorAll('input[name="radio-payment"]');


const buttonForm =document.querySelector('.button-form');
const inputs = document.querySelectorAll('input[type = "radio"]')
const optionsRenault = ['...','Logan','Sandero','Kaptur','Duster','Megane'];
const optionsJaguar = ['...','XF','F-Type','F-Pace','I-Pace','E-Pace'];
const optionsOpel = ['...','Crossland','Grandland X','Combo Life','Astra'];
const optionsMazda = ['...','CX-5','CX-3','CX-60','Mazda3','Mazda MX-30'];

const priceInfo = {
    renault : {
        Logan: 4000000,
        Sandero: 4500000,
        Kaptur:6000000,
        Duster:5000000,
        Megane:4500000,
    },
    jaguar:{
        XF:6000000,
        'F-Type':7000000,
        'F-Pace':7500000,
        'I-Pace':8000000,
        'E-Pace':8500000,
    },
    opel:{
        Crossland:5600000,
        'Grandland X':6000000,
        'Combo Life':5800000,
        Astra:6000000,
    },
    mazda:{
        'CX-5':8900000,
        'CX-3':7800000,
        'CX-60':8400000,
        'Mazda3':9030000,
        'Mazda MX-30':9400000,
    },
}


const choosingCarBrand = () =>{
    const selectedBrand = carBrandSelect.value;
    const selectedModel = carModelSelect.value;
    console.log(selectedBrand, selectedModel);
    carModelSelect.innerHTML = '';
    if(selectedBrand === 'renault'){
        addOptions(carModelSelect,optionsRenault);
    } else if (selectedBrand === 'opel'){
        addOptions(carModelSelect,optionsOpel);
    } else if(selectedBrand === 'mazda'){
        addOptions(carModelSelect,optionsMazda);
    } else if(selectedBrand === 'jaguar'){
        addOptions(carModelSelect,optionsJaguar);
    };
}

const addOptions = (selectBrand, modelsArr) =>{
    modelsArr.forEach(model => {
        const optionElement = document.createElement('option');
        optionElement.innerHTML = model;
        optionElement.value = model;
        selectBrand.appendChild(optionElement);
    });
}

const calculatePrice = () =>{
    const selectedBrand = carBrandSelect.value;
    const selectedModel = carModelSelect.value;
    console.log(selectedModel)
    let price = selectedBrand !== '' && selectedModel !== '' ? priceInfo[selectedBrand][selectedModel] : 0;
    result.textContent = `Price: ${price}`
    const formatter = new Intl.NumberFormat('ru-RU');
    result.textContent = formatter.format(price);
};

form.addEventListener('change', () =>{
    choosingCarBrand();
    calculatePrice();
})



