const background_image = [
    {
        'src':'frontend/assets/ganyu.jpg',
        'title':'Ganyu',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/yaemiko.jpg',
        'title':'Yae Miko',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/hutao.jpg',
        'title':'Hu Tao',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/nahida.jpg',
        'title':'Nahida',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/keqing.jpg',
        'title':'Keqing',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/ningguang.jpg',
        'title':'Ningguang',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/furina.jpg',
        'title':'Furina',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
    {
        'src':'frontend/assets/amber.jpg',
        'title':'Amber',
        'description':'Lorem ipsum dolor sit amet conceptual adi splicing'},
];

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.content-box');
    setTimeout(() => {
        boxes.forEach((box, index) => {
            setTimeout(() => {

                const imagePlot = document.createElement('div');
                imagePlot.classList.add('image-plot');

                imagePlot.innerHTML = `
                    <div class="shadow-box-image">
                        <div class="content-box-inside">
                            <h1 class="title-box-inside">${background_image[index]['title']}</h1>
                            <span class="desc-box-inside">${background_image[index]['description']}</span>
                        </div>
                    </div>
                    <img class="pict${index+1}" src="${background_image[index]['src']}">`

                box.appendChild(imagePlot);
                box.classList.add('active');
            },
            index * 300);
        });
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.scale-box');
    setTimeout(() => {
        boxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('active');
            },
            index * 300);
        });
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelector('.menu-box');
    setTimeout(() => {
        boxes.classList.add('active');
    }, 2000);
});

// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();
// });

document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        element.addEventListener('selectstart', function(event) {
            event.preventDefault();
        });
    });
});