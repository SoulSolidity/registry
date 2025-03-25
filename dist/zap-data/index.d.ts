import { ChainId } from '../types/enums';
import { ZapInfo } from './types/types';
declare const zapData: Record<ChainId, Record<`0x${string}`, ZapInfo>>;
export default zapData;
