$(function() {
    const $root = $('#root');
    const $restaurants = $('#restaurants');

    async function zipcode(zip) {
        const result = await axios({
            method: 'get',
            url: "https://api.documenu.com/v2/restaurants/zip_code/" + zip + "?key=c70e9ee5bde48e73f96e7dfb873e1c5a",
        });   
        return result.data;
    }

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
    
    const handle_enterzip_button = function(event) {
        while (document.getElementById('restaurants').firstChild) {
                document.getElementById('restaurants').removeChild(document.getElementById('restaurants').firstChild);
            }
        if ($('#zip_text').val().length !== 5) {
            document.getElementById('zip_rest_text').innerHTML = 'Please enter a valid zipcode.'
        } else {
            document.getElementById('zip_rest_text').innerHTML = 'Restaurants near ' + $('#zip_text').val() + ':'
            const rest_list = zipcode($('#zip_text').val()).then(function(result) {
            curr_list = result.data
            for (let i = 0; i < curr_list.length; i++) {
                $restaurants.append(
                    `
                    <div class="column">
                        <h1 class="subtitle is-size-4 has-text-weight-bold">${curr_list[i].restaurant_name}</h1>
                        <h1 class="subtitle is-size-6">${curr_list[i].address.formatted}</h1>
                        <h1 class="subtitle is-size-6">${curr_list[i].restaurant_phone}</h1>
                    </div>
                    `
                )
            }
        })
        }
    }


    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#login', handle_login_button);
    $root.on('click', '#restaurant', handle_res_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#enter_zip', handle_enterzip_button);
    
});