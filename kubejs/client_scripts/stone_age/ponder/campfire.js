onEvent('ponder.registry', (event) => {
  event.create([
    'notreepunching:fire_starter',
    'minecraft:campfire'
  ]).scene('campfire_scene', 'Making a Campfire', (scene, util) => {
      const campfirePos = util.grid.at(2, 1, 2);
      const campfireGroundPos = util.vector.centerOf(campfirePos).add(0, -0.5, 0);
      const playerEnterPos = util.grid.at(4, 0, 2);
      const playerSpawn = util.vector.topOf(playerEnterPos);
      const dropSpawn = playerSpawn.add(-1, 0.8, 0);

      const itemDrops = [
        {
          item: 'minecraft:oak_log',
          motion: util.vector.of(-0.12, 0.1, 0),
        },
        {
          item: 'minecraft:stick',
          motion: util.vector.of(-0.14, 0.08, 0.03),
        },
        {
          item: 'minecraft:oak_sapling',
          motion: util.vector.of(-0.11, 0.12, -0.05),
        },
        {
          item: 'notreepunching:plant_fiber',
          motion: util.vector.of(-0.11, 0.1, 0.02),
        },
      ];
      const droppedItemEntities = [];

      scene.showBasePlate();

      // Move in player
      const playerLink = ponderCreatePlayerEntity(scene, playerSpawn, 90);

      scene.idle(10);
      ponderEntityWalk(scene, playerLink, [-1, 0, 0], 20);

      // Present setting
      scene.idle(10);
      scene.text(40, 'To start a campfire, throw some dry wood and three kindlings on the ground', campfireGroundPos)
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Drop wood and kindlings
      for (const drop of itemDrops) {
        ponderEntityUseItem(scene, playerLink);
        let entity = scene.world.createItemEntity(dropSpawn, drop.motion, drop.item);
        droppedItemEntities.push(entity);
        scene.idle(4);
      }

      // Exlpain fire starter
      scene.idle(10);
      ponderEntityEquipItem(scene, playerLink, 'notreepunching:fire_starter');
      scene.showControls(40, campfirePos.above(1), "down")
        .rightClick()
        .withItem("notreepunching:fire_starter");
      scene.text(40, 'Use your fire starter on the items to set them ablaze', campfirePos)
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Set ablaze
      ponderEntityUseItem(scene, playerLink);
      for (const droppedEntity of droppedItemEntities) {
        scene.world.modifyEntity(droppedEntity, (e) => {
          e.discard();
        });
      }
      scene.world.setBlock(campfirePos, "minecraft:campfire", false);
      scene.world.showSection(campfirePos, Facing.UP);
    });
});
