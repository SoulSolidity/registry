import { ChainId } from "../../types/enums";
import { PriceSourceConfigs } from "../../types/types";
declare const priceSources: Partial<Record<ChainId, Record<string, PriceSourceConfigs>>>;
export default priceSources;
