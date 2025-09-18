console.clear();

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
ScrollSmoother.create({
  effects: true,
  smooth: 3
});

const cont = document.querySelector(".panel-container");
const panels = gsap.utils.toArray(".panel-container .panel");

const horizontalTween = gsap.to(panels, {
  x: () => -1 * (cont.scrollWidth - innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".panel-container",
    pin: true,
    start: "top top",
    anticipatePin: 1,
    scrub: 1,
    end: () => "+=" + (cont.scrollWidth - innerWidth),
    invalidateOnRefresh: true
  }
});

// Set initial state - all polygons invisible
gsap.set(".poly-group-arrows polygon", { opacity: 0 });

// Create timeline for the wave effect
const polyTimeline = gsap.timeline({ repeat: -1 });

// Animate in from left to right
polyTimeline
  .to(".poly-group-arrows polygon", {
    opacity: 1,
    duration: 0.3,
    stagger: 0.1,
    ease: "power2.inOut"
  })
  // Animate out from left to right
  .to(
    ".poly-group-arrows polygon",
    {
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.inOut"
    },
    "+=0.5"
  ); // Wait 0.5 seconds before fading out

document.fonts.ready.then(() => {
  gsap.set("#quote", { opacity: 1 });

  const split = SplitText.create("#quote", {
    type: "words"
  });

  gsap.from(split.words, {
    scale: "random(0, 0.5)",
    rotation: "random(-60, 60)",
    opacity: 0,
    duration: 1,
    stagger: {
      from: "random",
      amount: 1
    },
    scrollTrigger: {
      trigger: "#quote",
      start: "top 70%",
      toggleActions: "play none none reverse",
      markers: true
    }
  });
});

ScrollTrigger.create({
  trigger: "#quote",
  start: "center center",
  end: "500%",
  pin: true,
  markers: true
});















// wheel code 



gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray("img.wheel-item");
const paneTexts = gsap.utils.toArray(".wheel-content .text-block");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#wheelSection",
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: true,
    markers: true
  }
});
images.forEach((img, i) => {
  const text = paneTexts[i];
  tl.to(img, { scale: 1.2, autoAlpha: 1, ease: "none" })
    .to(text, { autoAlpha: 1, display: "block" }, "<")
    .to(img, { scale: 1, duration: 0.15, ease: "power1.in" }, "+=0.5")
    .to(text, { autoAlpha: 0, display: "none" }, "<")
    .set(img, { autoAlpha: 0 });
});










// const sections = document.querySelectorAll("section");
// const images1 = document.querySelectorAll(".bg");
// const headings = gsap.utils.toArray(".section-heading");
// const outerWrappers = gsap.utils.toArray(".outer");
// const innerWrappers = gsap.utils.toArray(".inner");
// const clamp = gsap.utils.clamp(0, sections.length - 1);

// document.addEventListener("wheel", handleWheel);
// document.addEventListener("touchstart", handleTouchStart);
// document.addEventListener("touchmove", handleTouchMove);
// document.addEventListener("touchend", handleTouchEnd);

// let animating = false,
//   currentIndex = -1;

// const touch = {
//   startX: 0,
//   startY: 0,
//   dx: 0,
//   dy: 0,
//   startTime: 0,
//   dt: 0
// };

// const tlDefaults = {
//   ease: "slow.inOut",
//   duration: 1.25
// };

// const splitHeadings = headings.map((heading) => {
//   return new SplitText(heading, {
//     type: "chars, words, lines",
//     linesClass: "clip-text"
//   });
// });

// gsap.set(outerWrappers, { yPercent: 100 });
// gsap.set(innerWrappers, { yPercent: -100 });

// function gotoSection(index, direction) {
//   index = clamp(index); // make sure it's valid

//   // we're at the end, so exit
//   if (currentIndex === index) {
//     return;
//   }

//   animating = true;
//   let fromTop = direction === -1,
//     dFactor = fromTop ? -1 : 1,
//     tl = gsap.timeline({
//       defaults: { duration: 1.25, ease: "power1.inOut" },
//       onComplete: () => (animating = false)
//     });
//   if (currentIndex >= 0) {
//     // The first time this function runs, current is -1
//     gsap.set(sections[currentIndex], { zIndex: 0 });
//     tl.to(images1[currentIndex], { yPercent: -15 * dFactor }).set(
//       sections[currentIndex],
//       { autoAlpha: 0 }
//     );
//   }
//   gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
//   tl.fromTo(
//     [outerWrappers[index], innerWrappers[index]],
//     { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
//     { yPercent: 0 },
//     0
//   )
//     .fromTo(images1[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
//     .fromTo(
//       splitHeadings[index].chars,
//       { autoAlpha: 0, yPercent: 150 * dFactor },
//       {
//         autoAlpha: 1,
//         yPercent: 0,
//         duration: 1,
//         ease: "power2",
//         stagger: {
//           each: 0.02,
//           from: "random"
//         }
//       },
//       0.2
//     );

//   currentIndex = index;
// }

// function handleWheel(e) {
//   if (animating) return;

//   e.wheelDeltaY < 0
//     ? gotoSection(currentIndex + 1, 1)
//     : gotoSection(currentIndex - 1, -1);
// }

// function handleTouchStart(e) {
//   const t = e.changedTouches[0];
//   touch.startX = t.pageX;
//   touch.startY = t.pageY;
// }

// function handleTouchMove(e) {
//   e.preventDefault();
// }

// function handleTouchEnd(e) {
//   if (animating) return;
//   const t = e.changedTouches[0];
//   touch.dx = t.pageX - touch.startX;
//   touch.dy = t.pageY - touch.startY;
//   if (touch.dy > 10) gotoSection(currentIndex - 1, -1);
//   if (touch.dy < -10) gotoSection(currentIndex + 1, 1);
// }

// gotoSection(0, 1);












