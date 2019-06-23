// webpack for poor people

import fs from 'fs';
import path from 'path';
const nodeModules = path.join(__dirname, 'node_modules')
const assetsDir = path.join(__dirname, 'assets');

fs.copyFileSync(path.join(nodeModules, 'handlebars', 'dist', 'handlebars.min.js'), path.join(assetsDir, 'handlebars.min.js'));
fs.copyFileSync(path.join(nodeModules, 'moment', 'min', 'moment-with-locales.min.js'), path.join(assetsDir, 'moment.min.js'));