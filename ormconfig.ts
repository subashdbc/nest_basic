import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db2.sqlite',
  synchronize: true,
  entities: ['dist/src/entities/*entity.ts'],
};

export default config;
