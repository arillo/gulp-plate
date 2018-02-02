import $ from 'jquery';

export default (Cls, selector) => {
  const instances = [];
  const $els = $(selector);

  if ($els.length > 0) {
    $els.each((idx, el) => instances.push(new Cls($(el)))); // jshint ignore:line
  }
  return instances;
};
