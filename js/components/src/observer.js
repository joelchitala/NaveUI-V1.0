// Create an observer instance

import { Context } from "./context.js";

const context = new Context();

export const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {

            for (let i = 0; i < mutation.removedNodes.length; i++) {
                const node = mutation.removedNodes[i];
                
                const attr = node.attributes;

                if(!attr){
                    continue
                }

                let widget_id = attr["data-widget_id"];
                let context_id = attr["data-context_id"];

                if(!widget_id || !context_id){
                    continue;
                }

                widget_id = widget_id.value;
                context_id = context_id.value;

                context.removeWidgetContextEntry(widget_id,context_id)
            }
        }
    }
});

