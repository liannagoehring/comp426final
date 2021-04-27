$(function() {
    const $root = $('#root');
  
    const handle_home_button = function(event) {
        window.location.href = "../index.html";
    }
  
    const handle_finder_button = function(event) {
        window.location.href = "../recipe_finder/index.html";
    }
  
    const handle_memory_button = function(event) {
        window.location.href = "index.html";
    }
  
  
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
  
 });
  
  
 