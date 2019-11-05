import { getRecipes } from './recipes'
import { getFilters } from './filters'

const generateRecipeDOM = (recipe) => {
    const cardEl = document.createElement('div')
    cardEl.classList.add('card', 'recipeCard', 'card__margin-top')

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardEl.appendChild(cardBody)

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title', 'recipeTitle')
    if(recipe.title.length > 0) {
        cardTitle.textContent = recipe.title
    } else {
        cardTitle.textContent = 'Unnamed Recipe'
    }
    
    cardBody.insertAdjacentElement('beforeend', cardTitle)

    const cardLink = document.createElement('a')
    cardLink.classList.add('btn', 'btn-primary')
    cardLink.textContent = 'View Recipe'
    cardTitle.insertAdjacentElement('afterend', cardLink)
    cardLink.setAttribute('href', `./edit.html#${recipe.recipeId}`)

    return cardEl
}

const renderRecipes = () => {
    const recipesEl = document.getElementById('recipes')
    const cardContainerEl = document.querySelector('.cardContainer')
    const recipeAlertEl = document.getElementById('recipeAlert')
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    if(filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const newEl = generateRecipeDOM(recipe)
            cardContainerEl.appendChild(newEl)
        })
    } else {
        const alertEl = document.createElement('div')
        recipesEl.style.display = 'none'
        alertEl.classList.add('alert', 'alert-danger', 'text-center')
        alertEl.textContent = 'There are 0 recipes. Feel are to add one and build up your cooking skills!'
        recipeAlertEl.appendChild(alertEl)
    }
}

const editRecipe = (recipeId) => {
    const recipes = getRecipes()
    const recipeEl = recipes.find((recipe) => recipe.recipeId === recipeId)
    const recipeTitle = document.querySelector('#recipeName')
    const recipeIngredients = document.querySelector('#recipeIngredients')

    if(!recipeEl) {
        location.assign('./index.html')
    }
    
    recipeTitle.value = recipeEl.title
    recipeIngredients.value = recipeEl.list
}

export { renderRecipes, editRecipe }