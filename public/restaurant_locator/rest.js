$(function() {
    const $root = $('#root');
    const $restaurants = $('#restaurants');

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

    var email = ""
    var pass = ""

 


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

    const handle_cancel_login = function(event) {
        event.target.parentNode.parentNode.parentNode.remove()
    }

    const handle_submit_login = function(event) {
        email = $('#email').val()
        pass = $('#password').val()
        const auth = firebase.auth()
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
        event.target.parentNode.parentNode.parentNode.remove()
    }

    const handle_submit_signup = function(event) {
        email = $('#email').val()
        pass = $('#password').val()
        const auth = firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
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
      <section class="modal-card-body">
        <label class="label">Saved Recipes</label>
      </section>
      <footer class="modal-card-foot">
        <button class="button logout">Logout</button>
      </footer>
    </div>
  </div>`)
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
            document.getElementById('account').style.visibility = 'visible'
            document.getElementById('login').style.visibility = 'hidden'
            document.getElementById('account').innerHTML = 'Account: ' + email
            document.getElementById('login').innerHTML = ''
        } else {
            console.log('not logged in')
            document.getElementById('account').innerHTML = ''
            document.getElementById('login').innerHTML = 'Login/Sign Up'
            document.getElementById('account').style.visibility = 'hidden'
            document.getElementById('login').style.visibility = 'visible'
        }
    })


    $root.on('click', '#home', handle_home_button);
    $root.on('click', '#login', handle_login_button);
    $root.on('click', '#restaurant', handle_res_button);
    $root.on('click', '#finder', handle_finder_button);
    $root.on('click', '#game', handle_memory_button);
    $root.on('click', '#enter_zip', handle_enterzip_button);

       
    $root.on('click', '#restaurant', handle_res_button);

    $root.on('click', '.delete', handle_cancel_login)
    $root.on('click', '.login', handle_submit_login)
    $root.on('click', '.sign_up', handle_submit_signup)
    $root.on('click', '.logout', handle_submit_logout)
    $root.on('click', '#account', handle_submit_account)

    
});