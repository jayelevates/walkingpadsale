import { pick } from '../lib/products.mjs';

const doctor = '<div class="note"><p>Check with your doctor before starting a new exercise routine, especially if you have heart, joint or balance problems. Stop if you feel dizzy, faint or have chest pain.</p></div>';
const table = (head, rows) => `<figure class="tbl"><div class="tbl-x"><table><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('')}</tbody></table></div></figure>`;

// ACSM metabolic equations: walking VO2 = 0.1*S + 1.8*S*G + 3.5; running VO2 = 0.2*S + 0.9*S*G + 3.5 (S in m/min, G as a fraction).
const calc = `<form class="calc" id="calc" onsubmit="return false"><div class="calc-in"><label>Speed (mph)<input id="c-speed" type="number" min="0.5" max="12" step="0.1" value="3"></label><label>Incline (%)<input id="c-grade" type="number" min="0" max="40" step="0.5" value="8"></label><label>Time (minutes)<input id="c-min" type="number" min="1" max="300" step="1" value="30"></label><label>Body weight (lb)<input id="c-lb" type="number" min="70" max="500" step="1" value="170"></label></div><div class="calc-out" aria-live="polite"><div><span>Calories</span><b id="o-kcal">0</b></div><div><span>Distance</span><b id="o-mi">0</b></div><div><span>Climb</span><b id="o-ft">0</b></div><div><span>Angle</span><b id="o-deg">0</b></div></div><p class="calc-note" id="o-mode"></p></form>`;
const script = `(function(){var g=function(i){return document.getElementById(i)};function run(){var mph=+g('c-speed').value||0,gr=(+g('c-grade').value||0)/100,mins=+g('c-min').value||0,lb=+g('c-lb').value||0;var s=mph*26.8224,kg=lb*0.453592,walk=mph<=4.0;var vo2=walk?(0.1*s+1.8*s*gr+3.5):(0.2*s+0.9*s*gr+3.5);var kcal=vo2*kg/1000*5*mins;var mi=mph*mins/60;var ft=mi*5280*gr/Math.sqrt(1+gr*gr);g('o-kcal').textContent=Math.round(kcal)+' kcal';g('o-mi').textContent=mi.toFixed(2)+' mi';g('o-ft').textContent=Math.round(ft).toLocaleString()+' ft';g('o-deg').textContent=(Math.atan(gr)*180/Math.PI).toFixed(1)+'\\u00b0';g('o-mode').textContent='Using the ACSM '+(walk?'walking':'running')+' equation. Estimates only; real burn varies by fitness, stride and holding the rails.'}['c-speed','c-grade','c-min','c-lb'].forEach(function(i){g(i).addEventListener('input',run)});run()})();`;

