(function() {

    // buat canvas
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    // dpi scaling
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const S = 1000; // logical size (1:1)
    canvas.style.width = S + 'px';
    canvas.style.height = S + 'px';
    canvas.width = Math.floor(S * dpr);
    canvas.height = Math.floor(S * dpr);
    ctx.scale(dpr, dpr);

    // helper

    function save(){
        ctx.save();
    }

    function restore(){
        ctx.restore();
    }

    function rect(x,y,w,h){
        ctx.fillRect(x,y,w,h);
    }

    function line(x1,y1,x2,y2,w=2){
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth=w;
        ctx.stroke();
    }

    function roundedRect(x,y,w,h,r){
        ctx.beginPath();
        ctx.moveTo(x+r,y);
        ctx.arcTo(x+w,y, x+w,y+h, r);
        ctx.arcTo(x+w,y+h, x,y+h, r);
        ctx.arcTo(x,y+h, x,y, r);
        ctx.arcTo(x,y, x+w,y, r);
        ctx.closePath(); ctx.fill();
    }

    function circle(x,y,r){
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fill();
    }

    function polygon(points){
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for(let i=1;i<points.length;i++){
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        ctx.fill();
    }

    // scene

    function drawSky(){
        const g = ctx.createLinearGradient(0,0,0,S);
        g.addColorStop(0,'#833c80');
        g.addColorStop(1,'#9d8ac1');
        ctx.fillStyle = g;
        rect(0,0,S,S);
    }

    function drawMoon(){
        save();
        ctx.fillStyle = '#ececec';
        circle(S*0.93, S*0.07, S*0.12);
        restore();
    }

    function drawSun(){
        save();
        ctx.fillStyle = '#caa43a';
        circle(S*0.24, S*0.56, S*0.1);
        restore();
    }

    function cloud(x,y,scale=1){
        save();
        ctx.translate(x,y);
        ctx.scale(scale, scale);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        circle(0,0,26);
        circle(28,-8,22);
        circle(52,0,24);
        circle(26,-18,20);
        circle(8,2,18);
        restore();
    }

    function mountain(baseX, baseY, width, height, color='#9a9a9a'){
        // body
        save();
        ctx.translate(baseX, baseY);
        ctx.fillStyle = color;
        polygon([ [0,0], [width/2,-height], [width,0] ]);
        // shadow
        ctx.fillStyle = '#7e7e7e';
        polygon([ [width*0.50,-height*1], [width*0.95,-height*0.1], [width,0], [width*0.8,0] ]);
        restore();
    }

    function drawBridge(y){
        // horizontal
        ctx.fillStyle = '#0c0c0c';
        rect(0,y+20,S,32);
        // pilar
        save();
        ctx.translate(30, y+16);
        for(let i=0;i<11;i++){
            ctx.fillStyle = '#0c0c0c';
            rect(0,10,30,150);
            ctx.translate(95,0);
        }
        restore();
    }

    function gerbong(opts = {}) {
        const {
            bodyW = 128,      // lebar badan
            bodyH = 40,       // tinggi badan
            wheelR = 6,       // radius roda
            bogieOffset = 34, // jarak pusat bogie dari pusat gerbong (kiri/kanan)
            wheelGap = 18,    // jarak antar roda di dalam satu bogie
            wheelY = 20       // posisi vertikal roda relatif pusat gerbong
        } = opts;

        ctx.fillStyle = '#000';

        // bogie kiri
        circle(-bogieOffset - wheelGap/2, wheelY, wheelR);
        circle(-bogieOffset + wheelGap/2, wheelY, wheelR);
        rect(-bogieOffset - wheelGap/2, wheelY - 2, wheelGap, 4);
        
        // bogie kanan
        circle( bogieOffset - wheelGap/2, wheelY, wheelR);
        circle( bogieOffset + wheelGap/2, wheelY, wheelR);
        rect( bogieOffset - wheelGap/2, wheelY - 2, wheelGap, 4);

        save();
        
        // body
        ctx.fillStyle = '#222093';
        roundedRect(-bodyW/2, -bodyH/2, bodyW, bodyH, 5);
        
        // jendela
        ctx.fillStyle = '#e0cd00';
        roundedRect(-(bodyW-16)/2, -12, bodyW-16, 20, 2);
        
        // separator tengah
        ctx.fillStyle = '#222093';
        rect(-2, -bodyH/2, 4, bodyH);
        
        restore();
    }
    
    function drawTrain(y){
        save();
        ctx.translate(30, y-6);
        for (let i=0; i<8; i++) {
            gerbong(); // roda ikut posisi/transform gerbong ini
            ctx.translate(130, 0); // geser ke slot gerbong berikutnya
        }
        restore();
    }

    function tree(scale=1){
        save();
        ctx.scale(scale, scale);
        ctx.fillStyle = '#3b2c60';
        // batang
        polygon([ [-20,140], [20,140], [30,170], [-30,170] ]);
        // daun
        polygon([ [0,0], [36,80], [-36,80] ]);
        ctx.translate(0,50);
        polygon([ [0,-10], [48,70], [-48,70] ]);
        ctx.translate(0,40);
        polygon([ [0,-20], [58,60], [-58,60] ]);
        restore();
    }

    function foreground(){

        save();
        ctx.fillStyle = '#93499d';
        ctx.transform(1,0, -0.35,1, 0,0);
        rect(0, 760, S*1.4, 80);
        restore();

        save();
        ctx.fillStyle = '#3f255b';
        ctx.transform(1,0, -0.25,1, 0,0);
        rect(0, 830, S*1.3, 180);
        restore();
    }

    function shootingStar(){
        save();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.translate(S*0.68, S*0.4);
        ctx.rotate(-Math.PI/10);
        line(-120, -40, 80, -40, 2);
        restore();
    }

    // build scene
    function draw(){
        drawSky();
        drawMoon();
        drawSun();

        // clouds
        cloud(70,70,1.1);
        cloud(180,95,1.05);
        cloud(300,70,1.0);
        cloud(430,90,1.1);
        cloud(560,70,1.1);
        cloud(690,95,1.1);

        // mountains
        mountain(140,760, 520, 380);    // left
        mountain(480,760, 600, 420);    // right

        // bridge & train
        const railY = 640;
        drawBridge(railY);
        drawTrain(railY);
        
        // land & star
        shootingStar();
        foreground();
        
        // pohon
        save(); ctx.translate(120,650); tree(1.4); restore();
        save(); ctx.translate(300,580); tree(1.3); restore();
        save(); ctx.translate(500,620); tree(1.5); restore();
        save(); ctx.translate(700,560); tree(1.2); restore();
        save(); ctx.translate(870,650); tree(1.3); restore();
    }

    draw();

    document.getElementById('save').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'night_and_train.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
})();