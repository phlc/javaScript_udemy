import {addToCart, TQ, totalPrice, cart} from './shoppingCart.js';

console.log("Importing Module");

// console.log(shippingCost);
addToCart('bread', 5);
console.log(totalPrice, TQ);
cart.forEach((item)=>console.log(item));

// import * as Shop from './shoppingCart.js'

// Shop.addToCart('bread', 5);
// console.log(Shop.totalPrice, Shop.TQ);

// import add from './shoppingCart.js';

// add('bread', 4);

// console.log(Shop.cart);

// const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(data=>data.json());
// console.log(res);

// console.log('Await blocked CL');

// const getLastPost = async function(){
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(data=>data.json());
//     console.log(res);
//     return {title: res.at(-1).title, text: res.at(-1).body}
// };

// const lastPost = await getLastPost();
// console.log(lastPost);
// console.log('After fetch');

// const api = (function(){
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;
//     const addToCart = function(product, quantity){
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart`);
//     };
//     const orderStock = function(product, quantity){
//         console.log(`${quantity} ${product} ordered from supplier`);
//     };
//     return{
//         addToCart,
//         totalPrice,
//         orderStock,
//         cart
//     }
// })();

// api.addToCart('bread', 2);
// console.log(api.cart);

// const {addToCart} = require('./shoppingCart.js');

// addToCart('Bread')

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from 'lodash-es';

const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 5},
    ],
    user: {loggedIn: true},
};

const stateClone = Object.assign({}, state);

console.log(stateClone.user);
state.user.loggedIn = false;
console.log(stateClone.user);


const stateDeepClone = cloneDeep.cloneDeep(state);
console.log(stateDeepClone.user);
state.user.loggedIn = true;
console.log(stateDeepClone.user);
console.log('End');


class Person{
    greetings = 'Hey';
    constructor(name){
        this.name = name;
        console.log(`${this.greetings}, ${name}`);
    }
}

if(module.hot){
    module.hot.accept()
}

const jonas = new Person('Jonas');
console.log(cart.find((el)=>el.quantity>2));

import 'core-js/stable'


