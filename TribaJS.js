var data = {
    canvas: null,
    ctx: null,
    clickedDot: null,
    dots: [{x: 100, y: 100}, {x: 200, y: 200}, {x: 200, y: 100}, {x: 100, y: 200}, {x: 300, y: 100}, {x: 100, y: 300}, {x: 100, y: 400}, {x: 200, y: 400},{x: 300, y: 400},{x: 400, y: 400}, {x: 300, y: 200}, {x: 200, y: 300}, {x: 300, y: 300}, {x: 400, y: 100}, {x: 400, y: 200}, {x: 400, y: 300}, {x: 500, y: 100}, {x: 500, y: 200}, {x: 500, y: 300}, {x: 500, y: 400}]
};


function circleCollision (c1, c2) {
    var a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;

    if ( a > Math.sqrt( (x*x) + (y*y) ) ) 
    return true;
    else return false;
}

function prepCanvas () {
    var res = window.devicePixelRatio || 1,
        scale = 1 / res;
    data.canvas = document.getElementById('dots');
    data.ctx = data.canvas.getContext('2d');
    

    
    data.ctx.scale(res, res);
    
    data.canvas.addEventListener('mousedown', function (e) {
        checkForDot(e);
    });
}

function tacke () {
    var i = 0;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i];
        data.ctx.beginPath();
        data.ctx.arc(d.x, d.y, 10, 0, 2*Math.PI);
        data.ctx.fillStyle = '#777';
        data.ctx.fill();
        data.ctx.closePath();
    }
}
function linije (toDot) {
    data.ctx.beginPath();
    data.ctx.moveTo(data.clickedDot.x, data.clickedDot.y);
    data.ctx.lineTo(toDot.x, toDot.y);
    data.ctx.lineWidth = 5;
    data.ctx.strokeStyle = '#777';
    data.ctx.stroke();
    data.ctx.closePath();
}

function checkForDot (e) {
    var i = 0, col = null;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i],
            c1 = {x: d.x, y: d.y, r: 10},
            c2 = {x: e.pageX, y: e.pageY, r: 10};
        if (circleCollision(c1, c2)) col = d;
    }
    if (col !== null) {
        if (data.clickedDot !== null) linije(col);
        data.clickedDot = col;
    } else data.clickedDot = null;
}

prepCanvas();
tacke();