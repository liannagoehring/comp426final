$(function() {
    const $root = $('#root');
    const $recipes_found = $('#recipes_found')
  
    async function get_recipe(ingr) {
        str = ingr[0] + ",";
        for (var i = 1; i < ingr.length; i++) {
            if (i === ingr.length - 1) {
                str += "+" + ingr[i];
            } else {
                str += "+" + ingr[i] + ",";
            }
        }
        const result = await axios({
            method: 'get',
            url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + str + "&apiKey=84b4bc51befa47c3a19edad6580c777e",
        });
        return result.data;
    }

    async function info(id) {
        const result = await axios({
            method: 'get',
            url: "https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false&apiKey=84b4bc51befa47c3a19edad6580c777e",
        });
        return result.data;
    }

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

    const handle_enter_ingr = function(event) {
        while (document.getElementById('recipes_found').firstChild) {
            document.getElementById('recipes_found').removeChild(document.getElementById('recipes_found').firstChild);
        }
        curr_string = $('#ingr_text').val()
        removed_spaces = curr_string.replace(/\s+/g, '')
        separate = removed_spaces.split(',')
        const curr_recipes = get_recipe(separate).then(function(result) {
            recipes = result
            console.log(recipes)
            if (recipes.length == 0) {
                document.getElementById('recipes_text').innerHTML = "We couldn't find any recipes with that ingredient. Try something else!"
            } else {
                document.getElementById('recipes_text').innerHTML = 'Here are some recipes including your chosen ingredients:'
                for (let i = 0; i < 3; i++) {
                    now = recipes[i]
                    const curr_info = info(now.id).then(function(result_id) {
                        console.log(result_id)
                        $recipes_found.append(
                            `
                            <div class="column">
                                <h1 class="subtitle is-size-4 has-text-weight-bold">${result_id.title}</h1>
                                <div class="columns is-multiline justify-center">
                                    <div class="column">
                                        <img class="image" src="${result_id.image}">
                                    </div>
                                    <div class="column">
                                        <h1 class="subtitle is-size-6">Check out the recipe <a href="${result_id.sourceUrl}"> here. </a> </h1>
                                        <h1 class="subtitle is-size-6">${result_id.instructions}</h1>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    })
                }
            }
        });
    }
  
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#restaurant', handle_res_button);
    $root.on('click', '#enter_ingr', handle_enter_ingr)
  
 });
  
  
 