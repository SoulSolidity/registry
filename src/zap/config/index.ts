/**
 * Export all configurations
 */

export * from './chains';
export * from './projects';

/**
 * Default configuration
 */
import { chainConfigs } from './chains';
import { projectConfigs } from './projects';
import { Config } from '../types';

export const config: Config = {
  chains: chainConfigs,
  projects: projectConfigs,
}; 