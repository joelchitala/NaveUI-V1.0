export const Row = (domElements = [], style) =>{
    const doc = document.createElement('div');

    style = style ? style : "";

    doc.style = `
        display: flex;
        flex-direction: row;
        ${style}
    `;

    for (let i = 0; i < domElements.length; i++) {
        const domElement = domElements[i];
        doc.appendChild(domElement);
    }

    return doc;
}

export const Col = (domElements = [],style) =>{
    const doc = document.createElement('div');

    style = style ? style : "";

    doc.style = `
        display: flex;
        flex-direction: column;
        ${style}
    `;

    for (let i = 0; i < domElements.length; i++) {
        const domElement = domElements[i];
        doc.appendChild(domElement);
    }

    return doc;
}

export class WidgetSelection {
    constructor(label, widget) {

        if(!widget){
            throw new Error(`Widget can not be ${widget}`);
        }

        this.data = {
            "label":label,
            "widget":widget,
        }
    }

    getData = () => this.data;

    getLabel = () => this.data.label;

    getWidget = () => this.data.widget;
}

export class WidgetSelector {
    constructor(widgetSelections = [], domElement, onclick = (e,selection) =>{}) {
        this.data = {
            "widgetSelections":widgetSelections,
            "domElement":domElement,
            "onclick":onclick,
        }
    }

    build(){
        const widgetSelections = this.data.widgetSelections;
        const domElement = this.data.domElement;
        const onclick = this.data.onclick;

        const selectionBtns = [];

        for (let i = 0; i < widgetSelections.length; i++) {
            const selection = widgetSelections[i];
            const label = widgetSelections[i].getLabel();

            let btn;
            if(domElement){
                btn = domElement.cloneNode(true);
            }else{
                btn = document.createElement('button');

                if(label){
                    btn.innerHTML = label;
                }
            }

            btn.onclick = (e) =>{
                onclick(e,selection);
            }

            if(i == 0){
                onclick(null,selection);
            }

            selectionBtns.push(btn);
        }


        return selectionBtns;
    }
}