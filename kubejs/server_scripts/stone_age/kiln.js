function removeRecipes(event, recipeIds) {
  recipeIds.forEach(id => {
    event.remove({
        id: id
    });
  });
}

onEvent('recipes', event => {
  removeRecipes(event, [
    'alloygery:cooking/brick_from_clay_ball',
    'notreepunching:smelting/brick',
    'notreepunching:smelting/large_vessel',
    'notreepunching:campfire/large_vessel',
    'notreepunching:smelting/small_vessel',
    'notreepunching:campfire/small_vessel',
    'notreepunching:smelting/bucket',
    'notreepunching:campfire/bucket',
    'notreepunching:smelting/flower_pot',
    'notreepunching:campfire/flower_pot',
  ])
});
