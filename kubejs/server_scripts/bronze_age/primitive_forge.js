onEvent('recipes', event => {
  event.shapeless('2x kubejs:grout', ['#c:sand', '#c:gravel', 'minecraft:clay_ball']).id('xitric:grout_sparse');
  event.shapeless('8x kubejs:grout', ['4x #c:sand', '4x #c:gravel', 'minecraft:clay']).id('xitric:grout_compact');

  event.smelting('kubejs:seared_brick', 'kubejs:grout').id('xitric:seared_brick_from_smelting_grout');
  event.campfireCooking('kubejs:seared_brick', 'kubejs:grout').id('xitric:seared_brick_from_campfire_cooking_grout');

  event.shaped('kubejs:seared_bricks', [
    'SS ',
    'SS ',
    '   '
  ], {
    S: 'kubejs:seared_brick'
  }).id('xitric:seared_brick_block');
});
