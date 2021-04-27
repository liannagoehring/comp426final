$(function() {
    const $root = $('#root');

    async function get_recipe(ingr) {
        str = ingr[0] + ",";
        for (var i = 1; i < ingr.length; i++) {
            if (i === ingr.length - 1) {
                str += "+" + ingr[i];
            } else {
                str += "+" + ingr[i] + ",";
            }
        }
        // const result = await axios({
        //     method: 'get',
        //     url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + str + "&apiKey=84b4bc51befa47c3a19edad6580c777e",
        // });
        // return result;
    }

    async function random_recipe() {
        // const result = await axios({
        //     method: 'get',
        //     url: "https://api.spoonacular.com/recipes/random?number=1&apiKey=84b4bc51befa47c3a19edad6580c777e"
        // });
        // return result;
        //document.getElementById('login').innerHTML = 'hey'
    }

    const handle_home_button = function(event) {
        window.location.href = "index.html";
    }

    const handle_login_button = function(event) {
        console.log('login working');
    }

    const handle_finder_button = function(event) {
        window.location.href = "./recipe_finder/index.html";
    }

    const handle_memory_button = function(event) {
        window.location.href = "./memory_game/index.html";
    }

    const handle_random_button = function(event) {
        //working
    }

   
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#login', handle_login_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#new_recipe', handle_random_button);

});

