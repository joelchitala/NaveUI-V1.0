
export class WidgetContextEntry {
    constructor(widgetId,contextId,widget) {
        this.data = {
            "widgetId":widgetId,
            "contextId":contextId,
            "widget":widget,
        }
    }

    getWidgetId = () => this.data.widgetId;

    getContextId = () => this.data.contextId;

    getWidget = () => this.data.widget;
}

export class Context {
    constructor() {

        this.data = {
            "widgetContextEntries":[]
        };
        
        if(!Context.instance){
            Context.instance = this;
        }

        return Context.instance;
    }

    addWidgetContextEntries(widgetContextEntry){
        this.data.widgetContextEntries.push(widgetContextEntry)
    }

    removeWidgetContextEntry(widgetId,contextId){
        let widgetContextEntries = this.data.widgetContextEntries;

        for (let i = 0; i < widgetContextEntries.length; i++) {
            const widgetContextEntry = widgetContextEntries[i];

            const widget = widgetContextEntry.getWidget();
            const isWidgetIdMatch = widgetContextEntry.getWidgetId() == widgetId;
            const isContextIdMatch = widgetContextEntry.getContextId() == contextId;

            if(isWidgetIdMatch && isContextIdMatch){
                widget.destroy();
                this.data.widgetContextEntries.splice(i,1);
            }
        }
    }

    getWidgetContextEntry(widgetId,contextId){

    }
}