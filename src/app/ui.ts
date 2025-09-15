import { LuaGuiElement } from 'factorio:runtime';
import * as mod_gui from 'mod-gui';

import {
  GUI_BUTTON_NAME,
  GUI_CONTENT_FLOW_NAME,
  GUI_FLOW_NAME,
  GUI_FRAME_NAME,
  GUI_PREFIX_CHECKBOX,
  GUI_PREFIX_TEXTFIELD,
  GUI_RESET_NAME,
  GUI_TITLEBAR_FLOW_NAME,
  LAYERS_COUNT,
  MODE_NAME,
} from '../const';
import { Player } from '../lib/player';
import { ModSettings } from '../lib/settings';

const makeCheckboxName = (key: string, index: number) => `${GUI_PREFIX_CHECKBOX}-${key}|${index}`;
const makeFieldName = (key: string, index: number) => `${GUI_PREFIX_TEXTFIELD}-${key}|${index}`;
const settingNameKey = (name: string, index?: number) =>
  index ? `mod-setting-name.gridlines-${name}-${index}` : `mod-setting-name.gridlines-${name}`;
// no elem buttons currently

export const ensureGui = (player: Player) => {
  const p = player.raw;

  // Ensure button in top-left (mod-gui)
  const buttonFlow = mod_gui.get_button_flow(p);
  if (!buttonFlow[GUI_BUTTON_NAME]) {
    buttonFlow.add({
      name: GUI_BUTTON_NAME,
      sprite: `${MODE_NAME}-gui-button`,
      tooltip: ['mod-name.gridlines'],
      type: 'sprite-button',
    });
  }

  // Ensure settings frame container exists but hidden by default
  const frameFlow = mod_gui.get_frame_flow(p);
  let flow = frameFlow[GUI_FLOW_NAME] as LuaGuiElement | undefined;
  if (!flow) {
    flow = frameFlow.add({ direction: 'vertical', name: GUI_FLOW_NAME, type: 'flow' });
  }

  let frame = flow[GUI_FRAME_NAME] as LuaGuiElement | undefined;
  if (!frame) {
    frame = flow.add({
      direction: 'vertical',
      name: GUI_FRAME_NAME,
      type: 'frame',
    });

    // Titlebar with reset button aligned to the right
    const titlebar = frame.add({
      direction: 'horizontal',
      name: GUI_TITLEBAR_FLOW_NAME,
      type: 'flow',
    });
    titlebar.add({
      caption: ['mod-name.gridlines'],
      ignored_by_interaction: true,
      style: 'frame_title',
      type: 'label',
    });
    // Stretchable spacer imitates Factorio titlebar layout
    const spacer = titlebar.add({
      ignored_by_interaction: true,
      style: 'draggable_space_header',
      type: 'empty-widget',
    });
    (spacer as any).style.horizontally_stretchable = true;
    (spacer as any).style.vertically_stretchable = true;
    titlebar.add({
      name: GUI_RESET_NAME,
      sprite: 'utility/reset',
      style: 'tool_button_red',
      tooltip: ['ui.reset-tooltip'],
      type: 'sprite-button',
    });

    const content = frame.add({
      direction: 'horizontal',
      name: GUI_CONTENT_FLOW_NAME,
      type: 'flow',
    });

    const modSettings = new ModSettings({
      global: settings.global,
      overrides: player.data.ui_overrides,
      player: player.settings,
    });

    for (let i = 1; i <= LAYERS_COUNT; i++) {
      const group = content.add({
        caption: [`ui.layer-${i}`],
        direction: 'vertical',
        type: 'frame',
      });

      const toggles = group.add({ direction: 'horizontal', type: 'flow' });
      toggles.add({
        caption: ['ui.enabled'],
        name: makeCheckboxName('enabled', i),
        state: modSettings.get('enabled', i) as boolean,
        type: 'checkbox',
      });
      toggles.add({
        caption: [settingNameKey('show-grid', i)],
        name: makeCheckboxName('show-grid', i),
        state: modSettings.get('show-grid', i) as boolean,
        type: 'checkbox',
      });
      toggles.add({
        caption: [settingNameKey('show-centre', i)],
        name: makeCheckboxName('show-centre', i),
        state: modSettings.get('show-centre', i) as boolean,
        type: 'checkbox',
      });

      const fields = group.add({ column_count: 2, type: 'table', vertical_centering: true });

      fields.add({ caption: [settingNameKey('size', i)], type: 'label' });
      fields.add({
        name: makeFieldName('size', i),
        text: tostring(modSettings.get('size', i) as number),
        type: 'textfield',
      });

      fields.add({ caption: [settingNameKey('spacing', i)], type: 'label' });
      fields.add({
        name: makeFieldName('spacing', i),
        text: tostring(modSettings.get('spacing', i) as number),
        type: 'textfield',
      });

      fields.add({ caption: [settingNameKey('thickness', i)], type: 'label' });
      fields.add({
        name: makeFieldName('thickness', i),
        text: tostring(modSettings.get('thickness', i) as number),
        type: 'textfield',
      });

      fields.add({ caption: [settingNameKey('offset-x', i)], type: 'label' });
      fields.add({
        name: makeFieldName('offset-x', i),
        text: tostring(modSettings.get('offset-x', i) as number),
        type: 'textfield',
      });

      fields.add({ caption: [settingNameKey('offset-y', i)], type: 'label' });
      fields.add({
        name: makeFieldName('offset-y', i),
        text: tostring(modSettings.get('offset-y', i) as number),
        type: 'textfield',
      });

      fields.add({ caption: [settingNameKey('centre-size', i)], type: 'label' });
      fields.add({
        name: makeFieldName('centre-size', i),
        text: tostring(modSettings.get('centre-size', i) as number),
        type: 'textfield',
      });
    }
  }

  frame.visible = false;
};

