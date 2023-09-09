const updateMenu = async () => {
  const allFilterMenu = document.querySelector("g-menu a[href^='https://maps.google.com/maps']")?.closest("g-menu");
  if (!allFilterMenu) return;

  const { settings } = await browser.storage.sync.get(["settings"]);
  const searchWord = document.querySelector("textarea").value;

  for (const { tittle, fUrl, sUrl } of settings) {
    const url = fUrl + encodeURIComponent(searchWord) + sUrl;
    appendLink(allFilterMenu, tittle, url);
  }
};

const isGoogleUrl = window.location.href.startsWith("https://www.google.");
if (isGoogleUrl) {
  setTimeout(updateMenu, 1000);
}

const appendLink = (menu, title, url) => {
  const menuItem = menu.querySelectorAll("g-menu-item")[1].cloneNode(true);

  const newLink = document.createElement("a");
  newLink.setAttribute("href", url);
  newLink.innerText = title;

  const oldLink = menuItem.querySelector("a");
  menuItem.querySelector("div").replaceChild(newLink, oldLink);
  menu.appendChild(menuItem);
};