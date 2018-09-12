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

    fbwidth = canvas.width;
    fbheight = canvas.height;
}

function draw() {
    var ctx = document.getElementById('mycanvas').getContext('2d');
    ctx.clearRect(0, 0, fbwidth, fbheight);

    ctx.strokeStyle = '#000';
    ctx.beginPath();

    // Three horizontal lines: left-most column, 100th column, and right-most column.
    ctx.moveTo(100, 0.5);
    ctx.lineTo(200, 0.5);
    ctx.moveTo(100, 100.5);
    ctx.lineTo(200, 100.5);
    ctx.moveTo(100, fbheight - 0.5);
    ctx.lineTo(200, fbheight - 0.5);

    // Three vertical lines: top-most row, 100th row, and bottom-most row.
    ctx.moveTo(0.5, 100);
    ctx.lineTo(0.5, 200);
    ctx.moveTo(100.5, 100);
    ctx.lineTo(100.5, 200);
    ctx.moveTo(fbwidth - 0.5, 100);
    ctx.lineTo(fbwidth - 0.5, 200);
    
    ctx.stroke();

    // For Android Chrome, looks like we need to do n-3 for right-most / bottom-most.
    // The black lines above (n-1) do not show up, not does the red one below (n-2). However the
    // green line (n-3) seems to be line up exactly in the upper row.
    ctx.strokeStyle = '#a00';
    ctx.beginPath();
    ctx.moveTo(100, fbheight - 1.5);
    ctx.lineTo(200, fbheight - 1.5);
    ctx.moveTo(fbwidth - 1.5, 100);
    ctx.lineTo(fbwidth - 1.5, 200);
    ctx.stroke();
    ctx.strokeStyle = '#0a0';
    ctx.beginPath();
    ctx.moveTo(100, fbheight - 2.5);
    ctx.lineTo(200, fbheight - 2.5);
    ctx.moveTo(fbwidth - 2.5, 100);
    ctx.lineTo(fbwidth - 2.5, 200);
    ctx.stroke();

    window.requestAnimationFrame(draw);
}
