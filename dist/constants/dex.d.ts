import { ChainId } from '../types/enums';
import { DexConfig } from '../types/types';
declare const dexFactories: Partial<Record<ChainId, DexConfig[]>>;
export default dexFactories;
