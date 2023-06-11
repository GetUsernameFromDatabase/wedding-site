// @index(['./**/*.vue', /base/gi], (f, _) => {const a = _.pascalCase(f.name); return `export { default as View${a} } from '${f.path}.vue';`})
export { default as View404 } from './404.vue';
export { default as ViewIndex } from './index.vue';
export { default as ViewMaps } from './maps.vue';
export { default as ViewMarion } from './marion.vue';
export { default as ViewRyan } from './ryan.vue';
