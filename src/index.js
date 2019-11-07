// import 'bootstrap'/
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { loadRecipes, createRecipe, removeRecipe } from './recipes'
import { renderRecipes } from './views'
import { updateFilters } from './filters'

renderRecipes()

document.querySelector('#createRecipe').addEventListener('click', () => {
   const id = createRecipe()
   location.assign(`./edit.html#${id}`)
})

document.querySelector('#filterRecipes').addEventListener('input', (e) => {
    updateFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

document.querySelector('#recipes').addEventListener('click', (e) => {
    const removeBtn = e.target.closest('a')
    if(removeBtn.textContent === 'Remove Recipe') {
        removeRecipe(e.target.id)
        renderRecipes()
    } else {
        return
    }
})





