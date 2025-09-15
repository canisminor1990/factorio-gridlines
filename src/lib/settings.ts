import { LuaCustomTable, ModSetting } from 'factorio:runtime';

import { GlobalSettings, PlayerSettings } from '../const';

export class ModSettings {
  globalSettings: LuaCustomTable<string, ModSetting>;
  playerSettings: LuaCustomTable<string, ModSetting>;
  isOverridden: boolean;
  overrides?: Record<string, any>;
  constructor({
    global,
    player,
    overrides,
  }: {
    global: LuaCustomTable<string, ModSetting>;
    overrides?: Record<string, any>;
    player: LuaCustomTable<string, ModSetting>;
  }) {
    this.globalSettings = global;
    this.playerSettings = player;
    this.isOverridden = player?.[PlayerSettings('override')]?.value as boolean;
    this.overrides = overrides;
  }

  get = (...key: (string | number)[]) => {
    // Overrides take precedence if present
    const index = key.at(-1);
    const settingKey = `${key[0]}|${index}`;
    if (this.overrides && Object.prototype.hasOwnProperty.call(this.overrides, settingKey)) {
      return this.overrides[settingKey];
    }

    const guidelineSettings = this.isOverridden ? this.playerSettings : this.globalSettings;
    const SettingNamespace = this.isOverridden ? PlayerSettings : GlobalSettings;

    return guidelineSettings?.[SettingNamespace(...key)]?.value;
  };
}
