function ponderCreatePlayerEntity(scene, position, rotation) {
  const playerLink = scene.world.createEntity('minecraft:skeleton', position);
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

function ponderEntityEquipItem(scene, entityLink, item) {
  scene.world.modifyEntity(entityLink, (e) => {
    e.setItemInHand('MAIN_HAND', item);
  });
}

function ponderEntityUnequipItem(scene, entityLink) {
  scene.world.modifyEntity(entityLink, (e) => {
    e.setItemInHand('MAIN_HAND', 'minecraft:air');
  });
}

function ponderEntityUseItem(scene, entityLink) {
  scene.world.modifyEntity(entityLink, (e) => {
    e.swing('MAIN_HAND');
  });
}

function ponderEntityWalk(scene, entityLink, movementVector, ticks) {
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
