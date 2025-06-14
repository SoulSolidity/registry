/**
 * Common types for the zap system
 */
import { ChainId } from "../../types/enums";
/**
 * Represents the possible result structure from a multicall when allowFailure is true.
 */
export type MulticallResult<TResult = unknown> = {
    result: TResult;
    status: 'success';
} | {
    error: Error;
    status: 'failure';
};
/**
 * Chain names mapping
 */
export declare const ChainNames: Record<ChainId, string>;
/**
 * Supported projects
 */
export declare enum Project {
    ApeBond = "ApeBond",
    Uniswap = "Uniswap",
    PancakeSwap = "PancakeSwap",
    SushiSwap = "SushiSwap",
    QuickSwap = "QuickSwap",
    Zyberswap = "Zyberswap",
    Thena = "Thena",
    Retro = "Retro",
    Ascent = "Ascent",
    Ramses = "Ramses",
    Camelot = "Camelot",
    Lynex = "Lynex",
    SynthSwap = "SynthSwap",
    BaseX = "BaseX",
    SwapBased = "SwapBased",
    Aerodrome = "Aerodrome",
    Nile = "Nile",
    GooMoney = "GooMoney"
}
export declare enum ProjectProtocol {
    ApeBond = "ApeBond",
    LynexGauge = "LynexGauge"
}
/**
 * Supported LP types
 */
export declare enum LPType {
    UNIV2 = "univ2",
    SOLIDLY = "solidly",
    GAMMA = "gamma",
    ICHI = "ichi",
    STEER = "steer",
    SINGLE = "single",
    CURVE = "curve"
}
export interface BaseEntry {
    address: `0x${string}`;
    name: string;
}
export interface GammaEntry extends BaseEntry {
}
export interface IchiEntry extends BaseEntry {
}
export interface SteerEntry extends BaseEntry {
    periphery?: `0x${string}`;
}
export interface CurveEntry extends BaseEntry {
}
export type ProtocolEntry = BaseEntry & {
    type: LPType;
    inputTokenProject?: Project;
    inputToken: GammaEntry | IchiEntry | SteerEntry | CurveEntry | BaseEntry;
};
export interface ERC20TokenInfo {
    address: `0x${string}`;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
}
