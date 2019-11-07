import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { updateRecipe } from './recipes'
import { editRecipe } from './views'

let recipeName          = document.querySelector('#recipeName')
let recipeIngredients   = document.querySelector('#recipeIngredients') 
let healthyBtns         = document.querySelector('.healthyRadio')
const recipeId          = location.hash.substring(1)

editRecipe(recipeId)

recipeName.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title:e.target.value
    })
})

recipeIngredients.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        list:e.target.value
    })
})

healthyBtns.addEventListener('click', (e) => {
    console.log('changed')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'recipes') {
    }
})