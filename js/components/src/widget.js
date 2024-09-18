import { generateUUID } from "../shared/component_utilities.js";

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
        const body = this.data.body;
        const template = this.data.template;

        if(template){
            template(this,body);
        }

        return body;
    }
}