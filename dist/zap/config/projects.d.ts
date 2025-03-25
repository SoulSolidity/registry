/**
 * Project configurations
 */
import { ChainId, Project, ProjectConfig } from '../types';
/**
 * Project configurations by chain and project name
 */
export declare const projectConfigs: Partial<Record<ChainId, Partial<Record<Project, ProjectConfig>>>>;
/**
 * Get project configuration by chain ID and project name
 * @param chainId Chain ID
 * @param projectName Project name
 * @returns Project configuration or undefined if not found
 */
export declare function getProjectConfig(chainId: ChainId, projectName: Project): ProjectConfig | undefined;
/**
 * Get all project configurations for a chain
 * @param chainId Chain ID
 * @returns Object with project configurations or empty object if none found
 */
export declare function getChainProjects(chainId: ChainId): {
    [projectName: string]: ProjectConfig;
};
