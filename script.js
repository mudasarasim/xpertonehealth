// Load header
fetch('preloader.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('preloader').innerHTML = data;
  });

  fetch('topbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('topbar').innerHTML = data;
  });

  // Load header
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Load footer

fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });
