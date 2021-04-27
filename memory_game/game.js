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

    $(function() {
        const $root = $('#root');
      
        // async function get_recipe(ingr) {
        //     str = ingr[0] + ",";
        //     for (var i = 1; i < ingr.length; i++) {
        //         if (i === ingr.length - 1) {
        //             str += "+" + ingr[i];
        //         } else {
        //             str += "+" + ingr[i] + ",";
        //         }
        //     }
        //     const result = await axios({
        //         method: 'get',
        //         url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + str + "&apiKey=84b4bc51befa47c3a19edad6580c777e",
        //     });
        //     return result;
        // }
      
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
      
        //game
      
        const handle_memory_card = function(event) {
            event.target.style.visibility = 'hidden'

        }
      
       
        $root.on('click', '.back-face', handle_memory_card);
      
      
      
     });
      
     
  
  
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);

  
 });
  
  
 