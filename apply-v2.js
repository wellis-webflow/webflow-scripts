function initializeCheckoutUrlModification() {
  const continueButton = document.getElementById('continueButton');
  if (!continueButton) {
    console.warn('Button with id="continueButton" not found. Cannot proceed with URL updates.');
    return;
  }

  // Get the current page URL
  const originalURL = window.location.href;
  const searchParams = readOriginalURL(originalURL);

  // Check if 'identifier' is present in the URL parameters
  const identifier = searchParams['identifier'];
  if (!identifier) {
    console.log('No "identifier" parameter found, no URL update required.');
    return;
  }

  // Update the URL with the identifier
  makeNewCheckoutUrl(continueButton, identifier);

  // Initialize a MutationObserver to watch for changes to the href attribute,
  // re-apply updates if needed.
  mutationHref(continueButton, identifier);
}

function makeNewCheckoutUrl(continueButton, identifier) {
  if (!continueButton || !identifier) return;

  let buttonUrl;
  try {
    buttonUrl = new URL(continueButton.href);
  } catch (e) {
    console.error('Invalid URL in the button\'s href:', e);
    return;
  }

  const checkoutURL = getRootURL(buttonUrl.toString());

  // Check if 'record_id' param is already present
  if (!buttonUrl.searchParams.has('extra_fields[record_id]')) {
    const checkoutParams = readOriginalURL(buttonUrl.toString());
    checkoutParams["extra_fields[record_id]"] = identifier;
    const updatedURL = createNewURL(checkoutURL, checkoutParams);
    console.log('Updating the button URL:', updatedURL);
    continueButton.href = updatedURL;
  } else {
    console.log('"extra_fields[record_id]" is already present, no update needed.');
  }
}

function mutationHref(continueButton, identifier) {
  if (!continueButton || !identifier) return;

  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
        console.log('Detected href mutation:', continueButton.getAttribute('href'));
        // Attempt to re-apply the URL update if needed
        makeNewCheckoutUrl(continueButton, identifier);
      }
    }
  });

  observer.observe(continueButton, {
    attributes: true,
    attributeFilter: ['href']
  });
}

function getRootURL(originalURL) {
  const url = new URL(originalURL);
  return url.origin + url.pathname;
}

function readOriginalURL(originalURL) {
  const url = new URL(originalURL);
  // Convert search params into a dictionary
  return Object.fromEntries(url.searchParams.entries());
}

function createNewURL(rootURL, searchParams) {
  const url = new URL(rootURL);
  for (const key in searchParams) {
    url.searchParams.set(key, searchParams[key]);
  }
  console.log('Final URL:', url.toString());
  return url.toString();
}
