import { runApp } from "./naveui-v1.0/js/components/src/main.js";
import { createIntent, getIntent, navigatorPop, navigatorPush } from "./naveui-v1.0/js/components/src/ui_helpers.js";
import { Widget } from "./naveui-v1.0/js/components/src/widget.js";
import { Col, Row, WidgetSelection, WidgetSelector } from "./naveui-v1.0/js/custom/custom_components.js";

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
},(self,body)=>{
    console.log(body);
});

const widget_2 = new Widget((self,body)=>{
    body.innerHTML = `<h1>Widget 2</h1>`;
},(self,body)=>{
    console.log(body);
});

const widget_3 = new Widget((self,body)=>{
    body.innerHTML = `<h1>Widget 3</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = "Pop"

    btn.onclick = (e) =>{
        navigatorPop()
    }

    body.appendChild(btn);

    const msg = getIntent("msg");

    if(msg){
        console.log(msg["data"]);
    }
    
});

runApp(main, mainWidget)