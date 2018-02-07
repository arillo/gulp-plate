import $ from 'jquery';

import factory from 'utils/factory';

import Module from 'modules/Module';
// Enable inline svgs in IE
// import svg4everybody from 'svg4everybody';

// svg4everybody();

$(document).ready(() => {
  factory(Module, '.js-module');
});
