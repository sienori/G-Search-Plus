const url = window.location.href;
const reg = new RegExp("^https://www.google.");

if (reg.test(url)) {
    browser.storage.sync.get(["settings"], function (value) {
        const settings = value.settings;
        showLinks(settings);
    });
}

function showLinks(settings) {
    const moreContainer = document.getElementById('lb').children[0];

    if (moreContainer == undefined) {
        setTimeout(() => {
            showLinks(settings);
        }, 100);
        return;
    }

    const searchWord = document.getElementById('lst-ib').value;
    for (let i of settings) {
        const tittle = i.tittle;
        const url = i.fUrl + encodeURIComponent(searchWord) + i.sUrl;
        showLink(moreContainer, tittle, url);
    }
}

function showLink(moreContainer, title, url) {
    const manuItem = moreContainer.children[0];
    const element = document.createElement('a');

    const attributes = ['class', 'role', 'tabindex', 'jsaction', 'data-rtid', 'jsl'];
    for (let attribute of attributes) {
        element.setAttribute(attribute, manuItem.getAttribute(attribute));
    }
    element.setAttribute('href', url);
    element.innerText = title;

    moreContainer.appendChild(element);
}
