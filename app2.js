
// Initial GSAP timeline for animations to ease in at power1


const tl = gsap.timeline({ defaults: { ease: 'power1.in' } });



tl.fromTo('nav', { opacity: 0 }, { opacity: 1, duration: 1 });

tl.fromTo('.stagger1', { opacity: 0 }, { opacity: 1, stagger: .5, duration: 2.4 }, "-=1.4");
// tl.fromTo('.stagger2', { opacity: 0 }, { opacity: 1, stagger: .7, duration: 2 }, "-=1");





const tlIntro = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "0%",
      end: "80%",
    },
  });


// Dragabble SLider for Founders 

 
const wrapper = document.querySelector(".lunch-images");
const boxes = gsap.utils.toArray(".client");




const loop = horizontalLoop(boxes, {paused: true, draggable: true});

boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i - 1, {duration: 0.8, ease: "power1.inOut"})));


//draggable 2

const wrapper2 = document.querySelector(".dinner-images");
const boxes2 = gsap.utils.toArray(".client2");




const loop2 = horizontalLoop(boxes2, {paused: true, draggable: true});

boxes2.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i - 1, {duration: 0.8, ease: "power1.inOut"})));




// Section for buttons to move if wanted

// document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
// document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));






/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like draggable: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
 - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
 - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
 - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
 - current() - returns the current index (if an animation is in-progress, it reflects the final index)
 - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
function horizontalLoop(items, config) {
items = gsap.utils.toArray(items);
config = config || {};
let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
  length = items.length,
  startX = items[0].offsetLeft,
  times = [],
  widths = [],
  xPercents = [],
  curIndex = 0,
  pixelsPerSecond = (config.speed || 1) * 100,
  snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
  populateWidths = () => items.forEach((el, i) => {
    widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
  }),
  getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
populateWidths();
gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
  xPercent: i => xPercents[i]
});
gsap.set(items, {x: 0});
totalWidth = getTotalWidth();
for (i = 0; i < length; i++) {
  item = items[i];
  curX = xPercents[i] / 100 * widths[i];
  distanceToStart = item.offsetLeft + curX - startX;
  distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
  tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
    .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
    .add("label" + i, distanceToStart / pixelsPerSecond);
  times[i] = distanceToStart / pixelsPerSecond;
}
function toIndex(index, vars) {
  vars = vars || {};
  (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
  let newIndex = gsap.utils.wrap(0, length, index),
    time = times[newIndex];
  if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
    vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
    time += tl.duration() * (index > curIndex ? 1 : -1);
  }
  curIndex = newIndex;
  vars.overwrite = true;
  return tl.tweenTo(time, vars);
}
tl.next = vars => toIndex(curIndex+1, vars);
tl.previous = vars => toIndex(curIndex-1, vars);
tl.current = () => curIndex;
tl.toIndex = (index, vars) => toIndex(index, vars);
tl.updateIndex = () => curIndex = Math.round(tl.progress() * items.length);
tl.times = times;
tl.progress(1, true).progress(0, true); // pre-render for performance
if (config.reversed) {
  tl.vars.onReverseComplete();
  tl.reverse();
}
if (config.draggable && typeof(Draggable) === "function") {
  let proxy = document.createElement("div"),
      wrap = gsap.utils.wrap(0, 1),
      ratio, startProgress, draggable, dragSnap, roundFactor,
      align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
      syncIndex = () => tl.updateIndex();
  typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
  draggable = Draggable.create(proxy, {
    trigger: items[0].parentNode,
    type: "x",
    onPress() {
      startProgress = tl.progress();
      tl.progress(0);
      populateWidths();
      totalWidth = getTotalWidth();
      ratio = 1 / totalWidth;
      dragSnap = totalWidth / items.length;
      roundFactor = Math.pow(10, ((dragSnap + "").split(".")[1] || "").length);
      tl.progress(startProgress);
    },
    onDrag: align,
    onThrowUpdate: align,
    inertia: true,
    snap: value => {
      let n = Math.round(parseFloat(value) / dragSnap) * dragSnap * roundFactor;
      return (n - n % 1) / roundFactor;
    },
    onRelease: syncIndex,
    onThrowComplete: () => gsap.set(proxy, {x: 0}) && syncIndex()
  })[0];
  
  tl.draggable = draggable;
}

return tl;
}



// Lunch Section

const tlSplitimages = gsap.timeline({
    scrollTrigger: {
      trigger: ".menu-food",
      start: "-30%",
      end: "0%",
      // markers: { startColor: "blue", endColor: "red" },
      scrub: 1,
    },
  });
  
  tlSplitimages.fromTo(".lunch-info",  { x: "-70%"  }, { x: "00%", duration: 1.4, stagger: 0.55}   );
  tlSplitimages.fromTo(".lunch-images", { x: "70%" }, { x: "00%", duration: 0.8 }, "<" );
  // tlSplitimages.fromTo(".text-scroll-3", { x: "40%" }, { x: "0%", duration: 0.8  }, "<");

  const tlSplitimages2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".menu-food2",
      start: "-20%",
      end: "0%",
      // markers: { startColor: "blue", endColor: "red" },
      scrub: 1,
    },
  });
  
  tlSplitimages2.fromTo(".dinner-info",  { x: "-70%"  }, { x: "00%", duration: 1.4, stagger: 0.55}   );
  tlSplitimages2.fromTo(".dinner-images", { x: "70%" }, { x: "00%", duration: 0.8 }, "<" );
  // tlSplitimages.fromTo(".text-scroll-3", { x: "40%" }, { x: "0%", duration: 0.8  }, "<");