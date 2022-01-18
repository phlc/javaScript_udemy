'use strict'
const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function(){
    this.speed+=10;
    console.log(`Not Eletric at ${this.speed}km/h`);
};

Car.prototype.brake = function(){
    this.speed-=5;
    console.log(`${this.make} at ${this.speed}km/h`);
};

// const bmw = new Car('bmw', 120);
// const mercedes = new Car('mercedes', 95);

// console.log(bmw, mercedes);
// bmw.accelerate();
// mercedes.brake();
// console.log(bmw, mercedes);

class CarCl{
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }
    accelerate(){
        this.speed+=10;
        console.log(this.speed);
    }
    brake(){
        this.speed-=5;
        console.log(this.speed);
        return this;
    }

    get speedUS(){
        return this.speed/1.6;
    }

    set speedUS(speed){
        this.speed = speed*1.6;
    }
    
}

// const ford = new CarCl('Ford', 120);
// ford.accelerate();
// console.log(ford);
// console.log(ford.speedUS);
// ford.speedUS = 100;
// console.log(ford);
// ford.brake();

// const Ev = function(make, speed, charge){
//     Car.call(this, make, speed);
//     this.charge = charge;
// };
// Ev.prototype = Object.create(Car.prototype);
// Ev.prototype.chargeBattery = function(chargeTo){
//     this.charge = chargeTo;
// };
// Ev.prototype.accelerate = function(){
//     this.speed += 20;
//     this.charge--;
//     console.log(`Tesla going at ${this.speed} km/h, with a charge of ${this.charge}%`);
// };
// Ev.prototype.constructor = Ev;

// const ford = new Car('Ford', 10);
// const tesla = new Ev('Tesla', 120, 23);
// ford.accelerate();
// tesla.accelerate();
// ford.brake();
// tesla.brake();
// console.dir(ford);
// console.dir(tesla);

class EvCl extends CarCl{
    #charge;

    constructor(make, speed, charge){
        super(make, speed);
        this.#charge = charge;
    };

    accelerate(){
        this.speed += 10;
        this.#charge--;
        console.log(`Tesla going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    };

    chargeBattery(){
        this.#charge++;
        console.log(`battery at ${this.#charge}`);
        return this;
    };
};

const tesla = new EvCl('Tesla', 120, 23);
console.log(tesla.speedUS);
tesla.accelerate();
tesla.accelerate().chargeBattery().brake().brake();
console.dir(tesla);