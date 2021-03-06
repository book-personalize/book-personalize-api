import { createContainer, asClass, InjectionMode, asValue } from 'awilix'
import path from 'path'

import Application from './Application'
import {
  database,
} from './infrastructure/sequelize/models'

const container = createContainer({ injectionMode: InjectionMode.PROXY })

// register system
container.register({
  application: asClass(Application).singleton(),
  database: asValue(database),
})

// register core
container.loadModules(
  [
    'core/**/application/*Service.js',
  ],
  {
    formatName: 'camelCase',
    register: asClass,
    cwd: path.resolve(__dirname),
  },
)

// eslint-disable-next-line no-console
console.log(container)

export default container
