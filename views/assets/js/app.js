// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
// const todoRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// const todoRegex =/^[a-zA-Z\s]*$/;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('trip-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    // todo: 'text',
    DIGIT: 'digit',
    // transport: 'transport',
    ANY: 'any',
}

// user inputs elements
let placenameElem = mainForm.placename,
    citynameElem = mainForm.cityname,
    countrynameElem = mainForm.countryname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    BudgetElem = mainForm.Budget,
    todoElem = mainForm.todo,
    transportElem = mainForm.transport,
    StayElem = mainForm.Stay,
    BlogTitleElem=mainForm.BlogTitle,
    BlogDescriptionElem=mainForm.BlogDescription,
    eximg1Elem=mainForm.eximg1,
    eximg2Elem=mainForm.eximg2,
    eximg3Elem=mainForm.eximg3,
    contactElem=mainForm.contact;




// display elements
let nameDsp = document.getElementById('fullcityname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    transportDsp = document.getElementById('transport_dsp'),
    todoDsp = document.getElementById('todo_dsp'),
    BudgetDsp = document.getElementById('Budget_dsp'),
    // designationDsp = document.getElementById('designation_dsp'),
    StayDsp = document.getElementById('Stay_dsp'),
    eximg1Dsp = document.getElementById('eximg1_dsp'),
    eximg2Dsp = document.getElementById('eximg2_dsp'),
    eximg3Dsp = document.getElementById('eximg3_dsp'),
    BlogDescriptionDsp = document.getElementById('BlogDescription_dsp'),
    BlogTitleDsp = document.getElementById('BlogTitle_dsp'),
    // BlogsDsp = document.getElementById('Blogs_dsp'),
    contactDsp = document.getElementById('contact_dsp');
    // educationsDsp = document.getElementById('educations_dsp'),
    // experiencesDsp = document.getElementById('experiences_dsp');

// first value is for the attributes and second one passes the nodelists
// const fetchValues = (attrs, ...nodeLists) => {
//     let elemsAttrsCount = nodeLists.length;
//     let elemsDataCount = nodeLists[0].length;
//     let tempDataArr = [];

//     // first loop deals with the no of repeaters value
//     for(let i = 0; i < elemsDataCount; i++){
//         let dataObj = {}; // creating an empty object to fill the data
//         // second loop fetches the data for each repeaters value or attributes 
//         for(let j = 0; j < elemsAttrsCount; j++){
//             // setting the key name for the object and fill it with data
//             dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
//         }
//         tempDataArr.push(dataObj);
//     }

//     return tempDataArr;
// }

const getUserInputs = () => {

    // blog
    // let BlogTitleElem = document.querySelectorAll('.BlogTitle'),
    // BlogDescriptionElem = document.querySelectorAll('.BlogDescription');

     // experiences
    // let expTitleElem = document.querySelectorAll('.exp_title'),
    // expOrganizationElem = document.querySelectorAll('.exp_organization'),
    // expLocationElem = document.querySelectorAll('.exp_location'),
    // expStartDateElem = document.querySelectorAll('.exp_start_date'),
    // expEndDateElem = document.querySelectorAll('.exp_end_date'),
    // expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    // let eduSchoolElem = document.querySelectorAll('.edu_school'),
    // eduDegreeElem = document.querySelectorAll('.edu_degree'),
    // eduCityElem = document.querySelectorAll('.edu_city'),
    // eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    // eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    // eduDescriptionElem = document.querySelectorAll('.edu_description');

    // let eximg1Elem = document.querySelectorAll('.ex_img1'),
    // eximg2Elem = document.querySelectorAll('.ex_img2'),
    // eximg3Elem = document.querySelectorAll('.ex_img3');

    // let contactElem = document.querySelectorAll('.contact');

    // event listeners for form validation
    placenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Place Name'));
    citynameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City Name'));
    countrynameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Country Name'));
    transportElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Transport'));
    todoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'todo'));
    BudgetElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Budget'));
    StayElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Stay'));
    BlogTitleElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title'));
    BlogDescriptionElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description'));
    // eximg1Elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'eximg1'));
    // eximg2Elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'eximg2'));
    // eximg3Elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'eximg3'));
    contactElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Contact'));


    // BlogTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    // BlogDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    // expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    // expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    // expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    // expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    // expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    // expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    // eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    // eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    // eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    // eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    // eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    // eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    // eximg1Elem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    // eximg2Elem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    // eximg3Elem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    // contactElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'contact')));

    return {
        placename: placenameElem.value,
        cityname: citynameElem.value,
        countryname: countrynameElem.value,
        // designation: designationElem.value,
        Budget: BudgetElem.value,
        todo: todoElem.value,
        transport: transportElem.value,
        BlogTitle:BlogTitleElem.value,
        BlogDescription:BlogDescriptionElem.value,
        Stay: StayElem.value,
        // eximg1:eximg1Elem.value,
        // eximg2:eximg2Elem.value,
        // eximg3:eximg3Elem.value,
        // Blogs: fetchValues(['BlogTitle', 'BlogDescription'], BlogTitleElem, BlogDescriptionElem),
        // experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        // educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        // imgs: fetchValues(['ex_img1', 'ex_img2', 'ex_img3'], eximg1Elem, eximg2Elem, eximg3Elem),
        contact: contactElem.value,
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for todo
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
// const showListData = (listData, listContainer) => {
//     listContainer.innerHTML = "";
//     listData.forEach(listItem => {
//         let itemElem = document.createElement('div');
//         itemElem.classList.add('preview-item');
        
//         for(const key in listItem){
//             let subItemElem = document.createElement('span');
//             subItemElem.classList.add('preview-item-val');
//             subItemElem.innerHTML = `${listItem[key]}`;
//             itemElem.appendChild(subItemElem);
//         }

//         listContainer.appendChild(itemElem);
//     })
// }

const displaytrip = (userData) => {
    nameDsp.innerHTML = userData.placename + " " + userData.cityname + " " + userData.countryname;
    transportDsp.innerHTML = userData.transport;
    todoDsp.innerHTML = userData.todo;
    BudgetDsp.innerHTML = userData.Budget;
    BlogDescriptionDsp.innerHTML=userData.BlogDescription;
    BlogTitleDsp.innerHTML=userData.BlogTitle;
    contactDsp.innerHTML=userData.contact;

    // designationDsp.innerHTML = userData.designation;
    StayDsp.innerHTML = userData.Stay;
    // showListData(userData.imgs, imgsDsp);
    // showListData(userData.Blogs, BlogsDsp);
    // showListData(userData.contact, contactDsp);
    // showListData(userData.educations, educationsDsp);
    // showListData(userData.experiences, experiencesDsp);
}

// generate trip
const generatetrip = () => {
    let userData = getUserInputs();
    displaytrip(userData);
    console.log(userData);
}

function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
}
function previewImage1(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(eximg1Elem.files[0]);
    oFReader.onload = function(ofEvent){
        eximg1Dsp.src = ofEvent.target.result;
    }
}
function previewImage2(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(eximg2Elem.files[0]);
    oFReader.onload = function(ofEvent){
        eximg2Dsp.src = ofEvent.target.result;
    }
}
function previewImage3(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(eximg3Elem.files[0]);
    oFReader.onload = function(ofEvent){
        eximg3Dsp.src = ofEvent.target.result;
    }
}

// print trip
function printtrip(){
    window.print();
}