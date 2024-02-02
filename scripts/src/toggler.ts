interface ITogglerParams {
    dataAttribute: string;
    activeClass: string;
}

interface ITogglerSequence {
    togglers: Element[];
    target: Element;
}

interface ITogglerService extends ITogglerParams{
    currentActive: Element | null;
    elementsSequences: {
        [key: string]: ITogglerSequence;
    };
}

class TogglerService implements ITogglerService {
    dataAttribute: string;
    activeClass: string;
    currentActive: Element | null = null;
    elementsSequences: {
        [key: string]: ITogglerSequence;
    } = {};

    constructor(params: ITogglerParams) {
        this.dataAttribute = params.dataAttribute;
        this.activeClass = params.activeClass;

        this.defineElementsSequnces();
        this.initEvents();
    }

    private defineElementsSequnces(): void {
        document
            .querySelectorAll(`[${this.dataAttribute}]`)
            .forEach((toggler) => {
                const targetId = toggler.getAttribute(this.dataAttribute);
                const target = document.querySelector(targetId);
                if (!target) {
                    return;
                }
                if (!this.elementsSequences[targetId]) {
                    this.elementsSequences[targetId] = {
                        togglers: [toggler],
                        target: target,
                    };
                } else {
                    this.elementsSequences[targetId].togglers.push(toggler);
                }
            });
    }

    private initEvents(): void {
        for (const key in this.elementsSequences) {
            const sequence = this.elementsSequences[key];
            sequence.togglers.forEach((toggler) => {
                toggler.addEventListener("click", () => {
                    this.toggleActive(sequence.target);
                });
            });
            sequence.target.addEventListener("click", (e) => {
                if (e.target === sequence.target) {
                    this.toggleActive(sequence.target);
                }
            });
        }
    }

    private toggleActive(target: Element): void {
        target.classList.toggle(this.activeClass);
        if (this.currentActive) {
            this.currentActive.classList.remove(this.activeClass);
        }
        if (this.currentActive === target) {
            this.currentActive = null;
        } else {
            this.currentActive = target;
        }
    }
}

export default TogglerService;
