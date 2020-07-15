// Get the Ui elements
// sections
const inputSectionUI = document.getElementById('inputs');
const loadingSectionUI = document.getElementById('loading');
const resultSectionUI = document.getElementById('result');
const copyrightSectionUI = document.getElementById('copyright-footer');
// all inputs 
const userNameUI = document.getElementById('name');
const dateOfBirthUI = document.getElementById('dob');
const timeOfBirthUI = document.getElementById('tob');
const favouriteColorUI = document.getElementById('favcolor');
// Buttons
const calculateBtnUI = document.getElementById('calculate-btn');
const calculateAgainBtnUI = document.getElementById('calculate-again');


// Validation
// check for a string is alphabatic or not
const isAlpha = (str) => {
    isalpha = true;
    str = str.toLowerCase();
    for(let i=0;i<str.length;i++){
        let ch = str.charAt(i);
        if(!((ch>="a" && ch<="z") || ch===" ")){
            isalpha = false;
            break;
        }
    }

    return isalpha;
}

// name validation
const nameValidate = () => {
    let userName = userNameUI.value.trim();
    if(userName === '' || !isAlpha(userName)){
        userNameUI.classList = 'form-control is-invalid';
        document.getElementById('name-feedback').innerText = 'আপনার নাম নির্ভুলভাবে দিন';
        return null;
    }else{
        userNameUI.classList = 'form-control is-valid';
        return userName;
    }
}

const dateValidate = () => {
    let date = dateOfBirthUI.value;
    if(date === ''){
        dateOfBirthUI.classList = 'form-control is-invalid';
        document.getElementById('dob-feedback').innerText = 'আপনার জন্মতারিখ নির্ভুলভাবে দিন';
        return null;
    }else{
        dateOfBirthUI.classList = 'form-control is-valid';
        return date;
    }
}

const timeValidate = () => {
    let time = timeOfBirthUI.value;
    if(time === ''){
        timeOfBirthUI.classList = 'form-control is-invalid';
        document.getElementById('tob-feedback').innerText = 'আপনার জন্মসময় নির্ভুলভাবে দিন';
        return null;
    }else{
        timeOfBirthUI.classList = 'form-control is-valid';
        return time;
    }
}

const favColorValidate = () => {
    let favColor = favouriteColorUI.value;
    if(favColor === "none"){
        favouriteColorUI.classList = 'custom-select is-invalid';
        document.getElementById('select-feedback').innerText = 'আপনার পছন্দের রঙটি দিন';
        return null;
    }else{
        favouriteColorUI.classList = 'custom-select is-valid';
        return favColor;
    }
}

const validateAllInputs = () => {
    // Check for name
    name = nameValidate();

    // Check for date
    dob = dateValidate();

    // Check for time
    tob = timeValidate();

    // Check for favourite color
    favcolor = favColorValidate();

    if(name && dob && tob && favcolor){
        return {name, dob, tob, favcolor};
    }else{
        return null;
    }
}

// calculate button handler
const calculateBtnHandler = () => {
    let data = validateAllInputs();
    if(data){
        // load the loading
        inputSectionUI.style.display="none";
        loadingSectionUI.style.display="block";
        copyrightSectionUI.style.display="none";
        setTimeout(()=>{
            loadingSectionUI.style.display="none";
            resultSectionUI.style.display="block";
            copyrightSectionUI.style.display="block";
        },1000);
    }
}

// Calculate Again Handler
const calculateAgainHandler = () => {
    // remove result and show inputs
    resultSectionUI.style.display="none";
    inputSectionUI.style.display="block";
}

// Event listeners
userNameUI.addEventListener('input', nameValidate);
dateOfBirthUI.addEventListener('input', dateValidate);
timeOfBirthUI.addEventListener('input', timeValidate);
favouriteColorUI.addEventListener('input', favColorValidate);
calculateBtnUI.addEventListener('click', calculateBtnHandler);
calculateAgainBtnUI.addEventListener('click',calculateAgainHandler);


// handle date and time
// date1
// Wed Jul 15 2020 09:41:15 GMT+0530 (India Standard Time)
// let date = '23/02/2019';
// undefined
// date.split('/')
// (3) ["23", "02", "2019"]
// sep = date.split('/')
// (3) ["23", "02", "2019"]
// sep
// (3) ["23", "02", "2019"]
// date1.setDate(sep[0])
// 1595477475398
// date1.setMonth(+sep[1] -1)
// 1582431075398
// date1.setYear(sep[2])
// 1550895075398
// date1
// Sat Feb 23 2019 09:41:15 GMT+0530 (India Standard Time)
// let time = '13:50';
// undefined
// time
// "13:50"
// sep2 = time.split(':')
// (2) ["13", "50"]
// date1.setHours(sep2[0],sep2[1]);
// 1550910015398
// date1
// Sat Feb 23 2019 13:50:15 GMT+0530 (India Standard Time)
// date1
// Sat Feb 23 2019 13:50:15 GMT+0530 (India Standard Time)