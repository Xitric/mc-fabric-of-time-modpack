function removeRecipes(event, recipeIds) {
  recipeIds.forEach(id => {
    event.remove({
        id: id
    });
  });
}


onEvent('recipes', event => {
  removeRecipes(event, [
    'alloy_forgery:bricks_forge'
  ]);
});
