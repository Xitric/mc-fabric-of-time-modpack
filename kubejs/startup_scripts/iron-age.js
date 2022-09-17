onEvent('item.registry', event => {
  event.create('seared_brick')
    .displayName('Seared Brick')
    .tag('balm:ingots')
    .tag('c:ingots')
    .tag('c:ingots/seared_brick')
    .group('misc');
});

onEvent('block.registry', event => {
  event.create('grout')
    .displayName('Grout')
    .material('clay')
    .hardness(0.6)
    .resistance(0.6)
    .tagBlock('minecraft:mineable/shovel')
    .tagBlock('minecraft:needs_wood_tool')
    .requiresTool(false);

  event.create('seared_bricks')
    .displayName('Seared Bricks')
    .material('rock')
    .hardness(2)
    .resistance(6)
    .tagBlock('minecraft:mineable/pickaxe')
    .tagBlock('minecraft:needs_wood_tool')
    .requiresTool(true);
});
