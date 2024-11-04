import type { SettingsData } from 'factorio:common';
import {
  BoolSettingDefinition,
  ColorSettingDefinition,
  IntSettingDefinition,
} from 'factorio:settings';

import { GlobalSettings, PlayerSettings } from './const';

declare const data: SettingsData;

const defaultValue = [
  {
    centreSize: 80,
    color: {
      a: 255,
      b: 36,
      g: 178,
      r: 255,
    },
    enabled: true,
    offsetX: 0,
    offsetY: 0,
    showCentre: true,
    showGrid: true,
    size: 96,
    spacing: 4,
    thickness: 3,
  },
  {
    centreSize: 2,
    color: {
      a: 255,
      b: 245,
      g: 114,
      r: 0,
    },
    enabled: true,
    offsetX: 8,
    offsetY: 8,
    showCentre: true,
    showGrid: false,
    size: 16,
    spacing: 0,
    thickness: 1,
  },
  {
    centreSize: 4,
    color: {
      a: 100,
      b: 255,
      g: 255,
      r: 255,
    },
    enabled: true,
    offsetX: 0,
    offsetY: 0,
    showCentre: true,
    showGrid: false,
    size: 48,
    spacing: 0,
    thickness: 1,
  },
];

const extendSettings = (type: 'runtime-per-user' | 'runtime-global', index: number) => {
  const SettingNamespace = type === 'runtime-per-user' ? PlayerSettings : GlobalSettings;

  const defaultValues = defaultValue[index - 1];

  data.extend([
    {
      default_value: defaultValues.enabled,
      name: SettingNamespace('enabled', index),
      order: `${index}-`,
      setting_type: type,
      type: 'bool-setting',
    } satisfies BoolSettingDefinition,
    {
      default_value: defaultValues.color,
      name: SettingNamespace('color', index),
      order: `${index}-a`,
      setting_type: type,
      type: 'color-setting',
    } satisfies ColorSettingDefinition,
    {
      default_value: defaultValues.thickness,
      maximum_value: 8,
      minimum_value: 1,
      name: SettingNamespace('thickness', index),
      order: `${index}-b`,
      setting_type: type,
      type: 'int-setting',
    } satisfies IntSettingDefinition,
    {
      default_value: defaultValues.showGrid,
      name: SettingNamespace('show-grid', index),
      order: `${index}-c`,
      setting_type: type,
      type: 'bool-setting',
    } satisfies BoolSettingDefinition,
    {
      default_value: defaultValues.size,
      maximum_value: 1024,
      minimum_value: 1,
      name: SettingNamespace('size', index),
      order: `${index}-d`,
      setting_type: type,
      type: 'int-setting',
    } satisfies IntSettingDefinition,
    {
      default_value: defaultValues.spacing,
      maximum_value: 1024,
      minimum_value: 0,
      name: SettingNamespace('spacing', index),
      order: `${index}-e`,
      setting_type: type,
      type: 'int-setting',
    } satisfies IntSettingDefinition,
    {
      default_value: defaultValues.offsetX,
      maximum_value: 1024,
      minimum_value: 0,
      name: SettingNamespace('offset-x', index),
      order: `${index}-f`,
      setting_type: type,
      type: 'int-setting',
    } satisfies IntSettingDefinition,
    {
      default_value: defaultValues.offsetY,
      maximum_value: 1024,
      minimum_value: 0,
      name: SettingNamespace('offset-y', index),
      order: `${index}-g`,
      setting_type: type,
      type: 'int-setting',
    } satisfies IntSettingDefinition,
    {
      default_value: defaultValues.showCentre,
      name: SettingNamespace('show-centre', index),
      order: `${index}-h`,
      setting_type: type,
      type: 'bool-setting',
    } satisfies BoolSettingDefinition,
    {
      default_value: defaultValues.centreSize,
      maximum_value: 1024,
      minimum_value: 0,
      name: SettingNamespace('centre-size', index),
      order: `${index}-i`,
      setting_type: type,
      type: 'int-setting',
    } satisfies IntSettingDefinition,
  ]);
};

data.extend([
  {
    default_value: false,
    name: GlobalSettings('draw-on-ground'),
    order: '0-a',
    setting_type: 'runtime-global',
    type: 'bool-setting',
  } satisfies BoolSettingDefinition,
]);

extendSettings('runtime-global', 1);
extendSettings('runtime-global', 2);
extendSettings('runtime-global', 3);

data.extend([
  {
    default_value: false,
    name: PlayerSettings('override'),
    order: '0-',
    setting_type: 'runtime-per-user',
    type: 'bool-setting',
  } satisfies BoolSettingDefinition,
  {
    default_value: false,
    name: PlayerSettings('draw-on-ground'),
    order: '0-a',
    setting_type: 'runtime-per-user',
    type: 'bool-setting',
  } satisfies BoolSettingDefinition,
]);

extendSettings('runtime-per-user', 1);
extendSettings('runtime-per-user', 2);
extendSettings('runtime-per-user', 3);
