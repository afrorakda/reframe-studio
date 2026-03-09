(function(){

"use strict";

function getToolsForZone(zone){

if(!zone) return [];

var map = {

"Next Step Finder":[
"next-step-finder.html",
"problem-to-options.html",
"constraint-to-action.html"
],

"Tool Factory":[
"idea-to-tool-spec.html",
"tool-generator-v3.html",
"tool-factory-pro.html"
],

"Constraint → Action":[
"constraint-to-action.html",
"problem-to-constraints.html"
],

"Problem → Root Cause":[
"problem-to-root-cause.html",
"problem-to-constraints.html"
],

"Problem → Options":[
"problem-to-options.html",
"next-step-finder.html"
]

};

return map[zone] || [];

}

function navigate(input){

if(!window.REFRAME_MUTATION_LOOP) return null;

var loop = window.REFRAME_MUTATION_LOOP.runLoop(input,{
mode:"stable",
steps:3,
limit:3
});

var path = window.REFRAME_MUTATION_LOOP.getLoopPath(loop);

if(!path.length) return null;

var zone = path[path.length-1].zoneTitle;

return {
zone:zone,
tools:getToolsForZone(zone),
path:path
};

}

window.REFRAME_NAVIGATOR = {
navigate:navigate
};

})();
