import { LuaRenderObject, PlayerIndex, SurfaceIndex } from 'factorio:runtime';

export type Position = [number, number];

export interface Storage {
  enabled: boolean;
  init: boolean;
  mixed_surface_blocks: BlockData[];
  players: Record<PlayerIndex, PlayerData>;
  surfaces: Record<SurfaceIndex, Record<string, boolean>>;
}

export interface PlayerData {
  centres: { group_index: number; lines: LuaRenderObject[]; surface_index: number }[];
  covered_block_count: number;
  delete_lines: { lines: LuaRenderObject[]; surface_index: number }[];
  grids: { group_index: number; lines: LuaRenderObject[]; surface_index: number }[];
}

export interface BlockData {
  block_pos: Position;
  surface_index: SurfaceIndex;
}
