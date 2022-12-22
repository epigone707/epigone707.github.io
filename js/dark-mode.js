// onclick function of the dark mode checkbox
function toggle_mode_switch() {
  console.log("toggle_mode_switch");
  let enabled = localStorage.getItem('dark-mode')

  if (enabled === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enable();
    } else {
      disable();
    }
  } else if (enabled === 'true') {
    disable();
  } else {
    enable();
  }
}

// switch to dark mode
function enable() {
  console.log("enable dark mode");
  document.documentElement.setAttribute('data-theme', 'dark')
  localStorage.setItem('dark-mode', 'true');
  document.getElementById("checkbox").checked = true; // display the moon icon
  changeUtterancesTheme('github-dark');
}

// switch to light mode
function disable() {
  console.log("disable dark mode");
  document.documentElement.setAttribute('data-theme', 'light')
  localStorage.setItem('dark-mode', 'false');
  document.getElementById("checkbox").checked = false; // display the sun icon
  changeUtterancesTheme('github-light');
}


function checkmode() {
  console.log("check mode");
  let enabled = localStorage.getItem('dark-mode')
  if (enabled === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enable();
    } else {
      disable();
    }
  }
  else if (enabled == 'true') {
    enable();
  } else {
    disable();
  }
}

function changeUtterancesTheme(target_theme) {
  const iframe = document.querySelector('.utterances-frame');
  if (iframe) {
    console.log("changeUtterancesTheme");
    const message = {
      type: 'set-theme',
      theme: target_theme
    };
    iframe.contentWindow.postMessage(message, 'https://utteranc.es');

  }
}

function addUtterances() {
  console.log("add Utterances comment widget");

  let enabled = localStorage.getItem('dark-mode')
  let theme = 'github-light';
  if (enabled === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'github-dark';
    } else {
      theme = 'github-light';
    }
  }
  else if (enabled == 'true') {
    theme = 'github-dark';
  } else {
    theme = 'github-light';
  }
  // console.log("theme: " + theme);

  let s = document.createElement('script');
  s.src = 'https://utteranc.es/client.js';
  s.setAttribute('repo', "epigone707/epigone707.github.io");
  s.setAttribute('issue-term', 'pathname');
  s.setAttribute('theme', theme);
  s.setAttribute('crossorigin', 'anonymous');
  s.setAttribute('async', '');
  document.querySelector('#utterances-widget').appendChild(s);
}