import { AppDataSource } from '../data-source';
import { Config } from '../entities/Config'; 

const configRepository = AppDataSource.getRepository(Config);
const CONFIG_ID = 1;

const getOrCreateConfig = async (): Promise<Config> => {
    let config = await configRepository.findOneBy({ id: CONFIG_ID });
    if (!config) {
        config = configRepository.create({ id: CONFIG_ID });
        await configRepository.save(config);
    }
    return config;
};

export const getConfig = async (): Promise<Config> => {
    return getOrCreateConfig();
};

export const updateConfig = async (updates: Partial<Config>): Promise<Config> => {
    const config = await getOrCreateConfig();
    
    configRepository.merge(config, updates);
    await configRepository.save(config);
    
    return config;
};