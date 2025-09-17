import * as mod_gui from 'mod-gui';

import { blockify } from './app/blockify';
import { clean } from './app/clean';
import { blockify_square_around } from './app/iterate';
import { toggled } from './app/toggled';
import {
  ensureGui,
  handleCheckboxToggle,
  handleFieldChange,
  onButtonClick,
  recreateGui,
} from './app/ui';
import {
  GUI_BUTTON_NAME,
  GUI_FLOW_NAME,
  GUI_FRAME_NAME,
  GUI_RESET_NAME,
  HOTKEY_EVENT_NAME,
  MODE_NAME,
  SHORTCUT_NAME,
} from './const';
import { Gridlines } from './lib/gridlines';
import { Player } from './lib/player';
import { storage } from './lib/storage';
import { fromXY } from './utils';

script.on_event(defines.events.on_tick, () => {
  // Early out if nobody has the shortcut visible
  let anyVisible = false;
  for (const p of game.connected_players) {
    if (p.is_shortcut_toggled(SHORTCUT_NAME)) {
      anyVisible = true;
      break;
    }
  }
  if (!anyVisible) return;

  // Per-tick discovery budget across all players (reduced)
  let remainingDiscovery = 64;

  // Process players
  for (const p of game.connected_players) {
    const player = new Player(p.index);

    player.init();

    const visible = player.raw.is_shortcut_toggled(SHORTCUT_NAME);
    if (!visible) continue;

    // Incrementally discover nearby blocks around the player's current chunk
    if (remainingDiscovery > 0) {
      const pos = player.raw.position;
      const centerChunk: [number, number] = [Math.floor(pos.x / 32), Math.floor(pos.y / 32)];
      // Smaller radius and budget
      const added = blockify_square_around(player.raw.surface, centerChunk, 8, remainingDiscovery);
      remainingDiscovery -= added;
    }

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

script.on_event(defines.events.on_player_created, (event) => {
  const player = new Player(event.player_index);
  ensureGui(player);
});

script.on_event(defines.events.on_player_joined_game, (event) => {
  const player = new Player(event.player_index);
  ensureGui(player);
});

script.on_event(defines.events.on_lua_shortcut, (event) => {
  if (event.prototype_name !== SHORTCUT_NAME) return;
  const player = new Player(event.player_index);
  player.raw.set_shortcut_toggled(SHORTCUT_NAME, toggled(player));
  const gridlines = new Gridlines(player);
  gridlines.refreshVisibility();
});

script.on_event(HOTKEY_EVENT_NAME, (event) => {
  if (event.input_name !== HOTKEY_EVENT_NAME) return;
  const player = new Player(event.player_index);
  player.raw.set_shortcut_toggled(SHORTCUT_NAME, toggled(player));
  const gridlines = new Gridlines(player);
  gridlines.refreshVisibility();
});

script.on_event(defines.events.on_runtime_mod_setting_changed, (event) => {
  log('on_runtime_mod_setting_changed');

  if (!string.match(event.setting, `^${MODE_NAME}`)) return;
  if (!event.player_index) return;

  const player = new Player(event.player_index);
  const gridlines = new Gridlines(player);

  gridlines.clean();
  // Recreate GUI captions to reflect locale/setting changes
  recreateGui(player);
});

// GUI events
script.on_event(defines.events.on_gui_click, (event) => {
  if (!event.element || !event.element.valid) return;
  const player = new Player(event.player_index);
  if (event.element.name === GUI_BUTTON_NAME) {
    onButtonClick(player);
  } else if (event.element.name === GUI_RESET_NAME) {
    // Clear UI overrides and refresh both GUI and drawings
    player.data.ui_overrides = {};
    const gridlines = new Gridlines(player);
    gridlines.clean();
    recreateGui(player);
    const flow = mod_gui.get_frame_flow(player.raw) as any;
    const newFrame = flow?.[GUI_FLOW_NAME]?.[GUI_FRAME_NAME] as any;
    if (newFrame) newFrame.visible = true;
  }
});

script.on_event(defines.events.on_gui_checked_state_changed, (event) => {
  if (!event.element || !event.element.valid) return;
  const player = new Player(event.player_index);
  handleCheckboxToggle(player, event.element);
  const gridlines = new Gridlines(player);
  gridlines.refreshVisibility();
  if (string.match(event.element.name, 'enabled') !== undefined) {
    // Also draw a batch immediately so the effect is visible without toggling global rendering
    gridlines.draw();
  }
});

script.on_event(defines.events.on_gui_text_changed, (event) => {
  if (!event.element || !event.element.valid) return;
  const player = new Player(event.player_index);
  handleFieldChange(player, event.element);
  const gridlines = new Gridlines(player);
  // Redraw from scratch to reflect geometry/thickness/color changes
  gridlines.clean();
});

// No elem change events

script.on_init(() => {
  clean();
});

script.on_configuration_changed((event) => {
  const cmc = event.mod_changes[MODE_NAME];
  if (cmc && cmc.old_version !== cmc.new_version) clean();
  // Refresh GUI for all connected players to avoid stale captions
  for (const p of game.connected_players) {
    const player = new Player(p.index);
    recreateGui(player);
  }
});
