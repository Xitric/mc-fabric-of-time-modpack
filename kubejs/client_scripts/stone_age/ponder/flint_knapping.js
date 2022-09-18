function createPlayer(scene, position, rotation) {
  const playerLink = scene.world.createEntity("minecraft:skeleton", position);
  scene.world.modifyEntity(playerLink, (player) => {
    player.setItemSlot('HEAD', 'minecraft:player_head');
    player.setItemSlot('CHEST', 'minecraft:leather_chestplate');
    player.setItemSlot('LEGS', 'minecraft:leather_leggings');
    player.setItemSlot('FEET', 'minecraft:leather_boots');

    if (rotation) {
      player.setYRot(rotation);
      player.setYBodyRot(rotation);
      player.setYHeadRot(rotation);
    }
  });

  return playerLink;
}

function equipItem(scene, entityLink, item) {
  scene.world.modifyEntity(entityLink, (e) => {
    e.setItemInHand('MAIN_HAND', item);
  });
}

function unequipItem(scene, entityLink) {
  scene.world.modifyEntity(entityLink, (e) => {
    e.setItemInHand('MAIN_HAND', 'minecraft:air');
  });
}

function useItem(scene, entityLink) {
  scene.world.modifyEntity(entityLink, (e) => {
    e.swing('MAIN_HAND');
  });
}

function walkEntity(scene, entityLink, movementVector, ticks) {
  let dx = movementVector[0] / ticks;
  let dy = movementVector[1] / ticks;
  let dz = movementVector[2] / ticks;

  for (let i = 0; i < ticks; i++) {
    scene.world.modifyEntity(entityLink, (e) => {
      e.move('SELF', [dx, dy, dz]);
    });
    scene.idle(1);
  }

  scene.world.modifyEntity(entityLink, (e) => {
    e.moveTo(e.getPosition(1));
  });
}

onEvent('ponder.registry', (event) => {
  event.create('minecraft:flint')
    .scene('flint_knapping_scene', 'Knapping flint', (scene, util) => {
      const rockPos = util.grid.at(2, 1, 2);
      const rockTop = util.vector.topOf(rockPos);      
      const playerEnterPos = util.grid.at(4, 0, 2);
      const playerSpawn = util.vector.topOf(playerEnterPos);
      
      scene.world.setBlock(rockPos, "minecraft:stone", false);
      scene.showStructure();

      // Move in player with flint
      const playerLink = createPlayer(scene, playerSpawn, 90);
      equipItem(scene, playerLink, 'minecraft:flint');

      scene.idle(10);
      walkEntity(scene, playerLink, [-1, 0, 0], 20);

      // Present setting
      scene.idle(10);
      scene.showControls(40, rockPos.above(1), "down")
        .rightClick()
        .withItem("minecraft:flint");
      scene.text(40, 'Flint can be knapped against exposed rock surfaces', rockTop)
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Knapping fails
      scene.addKeyframe();
      useItem(scene, playerLink);
      scene.idle(5);
      unequipItem(scene, playerLink);

      scene.idle(10);
      scene.text(40, 'Sometimes knapping will fail, destroying the flint in the process', rockTop)
        .placeNearTarget();
      scene.idle(50);

      equipItem(scene, playerLink, 'minecraft:flint');
      scene.idle(20);

      // Knapping succeeds
      scene.addKeyframe();
      useItem(scene, playerLink);
      scene.idle(5);
      unequipItem(scene, playerLink);
      scene.world.createItemEntity(rockTop.add(0, 0, 0), util.vector.of(-0.05, 0.2, -0.04), "notreepunching:flint_shard");

      scene.idle(10);
      scene.text(40, 'On successful knapping, you will acquire a flint shard', rockTop.add(-0.4, 0.3, -0.3))
        .placeNearTarget();
      scene.idle(50);
    });
});
