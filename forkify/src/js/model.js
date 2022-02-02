import {async} from 'regenerator-runtime';
import {API_URL, RES_PER_PAGE} from './config.js';
import {getJSON} from './helpers.js';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
};

export const loadRecipe = async function(id){
    try{
        
        const data = await getJSON(`${API_URL}${id}`);

        const {recipe} = data.data;
            state.recipe ={
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        if(state.bookmarks.some(el=>el.id === id)){
            state.recipe.bookmarked = true;
        };

    }catch(err){
        throw err;
    };
};

export const loadSearchResults = async function(query){
    try{
        const {data} = await getJSON(`${API_URL}?search=${query}`);
        state.search.query = query;
        state.search.results = data.recipes.map(recipe=>{
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        });
    }catch(err){
        throw err;
    };
};

export const getSearchResultsPage = function(page = 1){
    state.search.page = page;
    const start = (page -1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function(recipe){
    state.bookmarks.push(recipe);

    if(recipe.id === state.recipe.id){
        state.recipe.bookmarked = true;
    };
    persistBookmarks()
};

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(el=>el.id === id);
    state.bookmarks.splice(index, 1);
    if(id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
};

export const uploadRecipe = async function(newRecipe){
    const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing =>{
            const [quantity, unit, description] = ing[1].replaceAll(' ', '').split(',');
            return {quantity, unit, description};
        });
};

const inity = function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
};
inity();

