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
  DarkReader.setFetchMethod(window.fetch)
  DarkReader.enable();
  localStorage.setItem('dark-mode', 'true');
  document.getElementById("checkbox").checked = true; // display the moon icon
}

// switch to light mode
function disable() {
  console.log("disable dark mode");
  DarkReader.disable();
  localStorage.setItem('dark-mode', 'false');
  document.getElementById("checkbox").checked = false; // display the sun icon
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