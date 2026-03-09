(function () {
"use strict";

var gravityMap = {

idea: [
"idea-to-tool-spec",
"tool-generator-v3",
"tool-factory"
],

problem: [
"problem-to-root-cause",
"problem-to-constraints",
"problem-to-options"
],

emotion: [
"emotion-to-action",
"next-step-finder"
],

tool: [
"tool-generator-v3",
"tool-factory",
"tool-factory-pro"
]

};

function detectGravity(tags){

if(!tags || !tags.length) return [];

var pulls = [];

tags.forEach(function(tag){

var zones = gravityMap[tag];

if(!zones) return;

zones.forEach(function(z){

pulls.push(z);

});

});

return pulls;

}

function applyGravity(rankedZones, outputState){

if(!rankedZones) return rankedZones;

var tags = outputState?.tags || [];

var pulls = detectGravity(tags);

if(!pulls.length) return rankedZones;

var adjusted = rankedZones.map(function(zone){

var z = Object.assign({}, zone);

if(pulls.includes(z.id)){

z.score = z.score * 1.6;

}

return z;

});

adjusted.sort(function(a,b){

return b.score - a.score;

});

return adjusted;

}

window.REFRAME_GRAVITY_ENGINE = {

apply: applyGravity

};

})();
