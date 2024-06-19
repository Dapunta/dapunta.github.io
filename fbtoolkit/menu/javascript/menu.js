// Check Cookie

const cookie = document.cookie;
if (!cookie.includes('c_user')) {
    const currentUrl = window.location.origin;
    window.location.href = currentUrl + "/login";
}

// Check Data

const data = localStorage.getItem("data");
if (!data) {
    const currentUrl = window.location.origin;
    window.location.href = currentUrl + "/login";
}

// Display Data Account

function fetchData() {
    const data = JSON.parse(localStorage.getItem("data"));
    document.getElementById('user-id').innerText = data.id;
    document.getElementById('profile-image-1').src = data.picture;
    document.getElementById('profile-image-2').src = data.picture;
    document.getElementById('name').innerText = data.name;
    document.getElementById('friend').innerText = `❏ ${data.friend} Friends`
    document.getElementById('follower').innerText = `❏ ${data.follower} Followers`
    document.getElementById('post').innerText = `❏ ${data.post} Posts`
}
fetchData();

// Display Data Menu

const listMenu = [
    {
        icon    : 'fa-solid fa-bolt',
        name    : 'Generate<br>Token',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-unlock',
        name    : 'Post Privacy<br>Changer',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-chart-line',
        name    : 'Interaction<br>Scanner',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-comments',
        name    : 'Auto<br>Chat',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-newspaper',
        name    : 'Auto<br>Post',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-face-laugh-squint',
        name    : 'Auto<br>Reaction',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-comment-dots',
        name    : 'Auto<br>Comment',
        url     : '',
        onclick : ''},
    {
        icon    : 'fa-solid fa-share',
        name    : 'Auto<br>Share',
        url     : '',
        onclick : ''},
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayMenu() {
    const menuBox = document.getElementById('menu-container');
    for (item of listMenu) {
        const newInner = document.createElement('div');
        newInner.classList.add('grid-item');
        newInner.innerHTML = `
            <div class="button-menu-container">
                <span><i class="inner-shadow ${item.icon}"></i></span>
                <h4>${item.name}</h4>
            </div>`
        menuBox.appendChild(newInner);
        await delay(100);
    }
}
displayMenu();

// Logout Toggle

function pojokToggle() {
    const toggle = document.getElementById('pojok-toggle');
    const image = document.getElementById('profile-pojok');
    const email = document.getElementById('user-email');
    const id = document.getElementById('user-id');
    toggle.classList.toggle('inactive');
    image.classList.toggle('inactive');
    email.classList.toggle('inactive');
    id.classList.toggle('inactive');
}

function Logout() {
    document.cookie = "cookie" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    localStorage.clear();
    const currentUrl = window.location.origin;
    window.location.href = currentUrl + "/login";
}