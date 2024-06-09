const mySosmed = {
    'facebook': 'https://web.facebook.com/61556949299760',
    'instagram':'https://www.instagram.com/dapunta.ratya',
    'whatsapp': 'https://api.whatsapp.com/send/?phone=6282227340836&text=Assalamualaikum+Mas&type=phone_number&app_absent=0',
    'twitter':  '',
    'discord':  '',
    'linkedin': '',
}

let homeApps, termuxApps, biodataApps;

fetch('../frontend/html/home_apps_mid.html')
    .then(response => response.text())
    .then(html => {homeApps = html;})

fetch('../frontend/html/termux_apps_mid.html')
    .then(response => response.text())
    .then(html => {termuxApps = html;})

fetch('../frontend/html/biodata_apps_mid.html')
    .then(response => response.text())
    .then(html => {biodataApps = html;})

function isLogoActive(app) {
    const nowApp = document.getElementById(`spawn-app-${app}`);
    return (nowApp.classList[2] == "app-active") ? true : false;
}

function activateLogo(app, stat) {
    const nowApp = document.getElementById(`spawn-app-${app}`);
    if (stat) nowApp.className = `spawn-apk ${app} app-active`;
    else nowApp.className = `spawn-apk ${app}`;
}

function isFloatingActive(app) {
    const nowApp = document.getElementById('app-navigator');
    return (nowApp.classList[0] == "base-unshown-app") ? false : true;
}

function activateApp(app, stat) {
    const nowApp = document.getElementById('app-navigator');
    if (stat) {
        nowApp.className = 'base-shown-app';
        if (app == "termux") nowApp.innerHTML = termuxApps;
        else if (app == "home") nowApp.innerHTML = homeApps;
        else if (app == "biodata") nowApp.innerHTML = biodataApps;
    }
    else {
        nowApp.className = 'base-unshown-app';
        nowApp.innerHTML = "";
    }
}

function closeAllApp() {
    const allApp = document.querySelectorAll('.spawn-apk');
    allApp.forEach( (element) => {
        activateLogo(element.classList[1], false);
        activateApp(element.classList[1], false);
    });
}

function toggleAppNavigation(app) {

    if (!(sessionStorage.getItem('activeApp'))) sessionStorage.setItem('activeApp', app);
    ses = sessionStorage.getItem('activeApp');

    if (app == ses) {
        if (!isLogoActive(app)) activateLogo(app, true);
        else activateLogo(app, false);
        if (!isFloatingActive(app)) activateApp(app, true);
        else activateApp(app, false);
        sessionStorage.setItem('activeApp', app);
    }

    else {
        closeAllApp();
        if (!isLogoActive(app)) activateLogo(app, true);
        else activateLogo(app, false);
        if (!isFloatingActive(app)) activateApp(app, true);
        else activateApp(app, false);
        sessionStorage.setItem('activeApp', app);
    }

    backgroundSlider();
}

function contactMeAt(sosmed) {
    const urlSosmed = mySosmed[sosmed];
    if (urlSosmed) window.open(urlSosmed, '_blank');
    else console.log('Link tidak tersedia untuk sosial media ini.');
}

function isAppActive() {
    const statApp = document.getElementById('app-navigator');
    return (statApp.classList.value === 'base-shown-app') ? true : false;
}

function backgroundSlider() {
    // console.log(isAppActive());
    const boxSlider = document.getElementById('background-slide-button');
    if (!isAppActive()) {
        boxSlider.innerHTML = `
            <div class="slider-button-container left"  onclick="backgroundSlide('left')"><i class="slider-button-container-effect fa-solid fa-chevron-left"></i></div>
            <div class="slider-button-container right" onclick="backgroundSlide('right')"><i class="slider-button-container-effect fa-solid fa-chevron-right"></i></div>`;
    }
    else {
        boxSlider.innerHTML = '';
    }
}

function backgroundSlide(direction) {
    var scrollAmount = window.innerWidth * 0.25;
    if (direction === 'left') {
        document.getElementById('scale-box').scrollLeft -= scrollAmount;
    }
    else {
        document.getElementById('scale-box').scrollLeft += scrollAmount;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        toggleAppNavigation('home');
    }, 2100);
});