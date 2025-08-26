
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
      document.getElementById('ios-link').style.display = 'block';
  }