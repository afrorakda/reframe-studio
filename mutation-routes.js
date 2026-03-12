(function (global) {
  'use strict';

  /*
    REFRAME Studio
    mutation-routes.js

    Purpose:
    - Define next mutation candidates
    - Keep the surface simple
    - Secretly open deeper routes underneath

    Notes:
    - Browser-first
    - No backend
    - No external API
    - Safe to use with plain <script src="..."></script>
  */

  var ROUTES = {
    // Surface entry
    'kusoripu-to-idea': {
      label: 'クソリプ → ネタに',
      field: 'surface',
      next: [
        {
          id: 'reaction-to-hidden-idea',
          weight: 5,
          reason: 'Find the hidden idea inside the rude reaction.'
        },
        {
          id: 'criticism-to-lesson',
          weight: 4,
          reason: 'Turn attack into lesson.'
        },
        {
          id: 'emotion-to-reframe',
          weight: 3,
          reason: 'Shift the emotional angle.'
        }
      ]
    },

    // Core v1 routes from prompt
    'failure-to-reframe': {
      label: 'Failure → Reframe',
      field: 'mutation',
      next: [
        {
          id: 'idea-to-metaphor',
          weight: 4,
          reason: 'Make the failure easier to see differently.'
        },
        {
          id: 'idea-to-thread',
          weight: 3,
          reason: 'Expand the new angle into a thread.'
        },
        {
          id: 'tweet-polisher',
          weight: 2,
          reason: 'Polish the expression for public output.'
        }
      ]
    },

    'emotion-to-reframe': {
      label: 'Emotion → Reframe',
      field: 'mutation',
      next: [
        {
          id: 'emotion-to-action',
          weight: 4,
          reason: 'Move emotion toward action.'
        },
        {
          id: 'problem-to-tiny-step',
          weight: 3,
          reason: 'Reduce pressure into one small move.'
        },
        {
          id: 'idea-to-angle',
          weight: 2,
          reason: 'Extract a usable perspective.'
        }
      ]
    },

    'criticism-to-lesson': {
      label: 'Criticism → Lesson',
      field: 'mutation',
      next: [
        {
          id: 'idea-to-angle',
          weight: 4,
          reason: 'Convert lesson into a sharp angle.'
        },
        {
          id: 'idea-to-thread',
          weight: 3,
          reason: 'Expand the lesson into a thread.'
        },
        {
          id: 'tweet-polisher',
          weight: 2,
          reason: 'Tighten the output.'
        }
      ]
    },

    'reaction-to-hidden-idea': {
      label: 'Reaction → Hidden Idea',
      field: 'mutation',
      next: [
        {
          id: 'idea-to-hook',
          weight: 4,
          reason: 'Pull out the most clickable opening.'
        },
        {
          id: 'idea-to-thread',
          weight: 4,
          reason: 'Develop the hidden idea into a thread.'
        },
        {
          id: 'idea-to-angle',
          weight: 3,
          reason: 'Find an alternate meaning.'
        }
      ]
    },

    // Common bridge nodes
    'idea-to-metaphor': {
      label: 'Idea → Metaphor',
      field: 'mutation',
      next: [
        {
          id: 'idea-to-hook',
          weight: 3,
          reason: 'Metaphor often creates a stronger hook.'
        },
        {
          id: 'idea-to-thread',
          weight: 4,
          reason: 'Turn metaphor into a longer expression.'
        }
      ]
    },

    'idea-to-angle': {
      label: 'Idea → Angle',
      field: 'expression',
      next: [
        {
          id: 'idea-to-hook',
          weight: 4,
          reason: 'Turn angle into a stronger opening.'
        },
        {
          id: 'idea-to-thread',
          weight: 4,
          reason: 'Expand the angle.'
        },
        {
          id: 'tweet-polisher',
          weight: 2,
          reason: 'Compress for publishing.'
        }
      ]
    },

    'idea-to-hook': {
      label: 'Idea → Hook',
      field: 'expression',
      next: [
        {
          id: 'idea-to-thread',
          weight: 4,
          reason: 'A hook naturally wants a thread.'
        },
        {
          id: 'tweet-polisher',
          weight: 3,
          reason: 'Tighten the final wording.'
        }
      ]
    },

    'idea-to-thread': {
      label: 'Idea → Thread',
      field: 'expression',
      next: [
        {
          id: 'tweet-polisher',
          weight: 3,
          reason: 'Clean the final output.'
        }
      ]
    },

    'emotion-to-action': {
      label: 'Emotion → Action',
      field: 'expression',
      next: [
        {
          id: 'problem-to-tiny-step',
          weight: 4,
          reason: 'Action becomes easier when reduced.'
        }
      ]
    },

    'problem-to-tiny-step': {
      label: 'Problem → Tiny Step',
      field: 'expression',
      next: [
        {
          id: 'tweet-polisher',
          weight: 1,
          reason: 'Optional final polish.'
        }
      ]
    },

    'tweet-polisher': {
      label: 'Tweet Polisher',
      field: 'output',
      next: []
    }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeMode(mode) {
    var safe = String(mode || 'stable').toLowerCase();
    if (safe !== 'stable' && safe !== 'drift' && safe !== 'chaos') {
      return 'stable';
    }
    return safe;
  }

  function sortByWeight(list) {
    return list.slice().sort(function (a, b) {
      return (b.weight || 0) - (a.weight || 0);
    });
  }

  function applyMode(list, mode) {
    var safeMode = normalizeMode(mode);
    var items = list.slice();

    if (safeMode === 'stable') {
      return sortByWeight(items);
    }

    if (safeMode === 'drift') {
      return items.slice().sort(function (a, b) {
        var aScore = (a.weight || 0) + (Math.random() * 1.5);
        var bScore = (b.weight || 0) + (Math.random() * 1.5);
        return bScore - aScore;
      });
    }

    return items.slice().sort(function () {
      return Math.random() - 0.5;
    });
  }

  function getRoute(id) {
    if (!id || !ROUTES[id]) {
      return null;
    }

    return clone(ROUTES[id]);
  }

  function hasRoute(id) {
    return !!ROUTES[id];
  }

  function getNextMutations(id, options) {
    var route = ROUTES[id];
    var mode = options && options.mode ? options.mode : 'stable';
    var limit = options && typeof options.limit === 'number' ? options.limit : 3;

    if (!route || !Array.isArray(route.next)) {
      return [];
    }

    return applyMode(clone(route.next), mode).slice(0, limit);
  }

  function getPrimaryNextMutation(id, options) {
    var next = getNextMutations(id, options);
    return next.length ? next[0] : null;
  }

  function getRouteChain(startId, options) {
    var maxDepth = options && typeof options.depth === 'number' ? options.depth : 4;
    var mode = options && options.mode ? options.mode : 'stable';
    var chain = [];
    var currentId = startId;
    var visited = {};

    for (var i = 0; i < maxDepth; i += 1) {
      if (!currentId || visited[currentId] || !ROUTES[currentId]) {
        break;
      }

      visited[currentId] = true;

      chain.push({
        id: currentId,
        label: ROUTES[currentId].label,
        field: ROUTES[currentId].field
      });

      var next = getPrimaryNextMutation(currentId, { mode: mode });
      currentId = next ? next.id : null;
    }

    return chain;
  }

  function getAllRoutes() {
    return clone(ROUTES);
  }

  function getSubtleDeepLinks(id, options) {
    var next = getNextMutations(id, options);

    return next.map(function (item) {
      return {
        id: item.id,
        label: ROUTES[item.id] ? ROUTES[item.id].label : item.id,
        reason: item.reason || ''
      };
    });
  }

  var MutationRoutes = {
    version: '1.0.0',
    getRoute: getRoute,
    getAllRoutes: getAllRoutes,
    hasRoute: hasRoute,
    getNextMutations: getNextMutations,
    getPrimaryNextMutation: getPrimaryNextMutation,
    getRouteChain: getRouteChain,
    getSubtleDeepLinks: getSubtleDeepLinks,
    normalizeMode: normalizeMode
  };

  global.MutationRoutes = MutationRoutes;
})(window);
