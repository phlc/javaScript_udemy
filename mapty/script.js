'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout{
    date = new Date();
    id = String(this.date.getTime()).slice(-10);

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    };

    _setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
};

class Running extends Workout{
    type = 'running';
    clicks = 0;
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    };

    calcPace(){
        this.pace = this.duration/this.distance;
        return this.pace;
    };
  
    click(){
        this.clicks++;
    }
};

class Cycling extends Workout{
    type = 'cycling';
    clicks = 0;
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    };

    calcSpeed(){
        this.speed = this.distance/(this.duration/60);
        return this.speed;
    };
    
    click(){
        this.click++;
    }
};


class App{
    #map;
    #mapEvent;
    #workouts = [];

    constructor(){
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    };

    _getPosition(){
        navigator.geolocation
            .getCurrentPosition(this._loadMap.bind(this), e=>console.log(e));
    };

    _loadMap(pos){
        const {latitude, longitude} = pos.coords;
        console.log(latitude, longitude);
    
        this.#map = L.map('map').setView([latitude, longitude], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    
        this.#map.on('click', this._showForm.bind(this));

        this._loadLocalData();

    };

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _hideForm(){
        form.style.display = 'none';
        form.classList.add('hidden');   
        setTimeout(()=>form.style.display = 'grid', 1000);     
        inputDistance.value = inputDuration.value = 
            inputCadence.value = inputElevation.value = '';
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    };

    _newWorkout(e){
        e.preventDefault();
        
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        const isPositive = (...inputs) => inputs.every(inp=>inp>0);
        const {lat, lng} = this.#mapEvent.latlng
        let workout;

        if(type === 'running'){
            const cadence = +inputCadence.value;
            if(!distance || !duration || !cadence || !isPositive(distance, duration, cadence)){
                return alert('Inputs have to be positve numbers');
            }
            workout = new Running([lat, lng], distance, duration, cadence);
        }
        else if(type === 'cycling'){
            const elevation = +inputElevation.value;
            if(!distance || !duration || !elevation || !isPositive(distance, duration)){
                return alert('Inputs have to be positve numbers');
            }
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }
        this.#workouts.push(workout);

        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);
        this._hideForm();
        this._setLocalStorage();
    };

    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,

            }))
            .setPopupContent(`${workout.type === 'running' ?'🏃':'🚴'} ${workout.description}`)
            .openPopup();

            // console.log(workout.__proto__.constructor.name);
    };

    _renderWorkout(workout){
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ?'🏃':'🚴'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if(workout.type === 'running'){
            html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
        }
        else if(workout.type === 'cycling'){
            html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
        }

        form.insertAdjacentHTML('afterend', html);
    };

    _moveToPopup(e){
        const workoutEl = e.target.closest('.workout');
        if(!workoutEl) return;

        const  workout = this.#workouts.find((el)=>el.id === workoutEl.dataset.id);
        console.log(workout);
        workout.click();
        this.#map.setView(workout.coords, 13,{
            animate: true,
            pan: {
                duration: 1,
            }
        });
    };

    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    };

    _loadLocalData(){
        const localData = JSON.parse(localStorage.getItem('workouts'));
        if(!localData) return;
        this.#workouts = localData;
        this.#workouts.forEach(work => {
            work.type === 'running' ? work.__proto__ = Running.prototype : work.__proto__ = Cycling.prototype;
            this._renderWorkout(work);
            this._renderWorkoutMarker(work);
        });
    };

    static reset(){
        localStorage.removeItem('workouts');
        location.reload();c
    };
};

const app = new App();

