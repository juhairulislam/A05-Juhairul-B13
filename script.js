




function signin() {

    const username = document.getElementById('username');
    usernameValue = username.value;

const password = document.getElementById('password');
 passwordValue = password.value;
 

    // console.log(usernameValue, passwordValue);

    if (usernameValue === '' || passwordValue === '') {
        alert('Please enter username and password');
        return;

    } else if (usernameValue !== 'admin' || passwordValue !== 'admin123') {

        alert('Incorrect username or password');
        return;
    }

    else {
        alert('Login Successful') ;
        window.location.assign('./main.html')

    }
}