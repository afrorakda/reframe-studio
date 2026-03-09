(function () {
"use strict";

function estimateFieldState(text){

text = (text || "").toLowerCase();

var state = {
friction:{
ambiguity:0.5,
decision:0.5,
emotional:0.5,
momentum:0.5
},
mutation:{
expand:0.5,
decompose:0.5,
sequence:0.5,
convert:0.5,
externalize:0.5,
contrast:0.5
},
expression:{
structure:0.5,
list:0.5,
statement:0.5,
action:0.5,
seed:0.5
}
};

if(text.includes("idea") || text.includes("アイデア")){
state.mutation.expand +=0.3;
state.expression.seed +=0.2;
}

if(text.includes("tool") || text.includes("ツール")){
state.mutation.convert +=0.3;
state.expression.structure +=0.2;
}

if(text.includes("problem") || text.includes("問題")){
state.mutation.decompose +=0.3;
state.expression.list +=0.2;
}

if(text.includes("feel") || text.includes("emotion") || text.includes("感情")){
state.mutation.externalize +=0.3;
state.expression.statement +=0.2;
}

return state;

}

window.REFRAME_ROUTER_V2 = {
estimateFieldState:estimateFieldState
};

})();
