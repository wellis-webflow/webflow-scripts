let continueButton = document.getElementById('continueButton');
console.log('btn', continueButton);
if (continueButton) {
  const originalURL = window.location.href;
  let buttonUrl = new URL(continueButton.href);
  const checkoutURL = getRootURL(buttonUrl);

  let searchParams = readOriginalURL(originalURL);
  console.log('searchParams', searchParams);
  let checkoutParams = readOriginalURL(buttonUrl);
  console.log('checkoutParams', checkoutParams);
  if (searchParams['identifier']) {
    let identifier = searchParams['identifier'];
    checkoutParams["extra_fields[record_id]"] = identifier;
    console.log('new checkoutParams', checkoutParams);
    const readyURL = createNewURL(checkoutURL, checkoutParams);
    console.log('readyURL', readyURL);
    continueButton.href = readyURL;
    console.log('continueButton.href', continueButton.href);
  }
}


function getRootURL(originalURL) {
  let url = new URL(originalURL);
  return url.origin + url.pathname;
}

function readOriginalURL(originalURL) {
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