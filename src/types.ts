export type TabType = 'full-visual' | 'ls-visual' | 'sop' | 'ferrule' | 'simulator' | 'tc';

export type WireFilter = 'all' | 'power' | 'control' | 'earth';

export type LSFilter = 'all' | '003' | '104' | '105' | '106' | '108' | 'N';

export interface WireDetail {
  tag: string;
  code: string;
  spec: string;
  category: string;
  route: string;
  desc: string;
}

export interface LSTerminalDetail {
  name: string;
  comp: string;
  tag: string;
  ferrule: string;
  wire: string;
  volt: string;
  path: string;
  func: string;
}

export interface FerruleItem {
  code: string;
  spec: string;
  from: string;
  to: string;
  desc: string;
  type: 'power' | 'control' | 'earth' | 'neutral';
}

export interface TCCheckItem {
  id: string;
  title: string;
  category: 'cold' | 'hot';
  description: string;
}

export interface SimState {
  mccb: boolean;
  mcb: boolean;
  torTripped: boolean;
  contactorEngaged: boolean;
  motorCurrent: number;
  torSetting: number;
  supplyVoltage: number;
  phaseLoss: boolean;
  earthFault: boolean;
  thermalHeat: number;
}
