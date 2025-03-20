import { Project } from "./enums";

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const NotFoundIcon = 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/default.png';

export const ProjectIcon: Record<Project, string> = {
    ApeBond: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/ApeBond.jpg',
    Uniswap: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
    Lynex: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
    PancakeSwap: NotFoundIcon,
    SushiSwap: NotFoundIcon,
    QuickSwap: NotFoundIcon,
    Zyberswap: NotFoundIcon,
    Thena: NotFoundIcon,
    Retro: NotFoundIcon,
    Ascent: NotFoundIcon,
    Ramses: NotFoundIcon,
    Camelot: NotFoundIcon,
    SynthSwap: NotFoundIcon,
    BaseX: NotFoundIcon,
    SwapBased: NotFoundIcon,
}