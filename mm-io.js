/* MagicMirror²
 * Module: mm-io
 *
 * By Manuel Dierkes
 * MIT Licensed.
 */
Module.register("mm-io", {
  getStyles: function () {
    return ["mm-io-app.css"];
  },

  getTemplate: function () {
    return "mm-io-app.html";
  },

  getScripts: function () {
    return ["mm-io-app.js"];
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      window.document.dispatchEvent(
        new Event("DOM_LOADED_FOR_MMIO", {
          bubbles: true,
          cancelable: true
        })
      );
    }
  }
});
