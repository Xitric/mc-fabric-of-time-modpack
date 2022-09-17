onEvent('item.tags', event => {
	event.get('c:knives')
    .add('notreepunching:flint_knife')
    .add('notreepunching:iron_knife')
    .add('notreepunching:gold_knife')
    .add('notreepunching:diamond_knife')
    .add('notreepunching:netherite_knife');

	event.get('c:tools/knives')
    .add('notreepunching:flint_knife')
    .add('notreepunching:iron_knife')
    .add('notreepunching:gold_knife')
    .add('notreepunching:diamond_knife')
    .add('notreepunching:netherite_knife');

  event.get('farmersdelight:straw_harvesters')
    .add('notreepunching:flint_knife')
    .add('notreepunching:iron_knife')
    .add('notreepunching:gold_knife')
    .add('notreepunching:diamond_knife')
    .add('notreepunching:netherite_knife');
  
  event.get('minecraft:piglin_loved')
    .add('notreepunching:gold_knife');
  
	event.get('c:hoes')
    .add('notreepunching:flint_hoe');
});
