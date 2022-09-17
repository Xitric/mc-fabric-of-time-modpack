onEvent('player.logged_in', event => {
  // Detect first login using player stages
  if (!event.player.stages.has('starting_items')) {
    event.player.stages.add('starting_items');

    event.player.give('ftbquests:book');
  }
});
