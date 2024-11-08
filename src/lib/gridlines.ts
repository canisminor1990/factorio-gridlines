import { Color } from 'factorio:runtime';

import { chunky } from '../app/chunky';
import { clean } from '../app/clean';
import { BLOCK_SIZE, LAYERS_COUNT, MODE_NAME, SHORTCUT_NAME } from '../const';
import { add, makeLen2, mult } from '../utils';
import { Player } from './player';
import { ModSettings } from './settings';
import { storage } from './storage';

export class Gridlines {
  player: Player;
  constructor(player: Player) {
    this.player = player;
  }
  clean = () => {
    if (storage.init) {
      rendering.clear(MODE_NAME);
      this.player.resetData();
    } else {
      clean();
    }
  };
  draw = () => {
    const player = this.player;
    const modSettings = new ModSettings({
      global: settings.global,
      player: player.settings,
    });

    const drawOnGround = modSettings.get('draw-on-ground') as boolean;
    const visible = player.raw.is_shortcut_toggled(SHORTCUT_NAME);

    for (let g = LAYERS_COUNT; g >= 1; g--) {
      const settingEnabled = modSettings.get('enabled', g) as boolean;
      if (!settingEnabled) continue;

      const color = modSettings.get('color', g) as Color;
      const thickness = modSettings.get('thickness', g) as number;

      const settingSize = modSettings.get('size', g) as number;
      const settingSpacing = modSettings.get('spacing', g) as number;
      const settingOffsetX = modSettings.get('offset-x', g) as number;
      const settingOffsetY = modSettings.get('offset-y', g) as number;

      const size = makeLen2([settingSize, settingSize]);

      const spacing = makeLen2([
        Math.min(settingSpacing, Math.floor(settingSize / 2)),
        Math.min(settingSpacing, Math.floor(settingSize / 2)),
      ]);

      const offset = makeLen2([
        Math.min(settingOffsetX, settingSize),
        Math.min(settingOffsetY, settingSize),
      ]);

      const showGrid = modSettings.get('show-grid', g) as boolean;
      if (settingSize > 0) {
        const block = {
          bottomRight: mult(add(player.blockData.block_pos, [1, 1]), BLOCK_SIZE),
          topLeft: mult(player.blockData.block_pos, BLOCK_SIZE),
        };
        const lines = chunky({
          bottomRight: block.bottomRight,
          color,
          drawOnGround,
          offset,
          player: player.raw,
          size,
          spacing,
          surface: player.blockData.surface_index,
          thickness,
          topLeft: block.topLeft,
          visible: visible ? showGrid : false,
        });

        player.data.grids.push({
          group_index: g,
          lines: lines,
          surface_index: player.blockData.surface_index,
        });

        // Draw centre mark
        const showCentre = modSettings.get('show-centre', g) as boolean;
        const centreMarkSizeSetting = modSettings.get('centre-size', g) as number;

        if (
          centreMarkSizeSetting > 0 &&
          centreMarkSizeSetting < Math.min(Math.min(...size) - Math.min(...spacing) * 2)
        ) {
          const centreMarkSpacing: [number, number] = [
            Math.floor((size[0] - centreMarkSizeSetting) / 2),
            Math.floor((size[1] - centreMarkSizeSetting) / 2),
          ];
          const lines = chunky({
            bottomRight: block.bottomRight,
            color,
            drawOnGround,
            offset,
            player: player.raw,
            size,
            spacing: centreMarkSpacing,
            surface: player.raw.surface_index,
            thickness,
            topLeft: block.topLeft,
            visible: visible ? showCentre : false,
          });
          player.data.centres.push({
            group_index: g,
            lines: lines,
            surface_index: player.blockData.surface_index,
          });
        }
      }
    }
  };
}
