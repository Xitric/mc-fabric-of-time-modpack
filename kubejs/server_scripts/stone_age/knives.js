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
    'notreepunching:plant_fiber_from_saplings_with_knife',
    'notreepunching:plant_fiber_from_leaves_with_knife',
    'notreepunching:plant_fiber_from_vines_with_knife',
    'notreepunching:plant_fiber_from_cactus_with_knife',
    'notreepunching:plant_fiber_from_small_flowers_with_knife',
    'notreepunching:plant_fiber_from_tall_flowers_with_knife',
    'notreepunching:plant_fiber_from_wheat_with_knife',
    'notreepunching:plant_fiber_from_sugarcane_with_knife',
  ]);
});
