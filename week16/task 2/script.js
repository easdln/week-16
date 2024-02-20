const form = document.querySelector('.classForm');
const userNameValue = document.querySelector('#userName');
const userEmailValue = document.querySelector('#userEmail');
const userAgeValue = document.querySelector('#userAge');
const userPasswordValue = document.querySelector('#userPassword');
const agreeInput = document.querySelector('.agreeInput');
const firstRadio = document.querySelector('.radio1');
const secondRadio = document.querySelector('.radio2');
const submitButton = document.querySelector('.btn-submit');

const agreeInputChecked = value => value.checked ? false : true;
const isRequired = value => value === '' ? false : true;
const isCheckedRadio = (radio1, radio2) => radio1.checked || radio2.checked ? true : false;
const isBetween = (length,min,max) => length < min || length > max ? false : true;
const isBetweenAge = (value, min, max) => value < min || value > max ? false : true;
const emailValid = (email) => {
    const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return reg.test(email);
};

const passwordValid = (password) =>{
    const reg2 = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
    return reg2.test(password);
};

const showError = (input, message) =>{
    const parentInput = input.parentElement;
    parentInput.classList.remove('success');
    parentInput.classList.add('error');
    const errorMessage = parentInput.querySelector('span');
    errorMessage.textContent = message;
};

const showSuccess = (input) =>{
    const parentInput = input.parentElement;
    parentInput.classList.remove('error');
    parentInput.classList.add('success');
    const errorMessage = parentInput.querySelector('span');
    errorMessage.textContent = "";
};

const checkAgreeInput = () =>{
    let valid = false;
    if(agreeInputChecked(agreeInput)){
        showError(agreeInput, 'Необходимо дать согласие на обработку данных.');
    } else{
        showSuccess(agreeInput);
        valid = true;
    }
    return valid;
};

const checkRadioInput = () =>{
    let valid = false;
    if(!isCheckedRadio(firstRadio, secondRadio)){
        showError(firstRadio, 'Укажите свой пол');
    } else{
        showSuccess(firstRadio);
        valid = true;
    }
    return valid;
};

const checkUserName = () =>{
    let valid = false;
    const max = 24,
        min = 3;
    const userName = userNameValue.value.trim();
    if(!isRequired(userName)){
        showError(userNameValue, 'Введите ваше имя');
    } else  if(!isBetween(userName.length, min, max)){
        showError(userNameValue, `Имя должно быть не меньше ${min} и не больше ${max} символов.`);
    } else{
        showSuccess(userNameValue);
        valid = true;
    }
    return valid;
};

const checkUserEmail = () =>{
    let valid = false;
    const userEmail = userEmailValue.value.trim();
    if(!isRequired(userEmail)){
        showError(userEmailValue, 'Введите ваш email в формате "hello@example.com"');
    } else if(!emailValid(userEmail)){
        showError(userEmailValue, 'Введите корректный email в формате "hello@example.com"')
    } else {
        showSuccess(userEmailValue);
        valid = true;
    }
    return valid;
};

const checkUserPassword = () =>{
    let valid = false;
    let min = 8,
        max = 20;
    const userPass = userPasswordValue.value.trim();
    if(!isRequired(userPass)){
        showError(userPasswordValue, 'Введите желаемый пароль');
    } else if(!isBetween(userPass.length, min, max)){
        showError(userPasswordValue, `Пароль не должен быть меньше ${min} и не больше ${max} символов.`);
    } else if (!passwordValid(userPass)){
        showError(userPasswordValue, 'Пароль должен содержать не менее 8 символов, включая как минимум 1 символ нижнего регистра, 1 символ верхнего регистра, 1 цифру и 1 специальный символ в формате (!@#$%^&*).')
    } else {
        showSuccess(userPasswordValue);
        valid = true;
    }
    return valid;
};

const checkUserAge = () =>{
    let valid = false;
    let min = 16,
        max = 90;
    const userAge = userAgeValue.value;
    if(!isRequired(userAge)){
        showError(userAgeValue, 'Введите ваш возраст.');
    } else if(!isBetweenAge(userAge, min, max)){
        showError(userAgeValue, `Возраст не должен быть меньше ${min} и больше ${max} лет.`);
    } else{
        showSuccess(userAgeValue);
        valid = true;
    }
    return valid
};

const elementsForm = document.forms.form.elements;
const inputValues = () =>{
    Array.from(elementsForm).forEach((element)=>{
        console.log(element.value)
    })
}

form.addEventListener('input', (evn)=>{
    switch(evn.target.id){
        case 'userName':
            checkUserName();
            break;
        case 'userEmail':
            checkUserEmail();
            break;
        case 'userAge':
            checkUserAge();
            break;
        case 'radio1':
            checkRadioInput();
            break;
        case 'radio2':
            checkRadioInput();
            break;
        case 'userPassword':
            checkUserPassword();
            break;
        case 'userAgree':
            checkAgreeInput();
            break;
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValidUserName = checkUserName(),
        isValidUserEmail = checkUserEmail(),
        isValidPassword = checkUserPassword(),
        isValidAge = checkUserAge(),
        isValidCheckbox = checkAgreeInput(),
        isValidRadio = checkRadioInput();
    let formValid = isValidUserName &&
                    isValidUserEmail &&
                    isValidPassword &&
                    isValidAge &&
                    isValidCheckbox &&
                    isValidRadio; 
    form.addEventListener('input',checkValidForm = (formValid) => {
        if (formValid) {
            submitButton.removeAttribute('disabled', false);
            return true;
        } else {
            submitButton.setAttribute('disabled', true);
            return false;
        }
    });
    if (checkValidForm(formValid)) {
        inputValues();
        form.reset();
    } else {
        console.log('Invalid form!!!')
    }
    console.log('Click!')
})

const togglePassword = document.querySelector('#togglePassword');
togglePassword.addEventListener('click', () =>{
    const type = userPasswordValue.getAttribute('type') === 'password' ? 'text' : 'password';
    userPasswordValue.setAttribute('type', type);
    togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
})



