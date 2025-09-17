import { SHORTCUT_NAME } from '../const';
import { Player } from '../lib/player';
import { ModSettings } from '../lib/settings';

export const toggled = (player: Player): boolean => {
  if (!player.data) return player.raw.is_shortcut_toggled(SHORTCUT_NAME);

  // Compute new visibility state for this player only
  const currentlyVisible = player.raw.is_shortcut_toggled(SHORTCUT_NAME);
  const newVisible = !currentlyVisible;

  // Background processing enable/disable is handled centrally each tick

  const modSettings = new ModSettings({
    global: settings.global,
    overrides: player.data.ui_overrides,
    player: player.settings,
  });

  // Toggle visibility of this player's existing lines without clearing global render objects
  if (player.data.grids && player.data.grids.length > 0) {
    for (const item of player.data.grids) {
      const showGrid = modSettings.get('show-grid', item.group_index) as boolean;
      const shouldShow = newVisible && showGrid;
      for (const line of item.lines) line.visible = shouldShow;
    }
  }

  if (player.data.centres && player.data.centres.length > 0) {
    for (const item of player.data.centres) {
      const showCentres = modSettings.get('show-centre', item.group_index) as boolean;
      const shouldShow = newVisible && showCentres;
      for (const line of item.lines) line.visible = shouldShow;
    }
  }

  // Do not clear or rebuild here; background drawing continues, only visibility changes per player
  return newVisible;
};
