document.querySelector('a').onclick = function(){
    window.location.href='index.html';  
}

const firebaseConfig = {
    apiKey: "AIzaSyCSS9UmY7JId8ygcwQbBnxhzmwGRd3B0sw",
    authDomain: "elitmusassignment-5e9f3.firebaseapp.com",
    databaseURL: "https://elitmusassignment-5e9f3-default-rtdb.firebaseio.com",
    projectId: "elitmusassignment-5e9f3",
    storageBucket: "elitmusassignment-5e9f3.appspot.com",
    messagingSenderId: "437378714127",
    appId: "1:437378714127:web:1c00da0abeb4bf4644b17a",
    measurementId: "G-1JLKEE7JT0"
};
firebase.initializeApp(firebaseConfig);

// Reference credentials collection
var credRef = firebase.database().ref('credentials');

console.log('ref created');
// Listen for form submit
document.querySelector('button').addEventListener('click', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();
    var email = document.getElementById('email').value.toString().trim();
    var password = document.getElementById('password').value.toString().trim();
    var name = document.getElementById('name').value.toString().trim();
    console.log('data fetched...save message called');

    // create user
    createUser(email, password, name);
}


// Save message to firebase
function createUser(email, password, name) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            // Show alert
            document.querySelector('.alert').style.display = 'block';

            // Hide alert after 3 seconds
            setTimeout(function () {
                document.querySelector('.alert').style.display = 'none';
            }, 5000);

            // Clear form
            document.getElementById('contactForm').reset();

            //upload credentials
            var newMessageRef = credRef.push();
            newMessageRef.set({
                email: email,
                password: password
            });

            //upload name and email
            uploadData(email,name);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
        });
}


function uploadData(email,name){
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            var uid = user.uid;
            await firebase.database().ref('data/' + uid).set({
                name:name,
                email:email
            })

        } else {
            alert('data not uploaded');
        }
    });
}