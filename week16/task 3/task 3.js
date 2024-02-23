const form = document.querySelector('.calculationForm');
const result = document.querySelector('.result');
const carBrandSelect = document.getElementById('selectedCar');
const carModelSelect = document.getElementById('carModel');
const radioFuel = document.querySelectorAll ('input[name="radio-fuel"]');
const radioCondition = document.querySelectorAll('input[name="radio-condition"]');
const radioOwners = document.querySelectorAll('input[name="radio-owners"]');
const radioPayment = document.querySelectorAll('input[name="radio-payment"]');
const selects = document.querySelectorAll('input[class="selected-car"]');
const engineCapacityInput = document.getElementById('engineCapacity');
const buttonForm =document.querySelector('.button-form');
const buttonReset = document.querySelector('.button-reset');

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

// const validateRadioinputs = (radioGroup) =>{
//     const checkedRadio = Array.from(radioGroup).filter(radio => radio.checked)
//     const parentElement = checkedRadio[0].parentElement
//     if(!checkedRadio) {
//         console.log('error!')
//         const errorMessage = parentElement.querySelector('span');
        
//         errorMessage.textContent = 'error!';
//         return false
//     } else {
//         console.log(parentElement) 
//         const successMessage = parentElement.querySelector('span');
//         successMessage.textContent = 'Готово!'
//         successMessage.classList.add('success')
//         return true
//     }
// }

const isEngineValid = value => value >=1.1 && value <= 3.5 ? true : false;

const checkEngineCapacityValidity = () =>{
    const valueInNum = parseFloat(engineCapacityInput.value);
    const parentInput = engineCapacityInput.parentElement;
    const errorText = parentInput.querySelector('span');
    errorText.classList.add('error')
    if(!isEngineValid(valueInNum)){
        errorText.textContent = 'Введите значение объема двигателя в литрах от 1.1 до 3.5'
    } else{
        errorText.textContent = '';
        console.log(valueInNum)
    }
    
}

form.addEventListener('input',(evn)=>{
    switch (evn.target.id) {
        case 'engineCapacity':
            checkEngineCapacityValidity();
            break;
    }
})

const calculateEngineCapacity = ()=>{
    const valueInNum = parseFloat(engineCapacityInput.value);
    if(valueInNum >= 1.1 && valueInNum <= 2) return 1;
    if(valueInNum >= 2.1 && valueInNum <= 2.8) return 1.1;
    if(valueInNum >= 2.9 && valueInNum <= 3.5) return 1.2;
};

carModelSelect.disabled = true;
const setDisabledSelect = () =>{
    if(carBrandSelect.value !== ''){
    carModelSelect.disabled = false;
    } else{carModelSelect.disabled = true;};
}

const addOptions = (selectBrand, modelsArr) =>{
    modelsArr.forEach(model => {
        const optionElement = document.createElement('option');
        optionElement.textContent = model;
        optionElement.value = model;
        selectBrand.appendChild(optionElement);
    });
};

const choosingCarBrand = () =>{
    const selectedBrand = carBrandSelect.value;
    carModelSelect.innerHTML = '';
    if(selectedBrand === 'renault'){
        addOptions(carModelSelect,optionsRenault);
    } else if (selectedBrand === 'opel'){
        addOptions(carModelSelect,optionsOpel);
    } else if(selectedBrand === 'mazda'){
        addOptions(carModelSelect,optionsMazda);
    } else if(selectedBrand === 'jaguar'){
        addOptions(carModelSelect,optionsJaguar);
    }
};

const getHiddenElem = ()=>{
    const hiddenDiv = document.querySelector('.hidden-element');
    const conditionCarUsed = document.querySelector('#conditionCarUsed');
    if(conditionCarUsed.checked){
        hiddenDiv.style.display = 'block';
    } else{hiddenDiv.style.display = 'none';}
};

const getRadioChecked = (radioInputs)=>{
    const checkedRadio = [...radioInputs].find(radio => radio.checked);
    return checkedRadio ? parseFloat(checkedRadio.value) : 1;
}

const choosingCarOptions = ()=>{
    const selectedBrand = carBrandSelect.value;
    const selectedModel = carModelSelect.value;
    let priceCarModel = selectedBrand !== '' && selectedModel !== '' ? priceInfo[selectedBrand][selectedModel] : 0;
    let price = priceCarModel;
        price *= getRadioChecked(radioFuel);
        price *= getRadioChecked(radioCondition);
        price *= getRadioChecked(radioOwners);
        price *= getRadioChecked(radioPayment);
    const getPriceEngine = calculateEngineCapacity();
    price *= getPriceEngine;
    return price
};

const updateResultText = () => {
    const price = choosingCarOptions();
    const formatter = new Intl.NumberFormat('ru-RU');
    formatter.format(price);
    result.textContent = price != null && !isNaN(price) ? `Итого: стоимость ${formatter.format(price)} руб.` : '';
};

carBrandSelect.addEventListener('change', () =>{
    setDisabledSelect();
    choosingCarBrand();
});


form.addEventListener('input', () =>{
    updateResultText();
    getHiddenElem();
})

buttonReset.addEventListener('click', ()=>{
    form.reset();
    result.textContent = '';
    setDisabledSelect();
})

let key = 0;
const obj = {
    one: 1,
    two:2,
    three:3,
}
console.log(obj[key])