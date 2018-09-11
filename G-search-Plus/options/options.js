var table=document.getElementById("forms").getElementsByTagName("tbody")[0];
var form = document.getElementsByClassName("form");
var addButton=document.getElementById("addButton");

document.getElementById("tittleLabel").innerHTML = browser.i18n.getMessage("tittleLabel");
document.getElementById("fUrlLabel").innerHTML = browser.i18n.getMessage("fUrlLabel");
document.getElementById("keywordLabel").innerHTML = browser.i18n.getMessage("keywordLabel");
document.getElementById("sUrlLabel").innerHTML = browser.i18n.getMessage("sUrlLabel");
document.getElementsByClassName("saveButton")[0].value=browser.i18n.getMessage("saveButtonLabel");
document.getElementsByClassName("addButton")[0].src=browser.runtime.getURL("images/addButton.png");

browser.runtime.getURL

formHtml=`
<tr class="form">
    <td><input type="text" class="tittle"></td>
    <td><input type="text" class="fUrl"></td>
    <td class="keyword">+[Keyword]+</td>
    <td><input type="text" class="sUrl"></td>
    <td><button class="upwardButton">&#x2b06;</button></td>
    <td><button class="downwardButton">&#x2b07;</button></td>
    <td><input class="deleteButton" type="image" src="${browser.runtime.getURL("images/deleteButton.png")}"></td>
</tr>`;

document.addEventListener('click', function (e) {
    switch(e.target.className){
        case "deleteButton":
            deleteForm(e.target);
            break;
        case "addButton":
            addForm();
            break;
        case "saveButton":
            saveForm();
            break;
        case "upwardButton":
            upwardForm(e.target);
            break;
        case "downwardButton":
            downwardForm(e.target);
            break;
    }
});

function deleteForm(target){
    formNumber = document.getElementsByClassName("form").length;
    parentForm=target.parentElement.parentElement;
    if(formNumber>1){
        table.removeChild(parentForm);
    }else{
        input=parentForm.getElementsByTagName("input");
        for(let i of input){
            i.value="";
        }
    }
}

function addForm(){
    table.insertAdjacentHTML("beforeend", formHtml);
}

function saveForm(){
    var settings=[];
    var form = document.getElementsByClassName("form");
    for(let i of form){
        let set= new Object();
        set.tittle=i.getElementsByClassName("tittle")[0].value;
        set.fUrl=i.getElementsByClassName("fUrl")[0].value;
        set.sUrl=i.getElementsByClassName("sUrl")[0].value;
        if(set.tittle!="" || set.fUrl!="" || set.sUrl!="") settings.push(set);
    }
    browser.storage.sync.set({
        'settings':settings
    });
}

function upwardForm(target) {
    const form = target.closest('.form');
    form.parentElement.insertBefore(form, form.previousElementSibling);
}

function downwardForm(target) {
    const form = target.closest('.form');
    form.parentElement.insertBefore(form, form.nextElementSibling.nextElementSibling);
}

setForm();
function setForm(){
    var settings=[];
    browser.storage.sync.get(["settings"], function (value) {
        if(value.settings.length == 0) addForm();//設定が無い時
        else{
            settings = value.settings;
            for(let i of settings){
                addForm();
                tittle=table.getElementsByClassName("tittle");
                tittle[tittle.length-1].value=i.tittle;
                fUrl=table.getElementsByClassName("fUrl");
                fUrl[fUrl.length-1].value=i.fUrl;
                sUrl=table.getElementsByClassName("sUrl");
                sUrl[sUrl.length-1].value=i.sUrl;
            }
        }
    });
}

