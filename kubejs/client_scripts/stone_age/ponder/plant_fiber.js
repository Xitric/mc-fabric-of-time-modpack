onEvent('ponder.registry', (event) => {
  event.create([
    'notreepunching:plant_fiber',
    'notreepunching:flint_knife'
  ]).scene('plant_fiber_scene', 'Plant Fiber', 'notreepunching:plant_fiber', (scene, util) => {
    const playerEnterPos = util.grid.at(4, 0, 1);
    const playerSpawn = util.vector.topOf(playerEnterPos);
    const grassPos = util.grid.at(2, 1, 1);
    const tablePos = util.grid.at(1, 1, 1);
    const cuttingBoardPos = util.grid.at(1, 2, 1);
    const cuttingBoardItemPos = util.vector.centerOf(cuttingBoardPos).add(0, -0.4, 0);

    scene.showStructure();

    // Move in player
    const playerLink = ponderCreatePlayerEntity(scene, playerSpawn, 90);
    ponderEntityEquipItem(scene, playerLink, 'notreepunching:flint_knife');

    scene.idle(10);
    ponderEntityWalk(scene, playerLink, [-1, 0, 0], 20);

    // Present grass cutting
    scene.idle(10);
    scene.showControls(40, grassPos, 'down')
      .leftClick()
      .withItem('notreepunching:flint_knife');
    scene.text(40, 'Use your knife to cut plant fibers from tall grass', grassPos)
      .placeNearTarget()
      .attachKeyFrame();
    scene.idle(50);

    // Cut grass
    scene.addKeyframe();
    ponderEntityUseItem(scene, playerLink);
    scene.idle(5);
    scene.world.setBlock(grassPos, 'minecraft:air', true);
    let fiberEntity = scene.world.createItemEntity(grassPos, util.vector.of(-0.03, 0.2, -0.02), 'notreepunching:plant_fiber');

    scene.idle(10);
    scene.text(60, 'Not all grass has strong fibers like these, so you may need to look around a bit more', util.vector.centerOf(grassPos).add(-0.3, -0.1, -0.2))
      .placeNearTarget();
    scene.idle(70);

    // Walk to cutting board
    scene.world.setBlock(tablePos, 'twigs:stripped_bamboo_table', false);
    scene.world.setBlock(cuttingBoardPos, 'farmersdelight:cutting_board', false);
    scene.world.modifyBlock(cuttingBoardPos, (curState) => curState.with('facing', 'east'), false);

    ponderEntityWalk(scene, playerLink, [-1, 0, 0], 20);
    scene.world.modifyEntity(fiberEntity, (e) => {
      e.discard();
    });
    ponderEntityEquipItem(scene, playerLink, 'notreepunching:plant_fiber');

    // Present cutting board
    scene.idle(10);
    scene.showControls(80, cuttingBoardPos, 'down')
      .rightClick()
      .withItem('notreepunching:plant_fiber');
    scene.text(80, 'To make tool bindings from plant fiber, start by placing it on a cutting board', cuttingBoardItemPos)
      .placeNearTarget()
      .attachKeyFrame();
    scene.idle(90);

    ponderEntityUseItem(scene, playerLink);
    scene.idle(5);
    ponderEntityUnequipItem(scene, playerLink);
    scene.world.modifyTileNBT(cuttingBoardPos, (nbt) => {        
      nbt.Inventory = {
        Size: 1,
        Items: [
          {
            Slot: 0,
            id: 'notreepunching:plant_fiber',
            Count: 1,
          }
        ],
      };
    });

    // Explain the cutting board
    scene.idle(10);
    ponderEntityEquipItem(scene, playerLink, 'notreepunching:flint_knife');
    scene.showControls(40, cuttingBoardPos, 'down')
      .rightClick()
      .withItem('notreepunching:flint_knife');
    scene.text(40, 'Use a knife to cut raw fibers into useful plant string', cuttingBoardItemPos)
      .placeNearTarget()
      .attachKeyFrame();
    scene.idle(50);

    // Craft plant string
    ponderEntityUseItem(scene, playerLink);
    scene.idle(5);
    scene.world.modifyTileNBT(cuttingBoardPos, (nbt) => {        
      nbt.Inventory = {
        Size: 0,
        Items: [],
      };
    });

    scene.world.createItemEntity(cuttingBoardItemPos, util.vector.of(-0.03, 0.2, -0.02), 'notreepunching:plant_string');

    scene.text(80, 'Once again, the success rate is not 100%, so you should prioritize gathering a large amount of plant fiber', cuttingBoardItemPos)
      .placeNearTarget();
    scene.idle(90);
  });
});
