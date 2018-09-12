let fbwidth = 1;
let fbheight = 1;

window.onload = function() {
    let canvas = document.getElementById('mycanvas');
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.globalCompositeOperation = 'destination-over';

    window_resize();
    window.addEventListener("resize", window_resize);
    window.requestAnimationFrame(draw);
};

function window_resize() {
    const canvas = document.getElementById('mycanvas');
    const dpr = window.devicePixelRatio;
    const css_width = canvas.clientWidth;
    const css_height = canvas.clientHeight;
    canvas.width = css_width * dpr;
    canvas.height = css_height * dpr;
    console.info(css_width + 'x' + css_height + '@' + dpr);

    // Note that we're converting this into an integer; on some devices, the pixel ratio * virtual
    // pixels does NOT result in integer dimensions, but it's the best approximation we have to
    // physical devices.
    fbwidth = canvas.width | 0;
    fbheight = canvas.height | 0;

    // This is required to draw single-pixel lines using integer coordinates.
    let ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(0.5, 0.5);
}

function draw() {
    var ctx = document.getElementById('mycanvas').getContext('2d');
    ctx.clearRect(0, 0, fbwidth, fbheight);

    ctx.strokeStyle = '#000';
    ctx.beginPath();

    // Three horizontal lines: left-most column, 99th column, and right-most column.
    ctx.moveTo(100, 0);
    ctx.lineTo(200, 0);
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.moveTo(100, fbheight - 1);
    ctx.lineTo(200, fbheight - 1);

    // Three vertical lines: top-most row, 99th row, and bottom-most row.
    ctx.moveTo(0, 100);
    ctx.lineTo(0, 200);
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 200);
    ctx.moveTo(fbwidth - 1, 100);
    ctx.lineTo(fbwidth - 1, 200);
    
    ctx.stroke();

    // Draw a red lines at (n-2) and a green line at (n-3).
    ctx.strokeStyle = '#a00';
    ctx.beginPath();
    ctx.moveTo(90, fbheight - 2);
    ctx.lineTo(210, fbheight - 2);
    ctx.moveTo(fbwidth - 2, 90);
    ctx.lineTo(fbwidth - 2, 210);
    ctx.stroke();
    ctx.strokeStyle = '#0a0';
    ctx.beginPath();
    ctx.moveTo(80, fbheight - 3);
    ctx.lineTo(220, fbheight - 3);
    ctx.moveTo(fbwidth - 3, 80);
    ctx.lineTo(fbwidth - 3, 220);
    ctx.stroke();

    window.requestAnimationFrame(draw);
}
