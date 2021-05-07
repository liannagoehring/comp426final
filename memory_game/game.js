$(function() {
    const $root = $('#root');
    const $after_game = $('#after_game');

    cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    shuffled = []
    flipped = 0
    last = ""
    last_id = -1
    correct = 0

      
    const handle_home_button = function(event) {
        window.location.href = "../index.html";
    }
    
    const handle_finder_button = function(event) {
        window.location.href = "../recipe_finder/index.html";
    }
    
    const handle_memory_button = function(event) {
        window.location.href = "index.html";
    }

    const handle_res_button = function(event) {
        window.location.href = "../restaurant_locator/index.html"
    }

    async function random() {
        const result = await axios({
            method: 'get',
            url: "https://api.spoonacular.com/recipes/random?number=1&apiKey=84b4bc51befa47c3a19edad6580c777e"
        });
        return result;
    }
    
    
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#restaurant', handle_res_button);
    
    //game

    const shuffle_cards = function() {
        temp_array = []
        for(let i = 0; i < cards.length; ++i) {
            temp_array.push(cards[i])
        }
        for (let i = temp_array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = temp_array[i];
            temp_array[i] = temp_array[j];
            temp_array[j] = temp;
        }
        shuffled = temp_array 
    }

    shuffle_cards();
    
    const handle_memory_card = function(event) {
        setTimeout(() =>{
            prev = last
        prev_id = last_id
        flipped++;
        if (document.getElementById(shuffled[event.target.id]).alt === "card_1") {
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0b1.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_2") {
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0f0.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_3") {
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/images/580b57fbd9996e24bc43c0b2.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_4") {
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/thumbs/5ea15037e0ebe6000479458a.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_5") {
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c12d.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_6") {
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c19e.png"
        }
        if (flipped === 2) {
            if (document.getElementById(shuffled[prev_id]).alt === document.getElementById(shuffled[event.target.id]).alt) {
                console.log('match')
                document.getElementById(event.target.id).disabled = true;
                document.getElementById(prev_id).disabled = true;
                correct += 2
            } else {
                setTimeout(() => {  
                    document.getElementById(event.target.id).src = "https://cdn4.iconfinder.com/data/icons/lunchbox-1/500/bep64_8_plastic_lunchbox_cartoon_water_child_food_fruit-512.png"
                    document.getElementById(prev_id).src = "https://cdn4.iconfinder.com/data/icons/lunchbox-1/500/bep64_8_plastic_lunchbox_cartoon_water_child_food_fruit-512.png"    
                   }, 500);  
            }
            flipped = 0
            prev = ""
        }
        last = document.getElementById(event.target.id).alt
        last_id = event.target.id

        if (correct === 12) {
            document.getElementById('game_status').innerHTML = 'You won the memory card game! Great job.'
            const rest_list = random().then(function(result) {
                curr = result.data
                recipe = curr.recipes[0]
                    $after_game.append(
                        `
                        <div class="column">
                            <h1 class="subtitle is-size-6">${recipe.summary}</h1>
                            <div class="columns is-multiline">
                                <div class="column">
                                    <img class="image" src="${recipe.image}">
                                </div>
                                <div class="column">
                                    <h1 class="subtitle is-size-6">Check out the recipe <a href="${recipe.sourceUrl}"> here. </a> </h1>
                                    <h1 class="subtitle is-size-6">${recipe.instructions}</h1>
                                </div>
                            </div>
                        </div>
                        `
                    )
                })
            }
        }, 50);
    }
    
    
    $root.on('click', '.back-face', handle_memory_card);
    

});



