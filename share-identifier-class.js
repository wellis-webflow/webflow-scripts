const setIdentifierForClass = (btnClass) => {
  const urlParams = new URLSearchParams(window.location.search);
  const identifier = urlParams.get('identifier');

  if (!btnClass) {
    console.error('Button class not provided.');
    return;
  }

  const buttons = document.querySelectorAll(`.${btnClass}`);
  if (!buttons.length) {
    console.warn(`No buttons found with class: ${btnClass}`);
    return;
  }

  buttons.forEach((button) => {
    const baseHref = button.getAttribute('href') || '#';
    if (baseHref === '#') return;

    try {
      const url = new URL(baseHref, window.location.origin);
      if (identifier) {
        url.searchParams.set('identifier', identifier);
      }
      button.setAttribute('href', url.toString());
    } catch (error) {
      console.error('Invalid href value:', baseHref, error);
    }
  });
};
