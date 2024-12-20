function updateContinueBtnUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const identifier = urlParams.get('identifier');

  const continueButton = document.getElementById('continueButton');
  if (!continueButton || !identifier) {
    console.warn('Button not found or "identifier" parameter is missing.');
    return;
  }

  try {
    const buttonUrl = new URL(continueButton.href);
    if (!buttonUrl.searchParams.has('extra_fields[record_id]')) {
      buttonUrl.searchParams.set('extra_fields[record_id]', identifier);
      console.log('Updated URL:', buttonUrl.toString());
      continueButton.href = buttonUrl.toString();
    }
  } catch (e) {
    console.error('Error processing the button URL:', e);
  }
}