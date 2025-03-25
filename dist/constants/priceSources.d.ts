import { ChainId } from "../types/enums";
import { PriceSourceConfigs } from "../types/types";
export declare const priceSources: Partial<Record<ChainId, Record<string, PriceSourceConfigs[]>>>;
