$(function() {
    const $root = $('#root');

    const handle_home_button = function(event) {
        window.location.href = "../index.html";
    }

    const handle_login_button = function(event) {
        console.log('login working');
    }

    const handle_finder_button = function(event) {
        window.location.href = "../recipe_finder/index.html";
    }

    const handle_memory_button = function(event) {
        window.location.href = "../memory_game/index.html";
    }

    const handle_res_button = function(event) {
        window.location.href = "index.html"
    }
    
    async function handle_enterzip_button() {
        const result = {
            method: 'GET',
            url: 'https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/' + $('#zip_text').val(),
            headers: {
              'x-rapidapi-key': 'e396d97664msh735bfe109983ec9p1adef1jsne9908f2113a7',
              'x-rapidapi-host': 'us-restaurant-menus.p.rapidapi.com'
            }
          };
          
          axios.request(result).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }


    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#login', handle_login_button);
    $root.on('click', '#restaurant', handle_res_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#enter_zip', handle_enterzip_button);
    
});