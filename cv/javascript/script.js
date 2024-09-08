// Buka URL Pada Tab Baru
function openNewWindow(url) {
    window.open(url, '_blank');
}

// Hitung Tahun Sejak Kelahiran
const birth_date = 'May 2, 2005';
document.getElementById('birthdate-string-1').innerText = birth_date;
function countAge(birth_date) {
    const sekarang = new Date();
    const lahir = new Date(birth_date);
    let umur = sekarang.getFullYear() - lahir.getFullYear();
    const bulanSekarang = sekarang.getMonth();
    const bulanLahir = lahir.getMonth();
    if (bulanSekarang < bulanLahir || (bulanSekarang === bulanLahir && sekarang.getDate() < lahir.getDate())) {umur--;}
    document.getElementById('age-string-1').innerText = umur;}
countAge(birth_date);

// Download PDF
document.getElementById('download-cv').addEventListener('click', function() {
    const pdfUrl = 'https://drive.google.com/uc?export=download&id=1IJgNDPd28lNBe1TGvOKCjgRfJUQsdbZB';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'cv_dapunta.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Hover Sosmed
const facebookLink = document.querySelector('.social-media-link.facebook');
const instagramLink = document.querySelector('.social-media-link.instagram');
const whatsappLink = document.querySelector('.social-media-link.whatsapp');
const githubLink = document.querySelector('.workspace-link.github');
const facebookOverlay = document.querySelector('.facebook-overlay');
const instagramOverlay = document.querySelector('.instagram-overlay');
const whatsappOverlay = document.querySelector('.whatsapp-overlay');
const githubOverlay = document.querySelector('.github-overlay');
facebookLink.addEventListener('mouseover', () => {facebookOverlay.style.opacity = '1';});
facebookLink.addEventListener('mouseout', () => {facebookOverlay.style.opacity = '0';});
instagramLink.addEventListener('mouseover', () => {instagramOverlay.style.opacity = '1';});
instagramLink.addEventListener('mouseout', () => {instagramOverlay.style.opacity = '0';});
whatsappLink.addEventListener('mouseover', () => {whatsappOverlay.style.opacity = '1';});
whatsappLink.addEventListener('mouseout', () => {whatsappOverlay.style.opacity = '0';});
githubLink.addEventListener('mouseover', () => {githubOverlay.style.opacity = '1';});
githubLink.addEventListener('mouseout', () => {githubOverlay.style.opacity = '0';});


// Disable All Action
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        element.addEventListener('selectstart', function(event) {
            event.preventDefault();
        });
    });
});
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', event => {
        event.preventDefault(); // Mencegah event dragstart
    });
});