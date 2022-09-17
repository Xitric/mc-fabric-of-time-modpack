function removeRecipes(event, recipeIds) {
  recipeIds.forEach(id => {
    event.remove({
        id: id
    });
  });
}

onEvent('recipes', event => {
  removeRecipes(event, [
    'croptopia:knife',
    'farmersdelight:flint_knife',
    'farmersdelight:iron_knife',
    'farmersdelight:golden_knife',
    'farmersdelight:diamond_knife',
    'farmersdelight:netherite_knife_smithing',
  ]);

  removeRecipes(event, [
    'notreepunching:plant_string',
  ]);

  event.remove({output: 'notreepunching:plant_fiber'});
});
