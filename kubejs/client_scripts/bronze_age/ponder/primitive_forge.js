onEvent('ponder.registry', (event) => {
  event.create('alloy_forgery:seared_bricks_forge_controller')
    .scene('seared_bricks_forge_scene', 'Creating a primitive forge', 'alloy_forgery:primitive_forge', (scene, util) => {
      scene.showBasePlate();

      // Show back wall
      scene.world.showSection([0, 1, 4, 4, 4, 4], Facing.DOWN);
      scene.idle(20);

      // Animate in forge base
      for (let x = 1; x < 4; x++) {
        for (let z = 1; z < 4; z++) {
          scene.world.showSection([x, 1, z], Facing.DOWN);
          scene.idle(3);
        }
      }

      scene.idle(10);
      scene.text(40, 'The primitive forge starts with a solid foundation of seared bricks', [2.0, 2.5, 2.0])
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Animate in walls
      for (let y = 2; y < 4; y++) {
        scene.world.showSection([3, y, 2], Facing.DOWN);
        scene.idle(3);
        scene.world.showSection([2, y, 3], Facing.DOWN);
        scene.idle(3);
        scene.world.showSection([1, y, 2], Facing.DOWN);
        scene.idle(3);
      }

      scene.idle(10);
      scene.text(40, 'Build up the walls to a height of two blocks', [1.0, 4.5, 2.0])
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Place forge controller
      scene.world.showSection([2, 2, 1], Facing.DOWN);

      scene.idle(10);
      scene.text(40, 'The forge controller must be placed directly on the foundation', [2.0, 2.5, 1.0])
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);

      // Animate working forge
      scene.world.showSection([2, 3, 1], Facing.DOWN);
      scene.world.modifyBlocks([2, 2, 1], (curState) => curState.with('lit', 'true'), true);
      scene.particles.simple(200, 'smoke', [2.5, 3.5, 2.5])
        .scale(2.0)
        .density(4)
        .motion([0, 0.004, 0]);

      scene.idle(10);
      scene.text(40, 'Interact with the controller to add fuels and metals for processing', [2.0, 2.5, 1.0])
        .placeNearTarget()
        .attachKeyFrame();
      scene.idle(50);
    });
});
