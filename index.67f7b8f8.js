!function(){var t;function e(){"dark"==i()?document.body.classList.add("active"):document.body.classList.remove("active")}function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light";window.localStorage.setItem("theme",t),e()}function i(){return window.localStorage.getItem("theme")}window.document.querySelector(".switcher-input").addEventListener("change",(function(){n("dark"==i()?"light":"dark")})),n(null==(t=i())||null==t||"string"!=typeof t?"light":"dark"==t?"dark":"light")}();
//# sourceMappingURL=index.67f7b8f8.js.map