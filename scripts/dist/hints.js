class HintsService {
    constructor(params) {
        this.currentHint = null;
        this.hints = {
            click: [],
            hover: [],
        };
        this.dataHintOn = params.dataHintOn;
        this.dataHintTitle = params.dataHintTitle;
        this.activeClass = params.activeClass;
        this.defineHints();
        this.bindEvents();
    }
    bindEvents() {
        this.hints.click.forEach((hint) => {
            this.onClickHint(hint);
        });
        this.hints.hover.forEach((hint) => {
            this.onHoverHint(hint);
        });
    }
    onHoverHint(hint) {
        hint.hintTrigger.addEventListener("mouseenter", () => {
            this.showHint(hint);
        });
        hint.hintTrigger.addEventListener("mouseleave", () => {
            this.hideHint();
        });
    }
    onClickHint(hint) {
        hint.hintTrigger.addEventListener("click", () => {
            this.showHint(hint);
        });
    }
    showHint(hint) {
        this.hideHint();
        this.currentHint = hint.hintElement;
        this.currentHint.classList.add(this.activeClass);
    }
    hideHint() {
        if (this.currentHint) {
            this.currentHint.classList.remove(this.activeClass);
        }
    }
    defineHints() {
        document
            .querySelectorAll(`[${this.dataHintOn}]`)
            .forEach((hintItem) => {
            const hintType = hintItem.getAttribute(this.dataHintOn);
            const hintTitle = hintItem.getAttribute(this.dataHintTitle);
            const hintElement = document.createElement("span");
            hintElement.classList.add("hint-element");
            hintElement.innerHTML = hintTitle;
            hintItem.appendChild(hintElement);
            const sequence = {
                hintTitle: hintTitle,
                hintTrigger: hintItem,
                hintElement: hintElement,
            };
            this.hints[hintType].push(sequence);
        });
    }
}
export default HintsService;
