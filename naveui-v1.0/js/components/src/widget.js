import { generateUUID } from "../shared/component_utilities.js";
import { Context, WidgetContextEntry } from "./context.js";

export class Widget {
    constructor(template = (self, body) => {}, onDestroy = (self,body) => {}) {
        this.data = {
            "id":generateUUID(),
            "body":document.createElement('div'),
            "template":template,
            "onDestroy":onDestroy,
        }

        this.data.body.setAttribute("data-widget_id",this.data.id);
    }

    getId = () => this.data.id;

    getBody = () => this.data.body;

    getTemplate = () => this.data.template;

    destroy(){
        const onDestroy = this.data.onDestroy;

        if(!onDestroy){
            return;
        }

        onDestroy(self,this.data.body);
    } 

    build(){
        const context = new Context();

        const body = this.data.body;
        const template = this.data.template;

        if(template){
            template(this,body);
        }

        const context_id = generateUUID();
        body.setAttribute("data-context_id",context_id);
        context.addWidgetContextEntries(new WidgetContextEntry(this.data.id,context_id,this));

        return body;
    }
}