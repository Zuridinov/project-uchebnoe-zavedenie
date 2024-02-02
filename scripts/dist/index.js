import TogglerService from "./toggler.js";
import HintsService from "./hints.js";
document.addEventListener("DOMContentLoaded", () => {
  new TogglerService({
    dataAttribute: "data-toggle-for",
    activeClass: "active",
  });
  new HintsService({
    dataHintOn: "data-hint-on",
    dataHintTitle: "data-hint-title",
    activeClass: "active",
  });
});
