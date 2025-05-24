import { ChainId } from '../../types/enums';
declare const defaultZapInputTokens: Record<ChainId, {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string;
}[]>;
export default defaultZapInputTokens;
