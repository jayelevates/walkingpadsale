import { amz, safe } from './site.mjs';
import { MORE, MORE_KINDS } from './more.mjs';

// lo/hi: speed range in mph. cap: user weight limit in lb. kind: pad | twoinone | treadmill
export const P = {
  cyberpad: { name: 'Urevo CyberPad', brand: 'Urevo', kind: 'pad', lo: 0.6, hi: 4.0, cap: 350, incline: '0 to 14% automatic', tier: '$350 to $450', q: 'UREVO CyberPad walking pad incline',
    specs: { 'Walking area': '43.3 x 16.5 in', Incline: '0 to 14% automatic', 'Machine weight': '70.6 lb', Handle: 'No' },
    good: ['Real automatic incline up to 14%', 'Long, wide walking area for a walking pad', '350 lb capacity'],
    watch: ['Heavier than flat walking pads', 'Walking speeds only'] },
  strol2e: { name: 'Urevo Strol 2E', brand: 'Urevo', kind: 'twoinone', lo: 0.6, hi: 6.2, cap: 265, incline: 'None', tier: '$200 to $300', q: 'UREVO Strol 2E 2 in 1 treadmill',
    specs: { 'Walking area': 'About 40 in long', Incline: 'None', Modes: 'Walk and jog', Handle: 'Fold-up handrail' },
    good: ['Walk under a desk or jog with the rail up', 'App tracking', 'Huge owner base'],
    watch: ['265 lb capacity', 'Short deck for running'] },
  sperax: { name: 'Sperax Walking Pad', brand: 'Sperax', kind: 'pad', lo: 0.6, hi: 3.8, cap: 350, incline: 'None', tier: 'Under $200', q: 'Sperax walking pad treadmill',
    specs: { 'Walking area': 'About 38 x 15 in', Size: '39 x 21 x 3.5 in', Incline: 'None', Handle: 'No' },
    good: ['Very low price', 'Thin and light enough to slide under a couch', '350 lb rated capacity'],
    watch: ['Short belt for tall walkers', 'Small motor; walking only'] },
  goplus: { name: 'Goplus 2-in-1 Folding Treadmill', brand: 'Goplus', kind: 'twoinone', lo: 0.6, hi: 7.5, cap: 265, incline: 'None', tier: '$200 to $350', q: 'Goplus 2 in 1 folding treadmill',
    specs: { 'Walking area': '40 x 16 in', Motor: '2.25 HP', Modes: 'Walk up to 2.5 mph, run up to 7.5 mph', Handle: 'Fold-up handrail' },
    good: ['Runs up to 7.5 mph with the rail raised', 'Folds flat with wheels', 'Often heavily discounted'],
    watch: ['265 lb capacity', 'Louder than premium pads'] },
  walkingpadz1: { name: 'WalkingPad Z1', brand: 'WalkingPad (Kingsmith)', kind: 'pad', cap: 0, incline: 'None', tier: '$300 to $400', q: 'WalkingPad Z1 foldable walking pad',
    specs: { Belt: 'About 47 in', Storage: 'Folds 180 degrees flat', Motor: 'Brushless, rated under 40 dB', Handle: 'No' },
    good: ['Folds in half to store upright or under furniture', 'Quiet brushless motor', 'Polished build from the brand that started walking pads'],
    watch: ['Walking only', 'Costs more than budget pads'] },
  walkingpadr2: { name: 'WalkingPad R2', brand: 'WalkingPad (Kingsmith)', kind: 'twoinone', lo: 0.5, hi: 7.5, cap: 240, incline: 'None', tier: '$550 to $650', q: 'WalkingPad R2 folding treadmill',
    specs: { Belt: '47 x 17.3 in', Motor: '2.0 HP', Frame: 'Foldable aluminum', Handle: 'Fold-up handrail' },
    good: ['A true walk and run treadmill that folds', 'Sturdy aluminum frame', 'Longer belt than most 2-in-1s'],
    watch: ['240 lb capacity', 'Premium price'] },
  deerrun: { name: 'DeerRun Z10', brand: 'DeerRun', kind: 'pad', lo: 0.6, hi: 3.8, cap: 300, incline: '12% automatic', tier: '$200 to $300', q: 'DeerRun Z10 walking pad incline',
    specs: { Belt: '35.4 x 15.9 in', Incline: '12% automatic', Motor: '3.0 HP', Handle: 'No' },
    good: ['Automatic incline at a budget price', '300 lb capacity', 'Strong motor for its size'],
    watch: ['Short belt', 'Walking speeds only'] },
  cybergoing: { name: 'Cybergoing T10', brand: 'Cybergoing', kind: 'pad', lo: 0.6, hi: 4.0, cap: 300, incline: '7% fixed', tier: '$250 to $350', q: 'Cybergoing T10 walking pad',
    specs: { Incline: '7% fixed', Motor: 'Bosch motor', Controls: 'App and remote', Handle: 'No' },
    good: ['Built-in fixed incline for harder walks', '300 lb capacity', 'Premium motor'],
    watch: ['Incline cannot be turned off', 'Less known brand'] },
  lifespan: { name: 'LifeSpan TR1200-DT3', brand: 'LifeSpan', kind: 'pad', lo: 0.4, hi: 4.0, cap: 350, incline: 'None', tier: '$900 to $1,200', q: 'LifeSpan TR1200-DT3 under desk treadmill',
    specs: { Belt: '20 x 50 in', Motor: '2.25 HP', Use: 'Built for long daily desk walking', Handle: 'No' },
    good: ['Wide belt and long deck for all-day walking', 'Made for heavy daily use', '350 lb capacity'],
    watch: ['Expensive', 'Heavy; not for moving around'] },
  horizon70: { name: 'Horizon 7.0 AT', brand: 'Horizon Fitness', kind: 'treadmill', lo: 0.5, hi: 12, cap: 325, incline: '0 to 15%', tier: '$1,000 to $1,500', q: 'Horizon 7.0 AT folding treadmill',
    specs: { Belt: '20 x 60 in', Incline: '0 to 15%', Folding: 'Yes, with assist', Handle: 'Full handrails' },
    good: ['Full-size running deck that folds', 'Quick speed and incline changes', 'Strong value for a full treadmill'],
    watch: ['Large and heavy', 'Not for under a desk'] },
  solef63: { name: 'Sole F63', brand: 'Sole', kind: 'treadmill', lo: 0.5, hi: 12, cap: 325, incline: '0 to 15%', tier: '$1,000 to $1,500', q: 'Sole F63 folding treadmill',
    specs: { Belt: '20 x 60 in', Incline: '0 to 15%', Folding: 'Yes', Handle: 'Full handrails' },
    good: ['Sole\'s reputation for durability', 'Long warranty on frame and motor', 'Cushioned deck'],
    watch: ['Heavy', 'Plain console'] },
  echelon: { name: 'Echelon Stride', brand: 'Echelon', kind: 'treadmill', lo: 0.5, hi: 12, cap: 300, incline: '0 to 10%', tier: '$1,000 to $1,500', q: 'Echelon Stride auto fold treadmill',
    specs: { Belt: '20 x 55 in', Incline: '0 to 10%', Folding: 'Auto-fold for storage', Handle: 'Handrails' },
    good: ['Auto-fold design stores upright against a wall', 'Full running speeds', 'Slim when stored'],
    watch: ['Subscription content is extra', 'Shorter belt than full-size treadmills'] },
};

