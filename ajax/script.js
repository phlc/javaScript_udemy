'use strict';

// https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


// const getCountryData = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//         <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//     </article>
//         `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// };

const renderCountry = function(data, className = ''){
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
        `;

        countriesContainer.insertAdjacentHTML('beforeend', html);
}

// const getCountryAndNeighbour = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         renderCountry(data);


//         if(!data.borders) return;
//         const [neighbour] = data.borders;

//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function(){
//             const data = JSON.parse(this.responseText);
//             console.log(data);

//             renderCountry(data, 'neighbour');
//         })
//     });
// };


// getCountryAndNeighbour('usa');
const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
}

const getJson = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
    .then(response => response.json(),)
    .then(data =>{
        if(data.status) throw new Error(`${errorMsg} - ${data.status}`);
        return data;
    });
}

const getCountryData = function(country){
    getJson(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')
    .then((data)=> {
        renderCountry(data[0]);
        return data[0]?.borders?.at(0);
    },)
    .then(neighbour=>{
        console.log(neighbour);
        return getJson(`https://restcountries.com/v2/alpha/${neighbour}`, 'Neighbour Not Found');
    },)
    .then(neighbour => renderCountry(neighbour, 'neighbour'))
    .catch(e=>{
        renderError(`Error: ${e.message}`);
    })
    .finally(()=>countriesContainer.style.opacity = 1);
};

const whereAmI = function({lat, lng}){
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
        if(!response.ok) throw new Error('Too many requests');
        else return response.json()}
    )
    .then(data => {
        return data;
    })
    .catch(e=>console.log(`Error: ${e.message}`));
};


// const callBack = function(){
//     navigator.geolocation.getCurrentPosition(function(pos){
//         console.log(pos);
//         const coords = {lat: pos.coords.latitude, lng: pos.coords.longitude};
//         whereAmI(coords);
//     },e=>console.log(e));
// }

// whereAmI({52.508, 13.381}); 
// whereAmI({19.037, 72.873});
// whereAmI({-33.933, 18.474});
// btn.addEventListener('click', callBack);


// const lotteryPromisse = new Promise(function(resolve, reject){
//     if(Math.random() >= 0.5){
//         resolve('You Won');
//     }
//     else{
//         reject('You Lost');
//     }
// });

// lotteryPromisse
// .then(resolve=>console.log(resolve))
// .catch(error=>console.log(error));

// const wait = (seconds)=> new Promise((resolve)=>setTimeout(resolve, seconds*1000));
// wait(10).then(()=>console.log('3s'));


const myLocation = function(){
    return new Promise(function (resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    .then(res=>({lat: res.coords.latitude, lng: res.coords.longitude}))
    .catch(e=>console.log(e));
}

// btn.addEventListener('click', myLocation);

const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000);
    });
}

const imgDiv = document.querySelector('.images');
const createImage = function(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.classList.add('parallel');
        img.src = imgPath;
        img.addEventListener('load',()=>resolve(img));
        img.addEventListener('error',()=>reject(new Error('Image Not Loaded')));
    }) 
}

// createImage('img/img-1.jpg')
// .then(el=>imgDiv.append(el))
// .then(()=>wait(2))
// .then(()=>img.style.display = 'none')
// .then(()=>wait(2))
// .then(()=>createImage('img/img-2.jpg'))
// .then(el=>imgDiv.append(el))
// .then(()=>wait(2))
// .then(()=>img.style.display = 'none')
// .catch(e=>console.log(`Sorry: ${e.message}`));

const whereAmI2 = async function(country){
    try{
        country = await myLocation();
        country = await whereAmI(country)
        const stream = await fetch(`https://restcountries.com/v2/name/${country.country}`);
        const data = await stream.json();
        renderCountry(data[0]);
        countriesContainer.style.opacity = 1;

        return `You are in ${country.city}, ${country.country}`;
    }catch(err){
        console.log(`Error: ${err}`);
        throw err;
    }
};

// const city = whereAmI2('Canada');
// console.log(city);
// whereAmI2()
// .then(city=>console.log(city))
// .catch(err=>console.log(`Error: ${err.message}`))
// .finally(()=>console.log('After function'));


// (async function(){
//     try{
//         const city = await whereAmI2()
//         console.log(city);
//     }catch(err){
//         console.log(`Error: ${err}`);
//     }
// })();

const get3Countries = async function(c1, c2, c3){
    try{
    //    const [data1] = await getJson(`https://restcountries.com/v2/name/${c1}`);
    //    const [data2] = await getJson(`https://restcountries.com/v2/name/${c2}`);
    //    const [data3] = await getJson(`https://restcountries.com/v2/name/${c3}`);

    //    const data =  await Promise.all([
    //         getJson(`https://restcountries.com/v2/name/${c1}`),
    //         getJson(`https://restcountries.com/v2/name/${c2}`),
    //         getJson(`https://restcountries.com/v2/name/${c3}`)
    //     ]);

    // const data =  await Promise.race([
    //     getJson(`https://restcountries.com/v2/name/${c1}e`),
    //     getJson(`https://restcountries.com/v2/name/${c2}`),
    //     getJson(`https://restcountries.com/v2/name/${c3}`)
    // ]);

    // const data =  await Promise.any([
    //     getJson(`https://restcountries.com/v2/name/${c1}e`),
    //     getJson(`https://restcountries.com/v2/name/${c2}`),
    //     getJson(`https://restcountries.com/v2/name/${c3}`)
    // ]);

    const data =  await Promise.allSettled([
        getJson(`https://restcountries.com/v2/name/${c1}`),
        getJson(`https://restcountries.com/v2/name/${c2}y`),
        getJson(`https://restcountries.com/v2/name/${c3}`)
    ]);

        console.log(data);
    }catch(err){
        console.log(err);
    }
};

// get3Countries('Portugal', 'Canada', 'Germany');

const loadNPause = async function(path){
    try{
        img = await createImage(path);
        await wait(2);
        imgDiv.appendChild(img);
        await wait(2);
        img.style.display = 'none';
        return img;
        // await wait(2);
        // img = await createImage('img/img-2.jpg');
        // imgDiv.appendChild(img);
        // await wait(2);
        // img.style.display = 'none';
    }catch(err){
        console.log(err);
    }
};

const loadAll = async function(imgArr){
    const imgs = await /*Promise.allSettled(*/imgArr.map(async function(path){
        return await createImage(path);
    })/*)*/;
    console.dir(imgs);
    imgs.forEach(img=>img.then((img)=>imgDiv.appendChild(img)));
};

const imgArr = [];
for(let i=1; i<=3; i++){
    imgArr.push(`img/img-${i}.jpg`);
};

loadAll(imgArr);

