import { Sequelize } from "sequelize";
import fs from 'fs';
import path from 'path';
import configSet from '../config/config';

class SequelizeService {
  db = {};

  async initModels() {
    const basename = path.basename(__filename);

    const files = await fs
        .readdirSync(__dirname)
        .filter(file => {
          return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })

        const promises = files.map(async (file) => {
          const data = await import(path.join(__dirname, file))

          await data.default.init(this.db.sequelize);

          this.db[data.default.name] = data.default
        });

    await Promise.all(promises);
  }


  async connectToDatabase() {
    try {
      const env = process.env.NODE_ENV || 'development';
      const config = configSet[env]

      if (config.use_env_variable) {
        this.db.sequelize = new Sequelize(process.env[config.use_env_variable], config);
      } else {
        this.db.sequelize = new Sequelize(config.database, config.username, config.password, config);
      }

      this.db.Sequelize = Sequelize;

      await this.initModels();

      Object.keys(this.db).forEach(modelName => {
        if (this.db[modelName].associate) {
          this.db[modelName].associate(this.db);
        }
      });

      this.db.sequelize.sync()

      console.log('Connection has been established successfully.');

    }  catch (error) {
      console.log('Unable to connect to the database:', error);
    }
  }
}

export const sequelizeService = new SequelizeService();
