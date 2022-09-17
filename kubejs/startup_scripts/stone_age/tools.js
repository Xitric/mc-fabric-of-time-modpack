onEvent('item.modification', event => {
  event.modify('notreepunching:flint_pickaxe', item => {
    item.tier = tierOptions => {
      tierOptions.level = 0;
    };
  });
});
