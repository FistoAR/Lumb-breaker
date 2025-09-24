console.clear();

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
ScrollSmoother.create({
  effects: true,
  smooth: 3
});

const cont = document.querySelector(".panel-container");
const panel = gsap.utils.toArray(".panel-container .panel");

const horizontalTween = gsap.to(panel, {
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
      markers: false
    }
  });
});

ScrollTrigger.create({
  trigger: "#quote",
  start: "center center",
  end: "500%",
  pin: true,
  markers: false
});



// wheel code 

gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray("img.wheel-item");
const paneTexts = gsap.utils.toArray(".wheel-content .text-block");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#wheelSection",
    start: "top top",
    end: "+=200%",
    pin: true,
    scrub: true,
     snap: {
      snapTo: 1 / images.length, // snap to each image step
      duration: 0.3,
      delay: 0,
      ease: "power1.inOut"
    },
    markers: false
  },
  onComplete: () => {
    // ✅ when 2nd animation finishes, trigger 3rd
    document.getElementById("third-animation").style.display = "block";
    // startThirdAnimation();
  }
});

images.forEach((img, i) => {
  const text = paneTexts[i];

  tl.set(img, { scale: 1, display: "block", opacity: 1, visibility: "visible" }) // show instantly
    .set(text, { display: "block", opacity: 1, visibility: "visible" }, "<")     // show text instantly
    .to({}, { duration: 0.5 }) // pause so it stays visible for scroll
    .set(text, { display: "none", opacity: 0, visibility: "hidden" })            // instantly hide text
    .set(img, { display: "none", opacity: 0, visibility: "hidden" });            // instantly hide image
});

// ------------------------------------------------------------------------------- 






 

  gsap.registerPlugin(ScrollTrigger);

  // Pin first section
  ScrollTrigger.create({
    trigger: ".static-1",
    start: "top top",
    end: "+=300",   // adjust how long it stays pinned
    pin: true,
    // pinSpacing: true
  });

  // Pin video section
  ScrollTrigger.create({
    trigger: "#videoSection",
    start: "top top",
    end: "+=300",   // change value based on how long you want it pinned
    pin: true,
    // pinSpacing: true
  });

  ScrollTrigger.create({
    trigger: "#FAQ_section",
    start: "top top",
    end: "+=300",   // change value based on how long you want it pinned
    pin: true,
    // pinSpacing: true
  });


 ScrollTrigger.create({
    trigger: "#model-section2",
    start: "top top",
    end: "+=300",   // change value based on how long you want it pinned
    pin: true,
    // pinSpacing: true
  });












//  gsap.registerPlugin(ScrollTrigger);

//   let panells = gsap.utils.toArray("section");

//   panells.forEach((panell, i) => {
//     gsap.fromTo(panell, 
//       { autoAlpha: 0 }, 
//       { 
//         autoAlpha: 1,
//         duration: 0.5,
//         ease: "none",
//         scrollTrigger: {
//           trigger: panell,
//           start: "top center",   // when section reaches middle
//           end: "bottom center",  // fade out as you scroll past
//           toggleActions: "play reverse play reverse", // fade in/out
//         }
//       }
//     );
//   });



//  gsap.registerPlugin(ScrollTrigger);

//   let panells = gsap.utils.toArray(".panell");

//   // hide all except first
//   gsap.set(panells.slice(1), { display: "none" });

//   panells.forEach((panell, i) => {
//     ScrollTrigger.create({
//       trigger: panell,
//       start: "top center",
//       onEnter: () => {
//         gsap.set(panells, { display: "none" });
//         gsap.set(panell, { display: "block" });
//       },
//       onEnterBack: () => {
//         gsap.set(panells, { display: "none" });
//         gsap.set(panell, { display: "block" });
//       }
//     });
//   });