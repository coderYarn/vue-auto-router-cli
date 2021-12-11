const getFolder = require("./getFolder.js");

let routes = getFolder();
const baseTempLate = `{{#each children}}
  {
    path: '{{path}}',
    name: '{{name}}',
    component: () => import('{{component}}'),
  }
{{/each}}`;

function template(routes) {
  let temp = "";
  routes.forEach((element) => {
    if (element.children) {
      temp = `
      {{#if children}}
      children:[
        ${baseTempLate}
      ]
      {{/if}}`;
    }
  });
  return temp;
}

module.exports = `
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
mode: 'history',
base: process.env.BASE_URL,
routes: [
  {{#each routes}}
  {
    path: '{{path}}',
    name: '{{name}}',
    component: () => import('{{component}}'),
    ${template(routes)}
  },
  {{/each}}
]
})`;