export default [
  {
    path: 'treadmill-incline-calculator', short: 'Incline calculator', blurb: 'Calories, climb and angle for any speed and incline.',
    tab: 'Treadmill Incline Calculator: Calories, Elevation and Angle',
    summary: 'Free treadmill incline calculator: enter speed, incline, time and weight to estimate calories burned, distance, feet climbed and incline angle.',
    heading: 'Treadmill incline calculator',
    lede: 'Enter your speed, incline, time and weight to see roughly how many calories you burn and how many feet you climb.',
    quick: 'Treadmill incline is a percent grade: 10 percent means you rise 10 feet for every 100 feet you travel, which is an angle of about 5.7 degrees. Incline raises calorie burn sharply at walking speeds. This calculator uses the American College of Sports Medicine (ACSM) metabolic equations, the standard formulas exercise physiologists use to estimate treadmill energy cost.',
    script,
    parts: [
      ['Calculator', calc],
      ['Incline percent to degrees', table(['Incline', 'Angle', 'Feet climbed per mile'], [['1%', '0.6°', '53'], ['3%', '1.7°', '158'], ['5%', '2.9°', '264'], ['8%', '4.6°', '421'], ['10%', '5.7°', '525'], ['12%', '6.8°', '629'], ['15%', '8.5°', '783']])],
      ['How the estimate works', `<p>The ACSM walking equation estimates oxygen use from speed and grade: VO2 = 0.1 x speed + 1.8 x speed x grade + 3.5, with speed in meters per minute. Above 4 mph we switch to the running equation. Calories are estimated at about 5 kcal per liter of oxygen. Holding the handrails can cut the real burn a lot, so the numbers assume you walk hands-free.</p>`],
      ['Put it to use', `<p>Try the <a href="/12-3-30-treadmill-workout/">12-3-30 workout</a> or an <a href="/incline-treadmill-workout/">incline treadmill workout</a>. No room for a full treadmill? A <a href="/best-walking-pad-with-incline/">walking pad with incline</a> reaches 12 to 14 percent.</p>`],
    ],
    asked: [
      ['What does 10 percent incline mean on a treadmill?', 'You rise 10 units for every 100 units of distance, an angle of about 5.7 degrees.'],
      ['How many calories does walking on an incline burn?', 'It depends on weight, speed and grade. A 170-pound person walking 3 mph at 8 percent for 30 minutes burns roughly 270 calories by the ACSM equation.'],
    ],
    refs: [['ACSM\'s Guidelines for Exercise Testing and Prescription (metabolic equations)', 'https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription']],
    next: ['12-3-30-treadmill-workout', 'best-incline-treadmill', 'incline-treadmill-workout'],
  },
  {
    path: '12-3-30-treadmill-workout', short: '12-3-30 workout', blurb: '12 percent incline, 3 mph, 30 minutes: how to do it and build up.',
    tab: '12-3-30 Treadmill Workout: How to Do It and Build Up Safely',
    summary: 'The 12-3-30 treadmill workout explained: 12 percent incline at 3 mph for 30 minutes, how many calories it burns, and a plan to work up to it.',
    heading: 'The 12-3-30 treadmill workout',
    lede: 'Set the incline to 12 percent, the speed to 3 mph and walk for 30 minutes. Simple to remember, hard to finish the first time.',
    quick: '12-3-30 means walking at 12 percent incline and 3 mph for 30 minutes. For a 170-pound person that burns roughly 330 calories by the ACSM equation, with far less impact than running. Most people need to build up to it: start at a lower incline or shorter time and add a little each week. Do not hold the handrails, which makes it much easier.',
    parts: [
      ['How to do it', `${doctor}<ol class="steps"><li>Warm up for 3 to 5 minutes at 0 to 3 percent and an easy pace.</li><li>Raise the incline to 12 percent and the speed to 3 mph.</li><li>Walk for 30 minutes, standing tall, arms swinging, hands off the rails.</li><li>Cool down for 3 to 5 minutes at a flat, easy pace.</li></ol>`],
      ['Build up to it', table(['Week', 'Incline', 'Speed', 'Time'], [['1', '6%', '2.5 to 3 mph', '15 to 20 min'], ['2', '8%', '3 mph', '20 min'], ['3', '10%', '3 mph', '25 min'], ['4', '12%', '3 mph', '25 to 30 min']])],
      ['What you need', `<p>A treadmill with at least 12 percent incline. Most full treadmills reach 10 to 15 percent; the <a href="/horizon-7-0-at-review/">Horizon 7.0 AT</a> has 15 incline levels. Walking pads that reach 12 percent include the DeerRun Z10, and the Urevo CyberPad reaches 14.</p>${pick('cyberpad', 'Walking pad that can do 12-3-30', 'Automatic incline to 14 percent on a storable pad.')}`],
    ],
    asked: [
      ['How many calories does 12-3-30 burn?', 'About 330 calories for a 170-pound person by the ACSM walking equation. Try our <a href="/treadmill-incline-calculator/">incline calculator</a> for your weight.'],
      ['Is 12-3-30 good for weight loss?', 'It is an efficient, low-impact workout that burns more than flat walking. Results still depend mostly on diet.'],
      ['Is 12-3-30 bad for your knees?', 'Incline walking is low impact, but steep incline loads calves, Achilles and lower back. Build up slowly and lower the incline if anything hurts.'],
    ],
    next: ['treadmill-incline-calculator', 'incline-treadmill-workout', 'best-incline-treadmill'],
  },
  {
    path: 'incline-treadmill-workout', short: 'Incline workout', blurb: 'A 30-minute hill walk you can run on any treadmill.',
    tab: 'Incline Treadmill Workout: 30-Minute Hill Walk for All Levels',
    summary: 'A 30-minute incline treadmill workout with beginner, intermediate and advanced versions, plus form tips for hill walking.',
    heading: 'Incline treadmill workout',
    lede: 'Rolling hills keep incline walking interesting and spread the work across your legs. Here is a 30-minute plan at three levels.',
    quick: 'This workout alternates hill blocks with recovery blocks over 30 minutes. Beginners peak at 6 percent, intermediate walkers at 10 percent and advanced walkers at 15 percent, all at a brisk walking pace of 2.8 to 3.5 mph. Keep your hands off the rails and lower the incline whenever you cannot hold good posture.',
    parts: [
      ['The workout', `${doctor}${table(['Minutes', 'Beginner', 'Intermediate', 'Advanced'], [['0 to 5 (warm-up)', '1%', '2%', '3%'], ['5 to 9', '3%', '5%', '8%'], ['9 to 11', '1%', '2%', '4%'], ['11 to 15', '5%', '8%', '12%'], ['15 to 17', '1%', '3%', '5%'], ['17 to 22', '6%', '10%', '15%'], ['22 to 25', '2%', '4%', '6%'], ['25 to 30 (cool-down)', '0%', '1%', '1%']])}<p>Keep speed steady at a pace you can hold: about 2.8 mph for beginners, 3.2 mph intermediate, 3.5 mph advanced.</p>`],
      ['Form tips', `<ul><li>Stand tall; lean slightly from the ankles, not the waist.</li><li>Shorter steps on steep sections.</li><li>Hands off the rails. If you need them, lower the incline.</li></ul>`],
      ['Next steps', `<p>Ready for a steady challenge? Try the <a href="/12-3-30-treadmill-workout/">12-3-30 workout</a>, or estimate your burn with the <a href="/treadmill-incline-calculator/">incline calculator</a>.</p>`],
    ],
    asked: [
      ['How long should an incline treadmill workout be?', '20 to 45 minutes suits most people. Start shorter and build.'],
      ['Is incline walking better than flat walking?', 'It burns more energy at the same speed and works the glutes, hamstrings and calves harder.'],
    ],
    next: ['12-3-30-treadmill-workout', 'best-incline-treadmill', 'treadmill-for-weight-loss'],
  },
  {
    path: 'hiit-treadmill-workout', short: 'HIIT workout', blurb: 'A 20-minute interval workout for walkers and runners.',
    tab: 'HIIT Treadmill Workout: 20-Minute Intervals for Every Level',
    summary: 'A 20-minute HIIT treadmill workout with walking and running versions, how to set your interval speeds, and how often to do it.',
    heading: 'HIIT treadmill workout',
    lede: 'Short, hard efforts with easy recoveries. Twenty minutes is enough.',
    quick: 'This 20-minute HIIT workout uses 30-second hard efforts and 60- to 90-second recoveries. Runners sprint and jog; walkers use a fast walk at steep incline for the hard parts. Do it two or three times a week at most, with easy days in between, and warm up properly first.',
    parts: [
      ['The workout', `${doctor}<ol class="steps"><li><b>Warm up, 5 minutes:</b> easy walk building to a brisk walk or light jog.</li><li><b>Intervals, 10 minutes:</b> 30 seconds hard, then 60 seconds easy. Repeat 6 to 7 times.</li><li><b>Cool down, 5 minutes:</b> easy walk.</li></ol>${table(['Level', 'Hard 30 seconds', 'Easy recovery'], [['Walker', '3.5 to 4 mph at 8 to 12% incline', '2.5 mph at 1 to 2%'], ['Beginner runner', '6 to 7 mph, flat', '3 to 3.5 mph walk'], ['Experienced runner', '8 to 10 mph, 1 to 2%', '4 mph walk or slow jog']])}`],
      ['Safety on a treadmill', `<ul><li>Clip the safety key to your clothing.</li><li>For runners, change speed during the last seconds of each interval rather than jumping on and off the belt.</li><li>Curved manual treadmills make sprints simpler; see the <a href="/best-curved-treadmill/">best curved treadmills</a>.</li></ul>`],
    ],
    asked: [
      ['How often should you do HIIT on a treadmill?', 'Two or three times a week, with easier days in between.'],
      ['Can you do HIIT on a walking pad?', 'Only as a walking workout. Walking pads top out around 4 mph and should not be sprinted on.'],
    ],
    next: ['best-curved-treadmill', 'incline-treadmill-workout', 'treadmill-for-weight-loss'],
  },
  {
    path: 'treadmill-for-weight-loss', short: 'Treadmill for weight loss', blurb: 'A practical treadmill plan for losing weight.',
    tab: 'How to Lose Weight on a Treadmill: A 4-Week Plan',
    summary: 'How to use a treadmill for weight loss: a four-week walking and incline plan, how to estimate calories, and the habits that matter more than the machine.',
    heading: 'How to lose weight on a treadmill',
    lede: 'The treadmill workouts that help most with weight loss are the ones you will repeat. Here is a simple four-week plan.',
    quick: 'To lose weight with a treadmill, aim for regular sessions most days, mix steady walks with incline and interval days, and pair it with changes to what you eat. A brisk incline walk burns far more than a flat one at the same speed. Build time first, then incline, then intensity.',
    parts: [
      ['A 4-week plan', `${doctor}${table(['Week', 'Most days', 'Two days a week'], [['1', '20 to 30 min brisk walk, 0 to 2%', 'Add 5 min at 4 to 6% incline'], ['2', '30 min, 2 to 4%', '<a href="/incline-treadmill-workout/">Incline workout</a>, beginner level'], ['3', '35 to 40 min, 3 to 5%', 'Incline workout, intermediate'], ['4', '40 to 45 min, 4 to 6%', '<a href="/12-3-30-treadmill-workout/">12-3-30</a> or <a href="/hiit-treadmill-workout/">HIIT</a>']])}`],
      ['Estimate your burn', `<p>Use the <a href="/treadmill-incline-calculator/">treadmill incline calculator</a> to see how speed and incline change calories for your weight. Treat console calorie counts as rough; they often run high.</p>`],
      ['Habits that matter more', `<ul><li>Consistency beats intensity.</li><li>Protein and fiber at meals help with hunger.</li><li>Sleep and stress affect appetite as much as workouts do.</li><li>Walking during the workday adds up; see <a href="/walking-pad-for-weight-loss/">walking pads for weight loss</a>.</li></ul>`],
    ],
    asked: [
      ['How long should I walk on a treadmill to lose weight?', 'Most guidelines suggest at least 150 minutes of moderate activity a week; more helps with weight loss when combined with diet changes.'],
      ['Is walking or running on a treadmill better for weight loss?', 'Running burns more per minute, but incline walking can come close with less impact and is easier to keep up.'],
    ],
    refs: [['CDC, adult physical activity guidelines', 'https://www.cdc.gov/physical-activity-basics/guidelines/adults.html']],
    next: ['walking-pad-for-weight-loss', 'treadmill-incline-calculator', 'best-treadmill-for-home'],
  },
];
