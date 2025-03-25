/**
 * This script consolidates all auto-generated zap data into a single file with structure:
 * {<chainId>:{<lpAddress>:<allInfoObject>}}
 */
export declare function consolidateZapData(): Promise<string | undefined>;
