const tl = gsap.timeline({ defaults: { ease: 'power1.in' } });
gsap.registerPlugin(ScrollTrigger);


tl.to('.text', { y: '0%', duration: 1, stagger: 0.25 });
tl.to('.slider', { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to('.intro-video', { y: "-100%", duration: 1 }, "-=1");

tl.fromTo('nav', { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo('.year', { opacity: 0 }, { opacity: 1, stagger: .7, duration: 1.5 }, "-=1.4");

tl.fromTo('.stagger1', { opacity: 0 }, { opacity: 1, stagger: .3, duration: 1 }, "-=1.4");
tl.fromTo('.stagger2', { opacity: 0 }, { opacity: 1, stagger: .7, duration: 1.5 }, "-=1");
tl.fromTo('.picture-main', { opacity: 0 }, { opacity: 1, stagger: .7, duration: 2 }, "-=1.4");
// tl.fromTo('.hero', { opacity: 0 }, { opacity: 1, stagger: .3, duration: 1 }, "-=1.4");

// tl.fromTo('.p-text', { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1.4");

//gsap.from(".boxes", { duration: 5, x: 300, ease: "bounce", opacity: 0, scale: 0.5 });
gsap.from(".logo", { duration: 4, x: 300, opacity: 0, scale: 0.5 });



gsap.from(".resturant-info", {
    x: 0,
    y: 100,
    opacity: 0,
    stagger: 0.8,
    rotation: 0,
    scrollTrigger: {
        trigger: ".resturant-info",
        start: "top center",
        end: "top 100px",
    }
})


gsap.from(".menu-section", {
    x: -100,
    y: 100,
    opacity: 0,
    stagger: 0.8,
    rotation: 0,
    scrollTrigger: {
        trigger: ".menu-section",
        start: "top center",
        end: "top 100px",
    }
})


gsap.from(".menu-items", {
    x: -100,
    y: 100,
    opacity: 0,
    stagger: 0.8,
    rotation: 0,
    scrollTrigger: {
        trigger: ".menu-items",
        start: "top center",
        end: "top 100px",
    }
})


gsap.from(".bar-section", {
    x: 0,
    y: 100,
    opacity: 0,
    stagger: 0.8,
    rotation: -0,
    scrollTrigger: {
        trigger: ".bar-section",
        start: "top center",
        end: "top 100px",
    }
})

gsap.from(".image-section", {
    x: 200,
    y: 100,
    opacity: 0,
    stagger: 0.8,
    rotation: 0,
    scrollTrigger: {
        trigger: ".image-section",
        start: "top center",
        end: "top 100px",
    }
})



gsap.from(".image-text", {
    x: 0,
    y: 100,
    opacity: 0,
    stagger: 0.8,
    rotation: 0,
    scrollTrigger: {
        trigger: ".image-text",
        start: "top center",
        end: "top 100px",
    }
})



