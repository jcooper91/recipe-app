import moment from 'moment'
import uuidv4 from 'uuidv4'
import { alertMessage } from './views'

let recipes = []

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const loadRecipes = () => {
    let recipesJSON = localStorage.getItem('recipes')
    return recipesJSON ? JSON.parse(recipesJSON) : []
}

const getRecipes = () => recipes

const createRecipe = () => {
    let recipeId = uuidv4()
    let timestamp = moment().valueOf()
    recipes.push({
        recipeId,
        title: '',
        list: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveRecipes()
    return recipeId
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => id === recipe.recipeId)
    if(!recipe) return 

    if(typeof updates.title === 'string') {
        recipe.title = updates.title
        recipe.updatedAt = moment().valueOf()
    }

    if(typeof updates.list === 'string') {
        recipe.list = updates.list
        recipe.updatedAt = moment().valueOf()
    }
    saveRecipes()
    return recipe
}

const removeRecipe = (recipeId) => {
    const recipeEl = recipes.findIndex((recipe) => recipe.recipeId === recipeId)
    const confirmRemove = confirm("Are you sure you would like to delete this recipe?")

    if(recipeEl > -1 && confirmRemove === true) {
        recipes.splice(recipeEl, 1)
        alertMessage(['alert', 'alert-danger'], 'Recipe has been deleted')
        saveRecipes()
    }
}

recipes = loadRecipes()

export { loadRecipes, createRecipe, getRecipes, updateRecipe, removeRecipe }