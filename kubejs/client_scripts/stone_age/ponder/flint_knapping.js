onEvent('ponder.registry', (event) => {
  event.create('minecraft:flint')
    .scene('flint_knapping_scene', 'Knapping flint', (scene, util) => {
      const rockPos = util.grid.at(2, 1, 2);
      const rockTopPos = util.vector.topOf(rockPos);
      const playerEnterPos = util.grid.at(4, 0, 2);
      const playerSpawnPos = util.vector.topOf(playerEnterPos);
      
      scene.world.setBlock(rockPos, "minecraft:stone", false);
      scene.showStructure();

      // Move in player with flint
      const playerLink = ponderCreatePlayerEntity(scene, playerSpawnPos, 90);
      ponderEntityEquipItem(scene, playerLink, 'minecraft:flint');

      scene.idle(10);
      ponderEntityWalk(scene, playerLink, [-1, 0, 0], 20);

      // Present setting
      scene.idle(10);
      scene.showControls(40, rockPos.above(1), "down")
        .rightClick()
        .withItem("minecraft:flint");
      scene.text(40, 'Flint can be knapped against exposed rock surfaces', rockTopPos)
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Knapping fails
      scene.addKeyframe();
      ponderEntityUseItem(scene, playerLink);
      scene.idle(5);
      ponderEntityUnequipItem(scene, playerLink);

      scene.idle(10);
      scene.text(40, 'Sometimes knapping will fail, destroying the flint in the process', rockTopPos)
        .placeNearTarget();
      scene.idle(50);

      ponderEntityEquipItem(scene, playerLink, 'minecraft:flint');
      scene.idle(20);

      // Knapping succeeds
      scene.addKeyframe();
      ponderEntityUseItem(scene, playerLink);
      scene.idle(5);
      ponderEntityUnequipItem(scene, playerLink);
      scene.world.createItemEntity(rockTopPos, util.vector.of(-0.05, 0.2, -0.04), "notreepunching:flint_shard");

      scene.idle(10);
      scene.text(40, 'On successful knapping, you will acquire a flint shard', rockTopPos.add(-0.4, 0.3, -0.3))
        .placeNearTarget();
      scene.idle(50);
    });
});
