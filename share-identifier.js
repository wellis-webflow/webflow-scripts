const setIdentifier = (btnID) => {
  const urlParams = new URLSearchParams(window.location.search);
  const identifier = urlParams.get('identifier');
  const button = document.getElementById(btnID);

  if (button) {
    const baseHref = button.getAttribute('href') || '#';
    if(baseHref === '#') return
    try {
      const url = new URL(baseHref, window.location.origin);
      if (identifier) {
        url.searchParams.set('identifier', identifier);
      }
      button.setAttribute('href', url.toString());
    } catch (error) {
      console.error('Invalid href value:', baseHref, error);
    }
  }
};
