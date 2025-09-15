import { Player } from '../lib/player';
import { ModSettings } from '../lib/settings';
import { storage } from '../lib/storage';
import { clean } from './clean';

export const toggled = (player: Player): boolean => {
  if (!player.data) return storage.enabled;

  if (!storage.enabled) storage.enabled = false;
  storage.enabled = !storage.enabled;

  const modSettings = new ModSettings({
    global: settings.global,
    player: player.settings,
  });

  if (!storage.init && !storage.enabled) {
    clean();
    player.resetData();
  } else {
    // When disabling, schedule existing objects for destruction and hide immediately
    if (!storage.enabled) {
      player.resetData();
    }
    if (player.data.grids && player.data.grids?.length > 0)
      for (const item of player.data.grids) {
        const showGrid = modSettings.get('show-grid', item.group_index) as boolean;
        for (const line of item.lines) {
          line.visible = storage.enabled ? showGrid : false;
        }
      }

    if (player.data.centres && player.data.centres?.length > 0)
      for (const item of player.data.centres) {
        const showCentres = modSettings.get('show-centre', item.group_index) as boolean;
        for (const line of item.lines) {
          line.visible = storage.enabled ? showCentres : false;
        }
      }
  }

  return storage.enabled;
};
