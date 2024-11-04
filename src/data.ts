import type { PrototypeData } from 'factorio:common';
import { type CustomInputPrototype, type ShortcutPrototype } from 'factorio:prototype';

import { HOTKEY_EVENT_NAME, MODE_DIR, SHORTCUT_NAME } from './const';

declare const data: PrototypeData;

data.extend<CustomInputPrototype | ShortcutPrototype>([
  {
    consuming: 'none',
    key_sequence: 'F6',
    name: HOTKEY_EVENT_NAME,
    type: 'custom-input',
  } satisfies CustomInputPrototype,
  {
    action: 'lua',
    associated_control_input: HOTKEY_EVENT_NAME,
    icon: `${MODE_DIR}/graphics/icon/shortcut-toggle.png`,
    icon_size: 32,
    name: SHORTCUT_NAME,
    small_icon: `${MODE_DIR}/graphics/icon/shortcut-toggle.png`,
    small_icon_size: 32,
    toggleable: true,
    type: 'shortcut',
  } satisfies ShortcutPrototype,
]);
