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
    const link = e.target.getAttribute('href');
    document.querySelector(link)?.scrollIntoView({behavior: 'smooth'});
  });

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   const footerLogo = document.querySelector('.footer__logo');
  
//   setTimeout(
//   (f, b)=>f.scrollIntoView(b), 1000, footerLogo, {behavior: 'smooth'})
// }, true)



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

