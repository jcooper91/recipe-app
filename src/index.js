// import 'bootstrap'/
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { loadRecipes, createRecipe } from './recipes'
import { renderRecipes } from './views'

renderRecipes()

document.querySelector('#createRecipe').addEventListener('click', () => {
   const id = createRecipe()
   location.assign(`./edit.html#${id}`)
})




