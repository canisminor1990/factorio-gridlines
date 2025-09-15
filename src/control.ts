import { blockify } from './app/blockify';
import { clean } from './app/clean';
import { blockify_square_around } from './app/iterate';
import { toggled } from './app/toggled';
import { HOTKEY_EVENT_NAME, MODE_NAME, SHORTCUT_NAME } from './const';
import { Gridlines } from './lib/gridlines';
import { Player } from './lib/player';
import { storage } from './lib/storage';
import { fromXY } from './utils';

script.on_event(defines.events.on_tick, () => {
  // Skip all work when globally disabled
  if (!storage.enabled) return;

  // Per-tick discovery budget across all players
  let remainingDiscovery = 128;

  // Process players
  for (const p of game.connected_players) {
    const player = new Player(p.index);

    player.init();

    // Incrementally discover nearby blocks around the player's current chunk
    if (remainingDiscovery > 0) {
      const pos = player.raw.position;
      const centerChunk: [number, number] = [Math.floor(pos.x / 32), Math.floor(pos.y / 32)];
      // Expand radius moderately; limit work with remainingDiscovery
      const added = blockify_square_around(player.raw.surface, centerChunk, 12, remainingDiscovery);
      remainingDiscovery -= added;
    }

    // Skip drawing work if shortcut hidden
    if (!player.raw.is_shortcut_toggled(SHORTCUT_NAME)) continue;

    if (player.data.covered_block_count < storage.mixed_surface_blocks.length) {
      player.data.covered_block_count++;
      const block_data = storage.mixed_surface_blocks[player.data.covered_block_count - 1];
      if (
        !game.surfaces[block_data.surface_index] ||
        !game.surfaces[block_data.surface_index].valid
      ) {
        storage.mixed_surface_blocks.splice(player.data.covered_block_count - 1, 1);
        for (const pd of Object.values(storage.players)) {
          if (pd.covered_block_count && pd.covered_block_count >= player.data.covered_block_count) {
            pd.covered_block_count--;
          }
        }
      } else {
        const gridlines = new Gridlines(player);
        gridlines.draw();
      }
    }
  }
});

script.on_event(defines.events.on_chunk_generated, (event) => {
  log('on_chunk_generated');
  blockify({ position: fromXY(event.position), surface: event.surface });
});
script.on_event(defines.events.on_surface_created, (event) => {
  log('on_surface_created');
  storage.surfaces[event.surface_index] = {};
});

script.on_event(defines.events.on_lua_shortcut, (event) => {
  if (event.prototype_name !== SHORTCUT_NAME) return;
  const player = new Player(event.player_index);
  player.raw.set_shortcut_toggled(SHORTCUT_NAME, toggled(player));
});

script.on_event(HOTKEY_EVENT_NAME, (event) => {
  if (event.input_name !== HOTKEY_EVENT_NAME) return;
  const player = new Player(event.player_index);
  player.raw.set_shortcut_toggled(SHORTCUT_NAME, toggled(player));
});

script.on_event(defines.events.on_runtime_mod_setting_changed, (event) => {
  log('on_runtime_mod_setting_changed');

  if (!string.match(event.setting, `^${MODE_NAME}`)) return;
  if (!event.player_index) return;

  const player = new Player(event.player_index);
  const gridlines = new Gridlines(player);

  gridlines.clean();
});

script.on_init(() => {
  clean();
});

script.on_configuration_changed((event) => {
  const cmc = event.mod_changes[MODE_NAME];
  if (cmc && cmc.old_version !== cmc.new_version) clean();
});
