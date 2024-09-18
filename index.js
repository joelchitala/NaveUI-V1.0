import { runApp } from "./js/components/src/main.js";
import { createIntent, getIntent, navigatorPop, navigatorPush } from "./js/components/src/ui_helpers.js";
import { Widget } from "./js/components/src/widget.js";
import { Col, Row, WidgetSelection, WidgetSelector } from "./js/custom/custom_components.js";

const main = document.querySelector('main');


const mainWidget = new Widget((self,body)=>{
    body.appendChild(Row([widget_1.build(),widget_2.build()]))
});

const widget_1 = new Widget((self,body)=>{
    body.innerHTML = `<h1>Widget 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = "Go to widget 3"

    btn.onclick = (e) =>{
        navigatorPush(widget_3, createIntent("msg","Hello from widget 1"));
    }

    body.appendChild(btn);
});

const widget_2 = new Widget((self,body)=>{
    body.innerHTML = `<h1>Widget 2</h1>`;
});

const widget_3 = new Widget((self,body)=>{
    body.innerHTML = `<h1>Widget 3</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = "Pop"

    btn.onclick = (e) =>{
        navigatorPop()
    }

    body.appendChild(btn);


    // const window = Col();

    // const widgetSelector =  new WidgetSelector([
    //     new WidgetSelection("Widget 1",widget_1),
    //     new WidgetSelection("Widget 2",widget_2),
    // ], null, (e,selection)=>{
    //     const widget = selection.getWidget()
    //     window.innerHTML = "";
    //     window.appendChild(widget.build())
    // });

    // const selections = widgetSelector.build();

    // const tabs = Row(selections)
    
    // body.appendChild(tabs)
    // body.appendChild(window)

    const msg = getIntent("msg");

    if(msg){
        console.log(msg["data"]);
    }
    
});

runApp(main, mainWidget)