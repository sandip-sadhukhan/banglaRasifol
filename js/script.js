// Rashifol.tk all rights reserved
// Author : Sandip Sadhukhan


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
const downloadPageBtnUI = document.getElementById('download-page');
// Result page
const resultPageUI = document.getElementById('result-div');
const mainResultContent = document.getElementById('main-result-content');


// Functions
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

// Date of birth validation
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

// time of birth validation
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

// favourite color validation
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

// Validation of all inputs
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

// Luck from first english letter [small caps]
const luckFromFirstLetter = (name, birthdate, birthmonth) => {
    let firstCh = name[0].toLowerCase();
    let luckString = luckFromFirstLettersDict[firstCh] + '\n' + luckFromBirthMonth(+birthdate, +birthmonth);
    // create a paragraph
    let paragraph = document.createElement("p");
    paragraph.innerText = luckString;
    paragraph.classList = "card-text text-dark text-justify";
    mainResultContent.appendChild(paragraph);
}

// calculate lucky years from birthdate
const luckyYearsFromBirthdate = (date) => {
    let luckIndex = (date%9) - 1;
    if (luckIndex === -1){
        luckIndex = 8;
    }
    let luckyYears = luckFromBirthDateList[luckIndex];
    let luckyYearsString = '<i class="fa fa-arrow-circle-right"></i><b> আপনার জীবনের গুরুরত্বপূর্ণ বছরগুলি হলো - </b>' + luckyYears.join(', ');
    let paragraph = document.createElement("p");
    paragraph.innerHTML = luckyYearsString;
    paragraph.classList = "card-text text-dark text-justify";
    mainResultContent.appendChild(paragraph);
}

// Calculate job from bithdate
const findJobFromBirthday = (sep) => {
    let value = sep[0] + sep[1] + sep[2];
    let sum = 0;
    while(value){
        sum += value%10;
        value = Math.floor(value/10);
        if(value === 0 && sum>9){
            value = sum;
            sum = 0;
        }
    }
    let laboursInformation = "<i class='fa fa-arrow-circle-right'></i><b> আপনার চাকরি বা ব্যাবসায়ী ভাগ্য : </b>" + labourNumberToJobDict[sum];
    let paragraph = document.createElement("p");
    paragraph.innerHTML = laboursInformation;
    paragraph.classList = "card-text text-dark text-justify";
    mainResultContent.appendChild(paragraph);
}


// Find Luck from color
const findLuckFromColor = (color) => {
    let luckString ="<i class='fa fa-arrow-circle-right'></i><b> পছন্দের রঙ অনুযায়ী আপনার মন : </b>" + luckFromColorDict[color];
    let paragraph = document.createElement("p");
    paragraph.innerHTML = luckString;
    paragraph.classList = "card-text text-dark text-justify";
    mainResultContent.appendChild(paragraph);
}

// Find lucky number from name
const findLuckyNumberFromName = (name) => {
    let value = 0;
    for(let i=0;i<name.length;i++){
        let ch = name.charAt(i).toLowerCase();
        if(ch>="a" && ch<="z")
            value += luckyNumberFromNameDict[ch];
    }
    let sum = 0;
    while(value){
        sum += value%10;
        value = Math.floor(value/10);
        if(value === 0 && sum>9){
            value = sum;
            sum = 0;
        }
    }
    let luckyNumber = englishToBangaliNumber(sum.toString())
    let luckyNumberInfo = "<i class='fa fa-arrow-circle-right'></i><b> আপনার লাকি নম্বর : </b>" + luckyNumber;
    let paragraph = document.createElement("p");
    paragraph.innerHTML = luckyNumberInfo;
    paragraph.classList = "card-text text-dark text-justify";
    mainResultContent.appendChild(paragraph);

    // luck from lucky number
    LuckFromLuckyNumber(sum);
}


// luck from lucky number
const LuckFromLuckyNumber = (luckyNumber) => {
    let luckyNumberInfo = "<i class='fa fa-arrow-circle-right'></i><b> লাকি নম্বর থেকে ভাগ্য বিচার : </b>" + LuckFromLuckyNumberDict[luckyNumber];
    let paragraph = document.createElement("p");
    paragraph.innerHTML = luckyNumberInfo;
    paragraph.classList = "card-text text-dark text-justify";
    mainResultContent.appendChild(paragraph);
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
        // Show Result
        // print name and other birth info on top of the result [header]
        document.getElementById('result-name').innerText = data['name'].toUpperCase();
        // birthday seperation
        let sep = data['dob'].split('-'); // yyyy-mm-dd
        let birthdayDate = new Date();
        birthdayDate.setDate(sep[2]);
        birthdayDate.setMonth(+sep[1] -1);
        birthdayDate.setFullYear(sep[0]);
        document.getElementById('result-birthinfo').innerText = englishToBangaliNumber(birthdayDate.toLocaleDateString()) + " " + englishToBangaliNumber(data['tob']);
        document.getElementById('result-birthday').innerText = dayToBanglaDayList[birthdayDate.getDay()];
        
        // main results
        // clear previous result
        mainResultContent.innerHTML = '';

        // find lucky number from name
        findLuckyNumberFromName(data['name']);
        // find lucky years from birthdate
        luckyYearsFromBirthdate(birthdayDate.getDate());
        // find job/buisness form bithday
        findJobFromBirthday(sep);
        // find luck from color
        findLuckFromColor(data['favcolor']);
        // find luck from first letters
        luckFromFirstLetter(data['name'], sep[2], sep[1]);
    }
}



// Calculate Again Handler
const calculateAgainHandler = () => {
    // remove result and show inputs
    resultSectionUI.style.display="none";
    inputSectionUI.style.display="block";
}

// Download page handler
const downloadPageHandler = () => {
    html2pdf()
        .set({ html2canvas: { scale: 4 } })
        .from(resultPageUI)
        .save();
}

// Event listeners
userNameUI.addEventListener('input', nameValidate);
dateOfBirthUI.addEventListener('input', dateValidate);
timeOfBirthUI.addEventListener('input', timeValidate);
favouriteColorUI.addEventListener('input', favColorValidate);
calculateBtnUI.addEventListener('click', calculateBtnHandler);
calculateAgainBtnUI.addEventListener('click',calculateAgainHandler);
downloadPageBtnUI.addEventListener('click', downloadPageHandler);