export const kindLabel = { pad: 'Walking pad', twoinone: '2-in-1 walk and run', treadmill: 'Folding treadmill', ...MORE_KINDS };
Object.assign(P, MORE);

export const buy = (id, label = 'Check price on Amazon') => `<a class="buy" href="${amz(P[id].q)}" rel="sponsored nofollow noopener" target="_blank">${label}</a>`;
export const nameLink = (id) => `<a href="${amz(P[id].q)}" rel="sponsored nofollow noopener" target="_blank">${safe(P[id].name)}</a>`;

// Speed band: where this machine's speed range sits on a 0 to 12 mph track.
const band = (p) => p.hi ? `<div class="band" aria-label="Speed range ${p.lo} to ${p.hi} mph"><div class="band-track"><span style="left:${(p.lo / 12) * 100}%;width:${((p.hi - p.lo) / 12) * 100}%"></span><i style="left:${(4 / 12) * 100}%"></i></div><div class="band-scale"><span>0</span><span>4 mph</span><span>12 mph</span></div><b>${p.lo} to ${p.hi} mph</b></div>` : '<div class="band"><b>Speed: see seller</b></div>';

export const pick = (id, award, why) => {
  const p = P[id];
  return `<article class="pick" id="pick-${id}"><div class="pick-top"><div><p class="award">${safe(award)}</p><h3>${safe(p.name)}</h3><p class="tags"><span class="tier">${safe(p.tier)}</span><span>${kindLabel[p.kind]}</span>${p.cap ? `<span>${p.cap} lb max</span>` : ''}</p></div>${band(p)}</div><p>${why}</p><dl class="specs">${Object.entries(p.specs).map(([k, v]) => `<div><dt>${safe(k)}</dt><dd>${safe(v)}</dd></div>`).join('')}</dl><div class="gw"><div><h4>Strengths</h4><ul>${p.good.map((g) => `<li>${safe(g)}</li>`).join('')}</ul></div><div><h4>Trade-offs</h4><ul>${p.watch.map((g) => `<li>${safe(g)}</li>`).join('')}</ul></div></div>${buy(id)}</article>`;
};

const cell = (id, c) => { const p = P[id]; if (c === 'Speed') return p.hi ? `${p.lo} to ${p.hi} mph` : 'Not listed'; if (c === 'Max user') return p.cap ? `${p.cap} lb` : 'Not listed'; if (c === 'Incline') return p.incline || 'None'; if (c === 'Price band') return p.tier; if (c === 'Type') return kindLabel[p.kind]; return p.specs[c] || 'Not listed'; };
export const compare = (caption, ids, cols) => `<figure class="tbl"><figcaption>${safe(caption)}</figcaption><div class="tbl-x"><table><thead><tr><th scope="col">Model</th>${cols.map((c) => `<th scope="col">${safe(c)}</th>`).join('')}<th scope="col"><span class="vh">Price</span></th></tr></thead><tbody>${ids.map((id) => `<tr><th scope="row">${nameLink(id)}</th>${cols.map((c) => `<td>${safe(cell(id, c))}</td>`).join('')}<td>${buy(id, 'Check price')}</td></tr>`).join('')}</tbody></table></div></figure>`;
