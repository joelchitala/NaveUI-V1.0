import { Frame } from "./frame.js";
import { Intent } from "./intent.js";

export const navigatorPush = (widget, intent) =>{
    const frame = new Frame();
    frame.pushWidget(widget);
    frame.addIntent(intent);
    frame.build();
}

export const navigatorPop = (widget) =>{
    const frame = new Frame();
    frame.popWidget();
    frame.build();
}

export const getIntent = (name) =>{
    const frame = new Frame();

    return frame.getIntent(name);
}

export const createIntent = (name,payload) =>{
    return new Intent(name,payload);
}