'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((e) => e.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scroll - button

btnScrollTo.addEventListener('click', function(e){
  // const s1coords = section1.getBoundingClientRect();
  // // window.scrollTo(s1coords.left+window.pageXOffset, s1coords.top+window.pageYOffset)
  // window.scroll({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({behavior: 'smooth'});
});

//Smooth Scroll for Link not button one by one
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     document.querySelector(this.getAttribute('href'))
//     .scrollIntoView({behavior: 'smooth'});
//   });
// });
//event delegation
document.querySelector('.nav__links')
  .addEventListener('click', function(e){
    e.preventDefault();
    const link = !e.target.classList.contains('btn--show-modal') && e.target.getAttribute('href');
    document.querySelector(link)?.scrollIntoView({behavior: 'smooth'});
  });


//Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){

  // if(e.target.classList.contains('btn')){
  //   console.log(e.target);
  // }
  // else if(e.target.parentElement.classList.contains('btn')){
  //   console.log(e.target.parentElement);
  // }
  const clicked = e.target.closest('.btn');
  if(!clicked) return;
  tabs.forEach((t)=>t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabContent.forEach((t)=>t.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


//fade-out
const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {if(el !== link) el.style.opacity = 0.5;});
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function(e){
//   const link = e.target;
//   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//   const logo = link.closest('.nav').querySelector('img');
//   siblings.forEach(el => {if(el !== link) el.style.opacity = 1;});
//   logo.style.opacity = 1;
// });

// const handlerMover = function(e, op){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {if(el !== link) el.style.opacity = op;});
//     logo.style.opacity = op;
//   }
// }

// nav.addEventListener('mouseover', function(e){
//   handlerMover(e, 0.5);
// });
// nav.addEventListener('mouseout', function(e){
//   handlerMover(e, 1);
// });

const handlerMover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {if(el !== link) el.style.opacity = this});
    // siblings.forEach(function(el) {if(el !== link) el.style.opacity = this;}, this);
    // siblings.forEach((function(el) {if(el !== link) el.style.opacity = this;}).bind(this));
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', handlerMover.bind(0.5));
nav.addEventListener('mouseout', handlerMover.bind(1));


//Sticky Navigation

// - Scroll Event
// const initCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// - Intersection Observer API
// const obsOpt = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const obsCallBack = function(entries, observer){
//   entries.forEach(entry => console.log(entry));
// };
// const obs = new IntersectionObserver(obsCallBack, obsOpt)
// obs.observe(section1);

const obsCallBack =  function(entries){
  const [entry] = entries;
  if(entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};

const navHeight = nav.getBoundingClientRect().height;

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}

const header = document.querySelector('.header');
const obs = new IntersectionObserver(obsCallBack, obsOptions);
obs.observe(header);

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   const footerLogo = document.querySelector('.footer__logo');
  
//   setTimeout(
//   (f, b)=>f.scrollIntoView(b), 1000, footerLogo, {behavior: 'smooth'})
// }, true)

//Section smooth loading
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
  const [entry] = entries;
  entry.isIntersecting && entry.target.classList.remove('section--hidden');
  entry.isIntersecting && observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//Pictures lazy loading
const imgTargets = document.querySelectorAll('img[data-src]')
const loadImg = function(entries, observer){
  const[entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', ()=>entry.target.classList.remove('lazy-img'));
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img=>imgObserver.observe(img));



//Slider
let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const maxSlides = slides.length;

slides.forEach((s, i)=>s.style.transform = `translateX(${i*100}%)`);

const slider = document.querySelector('.slider');
// slider.style.overflow = 'visible'

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
btnRight.addEventListener('click', function(){
  curSlide++;
  if(curSlide === maxSlides) curSlide = 0;
  slides.forEach((s, i)=>s.style.transform = `translateX(${i*100 - curSlide*100}%)`);
  document.querySelectorAll('.dots__dot').forEach((d)=>d.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${curSlide}"`).classList.add('dots__dot--active');
});
btnLeft.addEventListener('click', function(){
  if(curSlide === 0) curSlide = maxSlides;
  curSlide--;
  slides.forEach((s, i)=>s.style.transform = `translateX(${i*100 - curSlide*100}%)`);
  document.querySelectorAll('.dots__dot').forEach((d)=>d.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${curSlide}"`).classList.add('dots__dot--active');
});

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight'){
    curSlide++;
  if(curSlide === maxSlides) curSlide = 0;
  slides.forEach((s, i)=>s.style.transform = `translateX(${i*100 - curSlide*100}%)`)
  }
  else if(e.key === 'ArrowLeft'){
    if(curSlide === 0) curSlide = maxSlides;
  curSlide--;
  slides.forEach((s, i)=>s.style.transform = `translateX(${i*100 - curSlide*100}%)`);
  }
  document.querySelectorAll('.dots__dot').forEach((d)=>d.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${curSlide}"`).classList.add('dots__dot--active');
});

const dotContainer = document.querySelector('.dots');
const createDots = function(){
  slides.forEach((_, i)=>{
    dotContainer.insertAdjacentHTML('beforeend', 
    `<button class="dots__dot" data-slide="${i}"></button>`);
    
  });
};

createDots();


dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    curSlide = e.target.dataset.slide;
    slides.forEach((s, i)=>{
      s.style.transform = `translateX(${i*100 - curSlide*100}%)`;
    });
    document.querySelectorAll('.dots__dot').forEach((d)=>d.classList.remove('dots__dot--active'));
    e.target.classList.add('dots__dot--active');
  }
});
document.querySelectorAll('.dots__dot').forEach((d)=>d.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="0"`).classList.add('dots__dot--active');


///////////////////////////////////////////////////////////////////
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// console.log(document.getElementsByTagName('div'));
// console.log(document.head.getElementsByTagName('link'));
// console.log(document.getElementsByClassName('btn'));

// console.log(document.querySelector('#section--1'));
// console.log(document.querySelector('.nav__link'));
// console.log(document.querySelector('div'));

// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// // msg.textContent = 'We use cookies for improved functionality and analytics.';
// msg.innerHTML = 'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// // document.documentElement.prepend(msg);
// const header = document.querySelector('.header');
// // header.prepend(msg.cloneNode(true));
// header.append(msg);
// console.log(msg);
// // header.insertAdjacentElement('afterbegin', msg);
// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   // msg.parentElement.removeChild(msg);
//   msg.remove();
// });

// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%';
// // console.log(msg.style.color);
// const height = (getComputedStyle(msg).height);
// msg.style.height = Number.parseFloat(height) + 40 + 'px';
// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// // console.log(logo.alt);
// // console.log(logo.src);
// // console.log(logo.getAttribute('src'));
// // console.log(logo.designer); //not standard
// // console.log(logo.className);
// // console.log(logo.getAttribute('designer'));
// // logo.alt = 'Beautiful minimalist logo';
// // logo.setAttribute('company', 'Bankist');

// // const link = document.querySelector('.nav__link--btn');
// // console.log(link.href);
// // console.log(link.getAttribute('href'));

// logo.classList.add('class1');

// console.log(logo.className);
// logo.className += ' class2';
// console.log(logo.className);

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function(e){
//   console.log('Alert: h1 hover');
// })
// h1.onmouseenter = ()=>console.log('Alert: h1 hover by property');
// const h1Alert = ()=>{console.log('Alert: h1 hover');
  // h1.removeEventListener('mouseenter', h1Alert);
// };
// h1.addEventListener('mouseenter', h1Alert);
// setTimeout(()=>h1.removeEventListener('mouseenter', h1Alert), 5000);

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min+1) + min);
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
//   e.stopImmediatePropagation();
// });
// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.color = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
// }, true);

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('*'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.firstChild);
// console.log(h1.lastElementChild);
// // h1.lastChild.textContent = 't';
// console.log(h1.lastChild);
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header'));
// console.log(h1.closest('h1'));
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentNode.childNodes);
// console.log(h1.parentElement.childNodes);
// console.log(h1.parentElement.children);
// for (const el of h1.parentElement.children){
//   if(el !== h1){
//     el.style.transform = 'scale(0.5)';
//   }
// };


// const test = function({a= 1, b= 'c', c= true}={}){
//   console.log(a, b, c);
// }
// test();
// test({a: 4});
// test({b: 3, c: 2});

// document.addEventListener('DOMContentLoaded', (e)=> console.log(e));
// window.addEventListener('load', (e)=>console.log(e));
// window.addEventListener('beforeunload', (e)=>{
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

