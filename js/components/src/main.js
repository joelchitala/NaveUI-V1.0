import { Frame } from "./frame.js";
import {navigatorPush} from "./ui_helpers.js";

export const runApp = (domElement,widget) =>{
    const frame = new Frame();

    if(!domElement){
        throw new Error("Dom element to mount is required");
    }

    frame.setParentElement(domElement);
    navigatorPush(widget)
}