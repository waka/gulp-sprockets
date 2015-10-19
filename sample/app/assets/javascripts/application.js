//= require ./common
//= require_tree ./pages

window.onload = function() {
  (new Page1()).build();
  (new Page2()).build();
  (new Common()).toJson('aaa');
};
