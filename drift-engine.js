// REFRAME Drift Engine v1

function driftFragments(fragments){

  return fragments.map(fragment => {

    let score = fragment.score || 0
    let history = fragment.history ? fragment.history.length : 0

    let drift = 0

    // Gravity
    if(score >= 6) drift += 1

    // Friction
    if(history <= 1) drift -= 1

    // Noise
    if(Math.random() < 0.25){
      drift += Math.random() < 0.5 ? 1 : -1
    }

    let depth = fragment.depth || "surface"

    if(drift > 0){
      if(depth === "surface") depth = "middle"
      else if(depth === "middle") depth = "deep"
    }

    if(drift < 0){
      if(depth === "deep") depth = "middle"
      else if(depth === "middle") depth = "surface"
    }

    fragment.depth = depth

    return fragment
  })
}
