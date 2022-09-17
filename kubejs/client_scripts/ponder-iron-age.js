const ponderIndexTag = 'xitric:iron_age'
const ponderIndexIcon = 'minecraft:iron_ingot'
const ponderIndexTitle = 'Iron Age'
const ponderIndexDescription = 'Technology of the iron age'

onEvent('ponder.tag', (event) => {
  event.createTag(ponderIndexTag, ponderIndexIcon, ponderIndexTitle, ponderIndexDescription, [
    'alloy_forgery:seared_bricks_forge_controller',
  ]);
});

function animateSelection(scene, selection, frameLength) {
  selection.forEach((blockPos) => {
    scene.world.showSection(blockPos, Facing.DOWN);
    scene.idle(frameLength);
  })
}

onEvent('ponder.registry', (event) => {
  event.create('alloy_forgery:seared_bricks_forge_controller')
    .scene('seared_bricks_forge_scene', 'Creating a primitive forge', (scene, util) => {
      // TODO: Extract to structure file
      scene.world.setBlocks([1, 1, 1, 3, 1, 3], 'kubejs:seared_bricks');
      scene.world.setBlocks([1, 2, 2, 1, 3, 2], 'kubejs:seared_bricks');
      scene.world.setBlocks([2, 2, 3, 2, 3, 3], 'kubejs:seared_bricks');
      scene.world.setBlocks([3, 2, 2, 3, 3, 2], 'kubejs:seared_bricks');
      scene.world.setBlocks([2, 2, 1], 'alloy_forgery:seared_bricks_forge_controller');
      scene.world.setBlocks([2, 3, 1], 'kubejs:seared_bricks');

      scene.showBasePlate();

      // Animate in forge base
      // animateSelection(scene, util.select.fromTo(1, 1, 1, 3, 1, 3), 3)
      for (let x = 1; x < 4; x++) {
        for (let z = 1; z < 4; z++) {
          scene.world.showSection([x, 1, z], Facing.DOWN);
          scene.idle(3);
        }
      }

      scene.idle(10);

      scene.text(80, 'The primitive forge starts with a solid foundation of seared bricks', [2.0, 2.5, 2.0])
        .placeNearTarget()
        .attachKeyFrame();
      
      // Animate in walls


      scene.idle(50);

      scene.world.modifyBlocks([2, 2, 1], (curState) => curState.with('lit', 'true'), false);
    });
});
