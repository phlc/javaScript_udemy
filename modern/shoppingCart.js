// Export Module
console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

export const addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice, totalQuantity as TQ};

// export default function(product, quantity){
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart`);
// };

// const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(data=>data.json());
// console.log(res);

// exports.addToCart = function(product){
//     console.log(`Added: ${product}`);
// };