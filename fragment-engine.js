(function () {

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function cleanLines(text){
  return String(text||"")
  .split("\n")
  .map(l=>l.trim())
  .filter(Boolean)
  .slice(0,20);
}

function safeReply(line){
  return String(line||"")
  .replace(/[“”"'`]/g,"")
  .trim();
}

function seed(line){
  const r=safeReply(line);
  return r||"bad reply";
}



const maybeFragments=[

"Maybe I said it too early.",
"Maybe I rushed it.",
"Maybe the idea needed one more step.",
"Maybe the thought was still forming.",
"Maybe I shared the rough version.",
"Maybe the point came too late.",
"Maybe I skipped a step.",
"Maybe I moved too fast.",
"Maybe the middle was missing.",
"Maybe I shared it too soon.",
"Maybe the shape was not there yet.",
"Maybe I dropped it too fast.",
"Maybe I jumped ahead.",
"Maybe the order was wrong.",
"Maybe the step was missing.",
"Maybe I skipped the setup.",
"Maybe the start was rough.",
"Maybe the path was not clear.",
"Maybe I rushed the ending.",
"Maybe I said the hard part first.",
"Maybe I pushed it out early.",
"Maybe it needed another pass.",
"Maybe the thought needed time.",
"Maybe the words came too fast.",
"Maybe the idea needed air.",
"Maybe the idea needed space.",
"Maybe the idea needed a pause.",
"Maybe the idea was still moving.",
"Maybe the idea was not ready yet.",
"Maybe the thought came too soon."

];



const someFragments=[

"Some ideas need one more step.",
"Some thoughts take longer.",
"Some ideas grow slow.",
"Some ideas start rough.",
"Some thoughts come out early.",
"Some ideas need more time.",
"Some ideas need clearer words.",
"Some ideas need a second look.",
"Some thoughts start messy.",
"Some ideas come out sideways.",
"Some ideas arrive early.",
"Some thoughts take shape slowly.",
"Some ideas need more room.",
"Some ideas come before the words.",
"Some ideas need a second step.",
"Some ideas need a pause.",
"Some ideas land later.",
"Some ideas change on the way.",
"Some ideas start unclear.",
"Some ideas take a while.",
"Some thoughts grow slowly.",
"Some ideas need distance.",
"Some ideas take shape later.",
"Some thoughts come together slowly.",
"Some ideas settle with time.",
"Some thoughts become clear later.",
"Some ideas land after a while.",
"Some ideas open slowly.",
"Some ideas need a cleaner path.",
"Some ideas need a simpler start."

];



const peopleFragments=[

"People want the point fast.",
"People like clean answers.",
"People trust simple words first.",
"People want the end quickly.",
"People like clear shapes.",
"People want the idea to sit still.",
"People move on fast online.",
"People want the shortcut.",
"People want the simple version.",
"People trust what they know.",
"People want the clean version.",
"People want the short answer.",
"People want the simple path.",
"People want the quick win.",
"People want the neat line.",
"People want the safe idea.",
"People want the clear point.",
"People want the fast read.",
"People want the easy take.",
"People want the simple shape.",
"People read fast.",
"People decide fast.",
"People move on quickly.",
"People want the idea now.",
"People want the answer now.",
"People want the point first.",
"People want the short path.",
"People want the easy read.",
"People want the clear take.",
"People want the quick win."

];



const notYetFragments=[

"Not clear yet does not mean wrong.",
"Not ready yet does not mean bad.",
"Not simple yet does not mean empty.",
"Not finished yet does not mean useless.",
"Not easy yet does not mean weak.",
"Not neat yet does not mean broken.",
"Not fast yet does not mean late.",
"Not clear yet does not mean lost.",
"Not smooth yet does not mean wrong.",
"Not simple yet does not mean fake.",
"Not done yet does not mean failed.",
"Not ready yet does not mean useless.",
"Not clear yet does not mean nothing.",
"Not simple yet does not mean wrong.",
"Not perfect yet does not mean bad."

];



const replyFrames=[

'"{reply}" might mean they missed the step.',
'"{reply}" might mean they wanted it simpler.',
'"{reply}" might mean the idea came early.',
'"{reply}" might mean they wanted the point faster.',
'"{reply}" might mean the path was not clear.',
'"{reply}" might mean the thought moved too fast.',
'"{reply}" might mean they lost the middle.',
'"{reply}" might mean they wanted a cleaner shape.',
'"{reply}" might mean the idea needed one more step.',
'"{reply}" might mean they wanted the short version.'

];



function buildPractical(reply){

const a=pick(replyFrames).replace("{reply}",reply);
const b=pick([...someFragments,...peopleFragments]);
return a+"\n"+b;

}



function buildSelf(reply){

const a=pick(maybeFragments);
return a+"\nStart with \""+reply+"\".";

}



function buildSpicy(reply){

const a=pick(peopleFragments);
return a+"\nOpen with \""+reply+"\".";

}



function mutateReplies(text){

const lines=cleanLines(text);

if(!lines.length) return null;

const seeds=shuffle(lines).map(seed);

while(seeds.length<5){
seeds.push(seeds[0]);
}

return [

{type:"Practical",text:buildPractical(seeds[0])},
{type:"Practical",text:buildPractical(seeds[1])},
{type:"Practical",text:buildPractical(seeds[2])},
{type:"Self-deprecating",text:buildSelf(seeds[3])},
{type:"Spicy",text:buildSpicy(seeds[4])}

];

}



window.REFRAME_FRAGMENT_ENGINE={
cleanLines,
mutateReplies
};

})();
