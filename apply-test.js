(function AddRecordIdToUrl() {
  let urlParams = new URLSearchParams(window.location.search);
  console.log('url', urlParams);
  let identifierValue = urlParams.get('identifier');
  console.log('identifierValue', identifierValue);

  if (identifierValue) {
    let continueButton = document.getElementById('continueButton');
    console.log('continueButton', continueButton);

    if (continueButton) {
      let buttonUrl = new URL(continueButton.href);
      buttonUrl.searchParams.set('extra_fields[record_id]', identifierValue);
      console.log(buttonUrl);
      continueButton.href = buttonUrl.toString();
    }
  }
})();
