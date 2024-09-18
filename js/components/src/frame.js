import { generateUUID } from "../shared/component_utilities.js";
import { EventManager } from "./event_manager.js";

export class Frame {
    constructor() {
        this.data = {
            "id":generateUUID(),
            "eventManager": new EventManager(),
            "template":null,
            "parentElement":null,
            "widgets":[],
            "intents":{}
        }

        if(!Frame.instance){
            Frame.instance = this;
        }

        return Frame.instance;
    }

    setParentElement(parentElement){
        this.data.parentElement = parentElement;
    }

    getParentElement = () => this.data.parentElement

    setTemplate = (template = (self,body)=>{}) => this.data.template = template;

    getTemplate = () => this.data.template;

    getCurrentWidget(){
        const widgets = this.data.widgets;
        return widgets[widgets.length-1];
    }

    getWidgets = () => this.data.widgets;

    getEventManager = () => this.data.eventManager;

    pushWidget(widget){
        this.data.widgets.push(widget);

        return this.data.widgets;
    }

    popWidget(){
        if(this.data.widgets.length < 2){
            return;
        }
        return this.data.widgets.pop();
    }

    registerEventProxy(name = "" , commandType ,func = (command,payload)=>{}){
        this.data.eventManager.registerProxy(name,commandType,func);
    }

    deRegisterEventProxy(name = ""){
        this.data.eventManager.deRegisterProxy(name);
    }

    getIntent(name){
        return this.data.intents[name];
    }

    addIntent(intent){
        if(!intent){
            return;
        }
        this.data.intents[intent.getName()] = intent;
    }

    removeIntent(name){
        const intent = this.data.intents[name];

        if(intent){
            delete this.data.intents[name];
        }

        return intent;
    }

    clearIntents(){
        this.data.intents = {};

        return this.data.intents;
    }

    destroy(){
        const onDestroy = this.data.onDestroy;

        if(!onDestroy){
            return;
        }

        const parentElement = this.data.parentElement;

        if(!parentElement){
            throw new Error("Parent Element Required");
        }
        
        onDestroy(self);

        const widgets = this.data.widgets;
        let widget = widgets[widgets.length-1];

        if(!widget){
            return;
        }

        try {
            parentElement.removeChild(widget.getBody())
        } catch (error) {
            console.error(error);
        }
    } 

    build(){
        const parentElement = this.data.parentElement;

        if(!parentElement){
            throw new Error("Parent Element Required");
        }

        const widgets = this.data.widgets;
        let widget = widgets[widgets.length-1];

        
        if(!widget){
            return;
        }

        const initialLength = widgets.length

        let widgetBuild = widget.build();

        if(widgets.length != initialLength){
            widget = widgets[widgets.length-1];
            widgetBuild = widget.getBody();
        }
        

        parentElement.innerHTML = "";
        parentElement.appendChild(widgetBuild);
    }
}