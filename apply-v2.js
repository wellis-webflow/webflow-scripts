function AddRecordId() {
  let urlParams = new URLSearchParams(window.location.search);
  let identifierValue = urlParams.get('identifier');
  if (identifierValue) {
    let continueButton = document.getElementById('continueButton');
    if (continueButton) {
      let buttonUrl = new URL(continueButton.href);
      console.log('buttonUrl', buttonUrl);
      buttonUrl.searchParams.set(`${encodeURIComponent('extra_fields[identifier]') + '='}`, identifierValue);
      console.log('buttonUrlNew', buttonUrl);
      continueButton.href = buttonUrl.toString();
      console.log('continueButton', continueButton.href);
    }
  }
}