export const onButtonClick = (player: Player) => {
  const p = player.raw;
  const flow = mod_gui.get_frame_flow(p)[GUI_FLOW_NAME] as LuaGuiElement | undefined;
  const frame = flow?.[GUI_FRAME_NAME] as LuaGuiElement | undefined;
  // If visible, just hide. If not visible or missing, rebuild the frame freshly with i18n.
  if (frame && frame.visible) {
    frame.visible = false;
    return;
  }
  // Recreate only the frame section so captions/locales are always up-to-date
  const frameFlow = mod_gui.get_frame_flow(p);
  const oldFlow = frameFlow[GUI_FLOW_NAME] as LuaGuiElement | undefined;
  if (oldFlow && oldFlow.valid) oldFlow.destroy();
  ensureGui(player);
  const newFlow = mod_gui.get_frame_flow(p)[GUI_FLOW_NAME] as LuaGuiElement | undefined;
  const newFrame = newFlow?.[GUI_FRAME_NAME] as LuaGuiElement | undefined;
  if (newFrame) newFrame.visible = true;
};

export const handleCheckboxToggle = (player: Player, element: LuaGuiElement) => {
  if (!element.valid || element.type !== 'checkbox') return;
  const name = element.name as string;
  if (!name.startsWith(`${GUI_PREFIX_CHECKBOX}-`)) return;
  const rest = name.slice(`${GUI_PREFIX_CHECKBOX}-`.length);
  const parts = rest.split('|');
  const key = parts[0];
  const index = Number(parts[1]);

  if (!player.data.ui_overrides) player.data.ui_overrides = {};
  player.data.ui_overrides[`${key}|${index}`] = (element as any).state as boolean;
};

export const handleFieldChange = (player: Player, element: LuaGuiElement) => {
  if (!element.valid || element.type !== 'textfield') return;
  const name = element.name as string;
  if (!name.startsWith(`${GUI_PREFIX_TEXTFIELD}-`)) return;
  const rest = name.slice(`${GUI_PREFIX_TEXTFIELD}-`.length);
  const parts = rest.split('|');
  const key = parts[0];
  const index = Number(parts[1]);

  if (!player.data.ui_overrides) player.data.ui_overrides = {};

  const parseIntInRange = (v: string, min: number, max: number) => {
    const n = Number(v);
    if (isNaN(n)) return undefined;
    return Math.max(min, Math.min(max, Math.floor(n)));
  };

  // color is not configured here anymore

  const ranges: Record<string, [number, number]> = {
    'centre-size': [0, 1024],
    'offset-x': [0, 1024],
    'offset-y': [0, 1024],
    'size': [1, 1024],
    'spacing': [0, 1024],
    'thickness': [1, 8],
  };

  const range = ranges[key];
  if (!range) return;
  const value = parseIntInRange((element as any).text as string, range[0], range[1]);
  if (value === undefined) return;
  player.data.ui_overrides[`${key}|${index}`] = value;
};

// no elem change handlers

export const recreateGui = (player: Player) => {
  const p = player.raw;
  const buttonFlow = mod_gui.get_button_flow(p);
  const oldButton = buttonFlow[GUI_BUTTON_NAME] as LuaGuiElement | undefined;
  if (oldButton && oldButton.valid) oldButton.destroy();

  const frameFlow = mod_gui.get_frame_flow(p);
  const oldFlow = frameFlow[GUI_FLOW_NAME] as LuaGuiElement | undefined;
  if (oldFlow && oldFlow.valid) oldFlow.destroy();

  ensureGui(player);
};
