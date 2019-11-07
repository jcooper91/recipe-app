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

    const removeLink = document.createElement('a')
    removeLink.classList.add('btn', 'btn-danger', 'removeRecipe')
    removeLink.textContent = 'Remove Recipe'

    cardTitle.insertAdjacentElement('afterend', removeLink)
    cardTitle.insertAdjacentElement('afterend', cardLink)
    
    cardLink.setAttribute('href', `./edit.html#${recipe.recipeId}`)

    removeLink.setAttribute('href', `#`)
    removeLink.setAttribute('id', `${recipe.recipeId}`)

    return cardEl
}

const renderRecipes = () => {
    const recipesEl = document.getElementById('recipes')
    const cardContainerEl = document.querySelector('.cardContainer')
    const recipeAlertEl = document.getElementById('recipeAlert')
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if(filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const newEl = generateRecipeDOM(recipe)
            cardContainerEl.appendChild(newEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to display'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
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

const alertMessage = (className, msg) => {
    const alertDiv = document.createElement('div')
    const alertText = document.createElement('p')
    const recipesEl = document.getElementById('recipes')

    alertDiv.classList.add(...className)
    alertDiv.id = 'alert-message'
    alertText.textContent = msg
    alertDiv.appendChild(alertText)
    recipesEl.insertAdjacentElement('beforebegin', alertDiv)
    removeAlert()
}

const removeAlert = () => {
    setTimeout(() => {
        const alert = document.getElementById('alert-message').remove()
    }, 2000)
}

export { renderRecipes, editRecipe, alertMessage }