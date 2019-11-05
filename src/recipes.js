import moment from 'moment'
import uuidv4 from 'uuidv4'

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
    console.log(recipe)
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

recipes = loadRecipes()

export { loadRecipes, createRecipe, getRecipes, updateRecipe }