import { Injectable } from '@nestjs/common';
import { ConfigurationService } from './config.service';

@Injectable()
export class TypeOrmConfigService {
  constructor(private readonly configs: ConfigurationService) {}

  createTypeOrmOptions() {
    const options = {
      type: 'postgres',
      host: this.configs.databaseHost,
      port: this.configs.databasePort,
      username: this.configs.databaseUser,
      password: this.configs.databasePassword,
      database: this.configs.databaseName,
      entities: [this.configs.baseFolder + '/modules/**/*.entity{.ts,.js}'],
      migrations: [this.configs.baseFolder + '/migration/**/*{.ts,.js}'],
      cli: {
        migrationsDir: this.configs.baseFolder + '/migration',
      },
      subscribers: [
        this.configs.baseFolder + '/modules/**/*.subscriber{.ts,.js}',
      ],
      synchronize: false,
      migrationsRun: this.configs.typeormMigrationsrun,
      logging: this.configs.typeormLogging,
    };

    return options;
  }
}
