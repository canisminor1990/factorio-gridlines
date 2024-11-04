import { LuaCustomTable, ModSetting } from 'factorio:runtime';

import { GlobalSettings, PlayerSettings } from '../const';

export class ModSettings {
  globalSettings: LuaCustomTable<string, ModSetting>;
  playerSettings: LuaCustomTable<string, ModSetting>;
  isOverridden: boolean;
  constructor({
    global,
    player,
  }: {
    global: LuaCustomTable<string, ModSetting>;
    player: LuaCustomTable<string, ModSetting>;
  }) {
    this.globalSettings = global;
    this.playerSettings = player;
    this.isOverridden = player?.[PlayerSettings('override')]?.value as boolean;
  }

  get = (...key: (string | number)[]) => {
    const guildelineSettings = this.isOverridden ? this.playerSettings : this.globalSettings;
    const SettingNamespace = this.isOverridden ? PlayerSettings : GlobalSettings;

    return guildelineSettings?.[SettingNamespace(...key)]?.value;
  };
}
