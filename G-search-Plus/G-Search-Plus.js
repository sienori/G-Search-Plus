const startObserve = async () => {
  const currentUrl = window.location.href;
  const googleUrl = "https://www.google.";
  if (!currentUrl.startsWith(googleUrl)) return;

  const { settings } = await browser.storage.sync.get(["settings"]);

  const observer = new MutationObserver((records, observer) =>
    records.forEach(record => appendLinks(record.addedNodes[0], settings, observer))
  );
  observer.observe(document.querySelector("#lb"), { childList: true });
};
startObserve();

const appendLinks = async (container, settings, observer) => {
  const containsSearchOption = container.querySelector("a").href.includes("preferences");
  if (containsSearchOption) return;

  const menu = container.querySelector("g-menu");
  const searchWord = document.querySelector("input[type='text']").value;

  for (const { tittle, fUrl, sUrl } of settings) {
    const url = fUrl + encodeURIComponent(searchWord) + sUrl;
    appendLink(menu, tittle, url);
  }

  const clonedMenu = menu.cloneNode(true);
  container.replaceChild(clonedMenu, menu);
  observer.disconnect();

};

const appendLink = (menu, title, url) => {
  const menuItem = menu.querySelectorAll("g-menu-item")[1].cloneNode(true);

  const newLink = document.createElement("a");
  newLink.setAttribute("href", url);
  newLink.innerText = title;

  const oldLink = menuItem.querySelector("a");
  menuItem.querySelector("div").replaceChild(newLink, oldLink);
  menu.appendChild(menuItem);
};
