url=window.location.href;
var reg = new RegExp("^https://www.google.");

//googleの検索結果ならば
if(reg.test(url)){
    var searchWord = document.querySelectorAll('#lst-ib') [0].value;
    var settings=[];
    browser.storage.sync.get(["settings"], function (value) {
        settings = value.settings;
        for(let i of settings){
            tittle=i.tittle;
            fUrl= i.fUrl;
            sUrl= i.sUrl;
            window.onload = showLink(tittle, fUrl + encodeURIComponent(searchWord) + sUrl);
        }
    });
}

//リンクを表示
function showLink(title, url) {
    var parent_object = document.querySelectorAll('._dMq') [0];
    var manuitem = parent_object.children[0];
    var element = document.createElement('a');
    
    element.setAttribute('class', manuitem.getAttribute('class'));
    element.setAttribute('role', manuitem.getAttribute('role'));
    element.setAttribute('tabindex', manuitem.getAttribute('tabindex'));
    element.setAttribute('jsaction', manuitem.getAttribute('jsaction'));
    element.setAttribute('data-rtid', manuitem.getAttribute('data-rtid'));
    element.setAttribute('jsl', manuitem.getAttribute('jsl'));
    element.setAttribute('href', url);
    element.innerHTML = title;
    parent_object.appendChild(element);//追加
}