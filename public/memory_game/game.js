$(function() {
    const $root = $('#root');
    const $after_game = $('#after_game');

    document.getElementById('account').style.visibility = 'hidden'
    document.getElementById('login').style.visibility = 'hidden'

    var firebaseConfig = {
        apiKey: "AIzaSyCPWAXJYQuQ_mjjr89ZVcxwcr_7_jg2AD0",
        authDomain: "lunchbox-comp426.firebaseapp.com",
        projectId: "lunchbox-comp426",
        storageBucket: "lunchbox-comp426.appspot.com",
        messagingSenderId: "17403484587",
        appId: "1:17403484587:web:fcd56d1b209239deb49aee",
        measurementId: "G-2Z8VF93PZE"
    };



    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore()

    var email = ""
    var pass = ""
    var uid = ""




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

    const handle_login_button = function(event) {
        $root.append(`
<div class="modal is-active">
<div class="modal-background"></div>
<div class="modal-card">
<header class="modal-card-head">
<p class="modal-card-title">Login/Sign Up</p>
<button class="delete" aria-label="close"></button>
</header>
<section class="modal-card-body">
<form>
    <div class="field">
        <label class="label">Email</label>
        <div class="control">
            <input class="input" id="email" type="text" placeholder="Email">
        </div>
    </div>
    <div class="field">
        <label class="label">Password</label>
        <div class="control">
            <input class="input" id="password" type="password" placeholder="Password">
        </div>
    </div>
</form>
</section>
<footer class="modal-card-foot">
<button class="button login">Login</button>
<button class="button sign_up">Sign Up</button>
</footer>
</div>
</div>`)
}

    async function random() {
        const result = await axios({
            method: 'get',
            url: "https://api.spoonacular.com/recipes/random?number=1&apiKey=575d0ecd59334402b69f88c49da42385"
        });
        return result;
    }
    
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
            document.getElementById(event.target.id).src = "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c12c.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_2") {
            document.getElementById(event.target.id).src = "https://www.transparentpng.com/thumb/carrot/AciY35-carrot-transparent-picture.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_3") {
            document.getElementById(event.target.id).src = "https://pngimg.com/uploads/sushi/sushi_PNG98863.png"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_4") {
            document.getElementById(event.target.id).src = "https://lh3.googleusercontent.com/proxy/5Wt5B72o2tnWoeRYbabbowL_c-WoslA8NAUMovfsTvxRQKDaFT0bb-99y98GaFjwyaiaO5DWiON5BnF9bzrnO-r_x3XEsw3WxN50DA98sgXprDx4SB8UWaRzxjwu"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_5") {
            document.getElementById(event.target.id).src = "https://lh3.googleusercontent.com/proxy/OSxDJMlC4Y6dP95WdJSIh7Yl346YtjvuTpzGvjfKExfXhhR3wyU-bL3ekG6Xlm6vF3kWuKtatEWruVNIiEnA-GgLhXC5jUy-dglDO_1EwJiIR-MGtwJ7PgqQTkGKbj4"
        }
        if (document.getElementById(shuffled[event.target.id]).alt === "card_6") {
            document.getElementById(event.target.id).src = "https://www.pngarts.com/files/2/Salad-PNG-Image-with-Transparent-Background.png"
        }
        if (flipped === 2) {
            if (document.getElementById(shuffled[prev_id]).alt === document.getElementById(shuffled[event.target.id]).alt) {
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
                            <div class="columns is-multiline justify-center">
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

    const handle_cancel_login = function(event) {
        event.target.parentNode.parentNode.parentNode.remove()
    }

    const handle_submit_login = function(event) {
        email = $('#email').val()
        pass = $('#password').val()
        const auth = firebase.auth()
        const promise = auth.signInWithEmailAndPassword(email, pass);
        event.target.parentNode.parentNode.parentNode.remove()
    }

    const handle_submit_signup = function(event) {
        email = $('#email').val()
        pass = $('#password').val()
        const auth = firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        event.target.parentNode.parentNode.parentNode.remove()

    }

    const handle_submit_account = function(event) {
        $root.append(`
        <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">User: ${email}</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body" id="saved_recipes">
        <label class="label is-size-5">Favorite Recipe</label>
      </section>
      <footer class="modal-card-foot">
        <button class="button logout">Logout</button>
      </footer>
    </div>
  </div>`)
        db.collection('users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const user_id = doc.id
                const user_data = doc.data()
                if (user_id === uid) {
                    for (let i = 0; i < user_data.name.length; i++) {
                        $('#saved_recipes').append(
                            `<div class="column">
                                <h1 class="subtitle is-size-6"><a href="${user_data.link[i]}">${user_data.name[i]}</a> </h1>
                            </div>`
                        )
                    }
                }
            })
        })
    }

    const handle_submit_logout = function(event) {
        firebase.auth().signOut()
        document.getElementById('login').innerHTML = 'Login/Sign Up'
        event.target.parentNode.parentNode.parentNode.remove()
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            email = firebaseUser.email
            pass = firebaseUser.password
            uid = firebaseUser.uid
            document.getElementById('account').style.visibility = 'visible'
            document.getElementById('login').style.visibility = 'hidden'
            document.getElementById('account').innerHTML = 'Account: ' + email
            document.getElementById('login').innerHTML = ''
        } else {
            document.getElementById('account').innerHTML = ''
            document.getElementById('login').innerHTML = 'Login/Sign Up'
            document.getElementById('account').style.visibility = 'hidden'
            document.getElementById('login').style.visibility = 'visible'
        }
    })


   
    $root.on('click', '#login', handle_login_button);

    $root.on('click', '.delete', handle_cancel_login)
    $root.on('click', '.login', handle_submit_login)
    $root.on('click', '.sign_up', handle_submit_signup)
    $root.on('click', '.logout', handle_submit_logout)
    $root.on('click', '#account', handle_submit_account)
    
    
    $root.on('click', '.back-face', handle_memory_card);

        
    
    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#restaurant', handle_res_button);
    

});



