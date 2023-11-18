const inputCheckbox = window.document.querySelector('.switcher-input');

inputCheckbox.addEventListener('change', () => {
  let theme = getTheme();

  if (theme == 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

function changeBackground() {
  let theme = getTheme();

  if (theme == 'dark') {
    document.body.classList.add('active');
  } else {
    document.body.classList.remove('active');
  }
}

function checkTheme() {
  let theme = getTheme();
  if (theme == null || theme == undefined || typeof theme != 'string') {
    setTheme('light');
  } else {
    if (theme == 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
}

function setTheme(theme = 'light') {
  window.localStorage.setItem('theme', theme);
  changeBackground();
}

function getTheme() {
  return window.localStorage.getItem('theme');
}

checkTheme();
