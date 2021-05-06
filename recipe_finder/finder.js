$(function() {
    const $root = $('#root');
  
    const handle_home_button = function(event) {
        window.location.href = "../index.html";
    }
  
    const handle_finder_button = function(event) {
        window.location.href = "index.html";
    }
  
    const handle_memory_button = function(event) {
        window.location.href = "../memory_game/index.html";
    }
  
    const handle_res_button = function(event) {
        window.location.href = "../restaurant_locator/index.html"
    }
  
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#restaurant', handle_res_button);
  
 });
  
  
 