interface IHintParams {
    dataHintOn: string;
    dataHintTitle: string;
    activeClass: string;
}

interface IHintSequence {
    hintTitle: string;
    hintTrigger: Element;
    hintElement: Element;
}

interface IHintsService extends IHintParams {
    hints: {
        click: IHintSequence[];
        hover: IHintSequence[];
    };
    currentHint: Element | null;
}

class HintsService implements IHintsService {
    dataHintOn: string;
    dataHintTitle: string;
    activeClass: string;
    currentHint: Element | null = null;
    hints: {
        click: IHintSequence[];
        hover: IHintSequence[];
    } = {
        click: [],
        hover: [],
    };
    constructor(params: IHintParams) {
        this.dataHintOn = params.dataHintOn;
        this.dataHintTitle = params.dataHintTitle;
        this.activeClass = params.activeClass;

        this.defineHints();
        this.bindEvents();
        console.log(this);
    }

    private bindEvents(): void {
        this.hints.click.forEach((hint) => {
            this.onClickHint(hint);
        });
        this.hints.hover.forEach((hint) => {
            this.onHoverHint(hint);
        });
    }

    private onHoverHint(hint: IHintSequence): void {
        hint.hintTrigger.addEventListener("mouseenter", () => {
            this.showHint(hint);
        });
        hint.hintTrigger.addEventListener("mouseleave", () => {
            this.hideHint();
        });
    }

    private onClickHint(hint: IHintSequence): void {
        hint.hintTrigger.addEventListener("click", () => {
            this.showHint(hint);
        });
    }

    private showHint(hint: IHintSequence): void {
        this.hideHint();
        this.currentHint = hint.hintElement;
        this.currentHint.classList.add(this.activeClass);
    }

    private hideHint(): void {
        if (this.currentHint) {
            this.currentHint.classList.remove(this.activeClass);
        }
    }

    private defineHints(): void {
        document
            .querySelectorAll(`[${this.dataHintOn}]`)
            .forEach((hintItem: Element) => {
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
                this.hints[hintType as "click" | "hover"].push(
                    sequence as IHintSequence
                );
            });
    }
}

export default HintsService;
