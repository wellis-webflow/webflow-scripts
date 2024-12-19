let continueButton = document.getElementById('continueButton');
if (continueButton) {
  const originalURL = window.location.href;
  buttonUrl = new URL(continueButton.href);
  const checkoutURL = getRootURL(buttonUrl);

  let searchParams = readOriginalURL(originalURL);
  let checkoutParams = readOriginalURL(buttonUrl);
  let identifier;
  if (searchParams['identifier']) {
    identifier = searchParams['identifier'];
    checkoutParams["extra_fields[record_id]"] = identifier;
    const readyURL = createNewURL(checkoutURL, checkoutParams);
    continueButton.href = readyURL;
  }
}


function getRootURL(originalURL = window.location.href) {
  let url = new URL(originalURL);
  return url.origin + url.pathname;
}

function readOriginalURL(originalURL = window.location.href) {
  let url = new URL(originalURL);
  // get all search params as dict
  const searchParams = Object.fromEntries(url.searchParams.entries());
  return searchParams;
}

function createNewURL(rootURL, searchParams) {
  const url = new URL(rootURL);
  for (const key in searchParams) {
    url.searchParams.set(key, searchParams[key]);
  }
  console.log('result', url.toString())
  return url.toString();
}