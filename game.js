require('./js/libs/weapp-adapter')
var c = canvas.getContext('2d')
// require('./test.js')
function init() {

  let h = 640;
  let w = 320;
    // c.fillStyle = 'red';
    // c.font = "300px PingFang SC";
    // c.fillText('hhhhhh', 200, 200);
  wx.getSystemInfo({
    success: (e) => {
      console.log('e', e);
      h = e.windowHeight;
      w = e.windowWidth;
      console.log(e.windowWidth);
    }
  })

  let x = 312;
  let y = 152;
  let e = 10;
  let o = 0;
  let t = 0;
  let g = 1;
  let m = [];
  let p = [];
  let k;
  let l;
  let v;
  let s;

  let R = ($) => {
    return ~~(Math.random() * $);
  }

  let W = () => {
    let i;
    let s = [];

    for (i = 0; i < p.length - 1; i++) {
      let a = p[i].x - p[i + 1].x;
      let b = p[i].y - p[i + 1].y;
      let l = Math.sqrt((a * a) + (b * b));
      s.push({

        l: l,

        v: a / l,

        w: b / l,
        p: p[i]
      });
    }

    let a = 16;
    let j = 0;
    let u = 0;
    let n = 0;
    let l = s[0].l;

    for (i = 0; i < 9; i++) {
      while (u > l && s[j + 1]) {

        n = l;
        l += s[++j].l;
      }
      c.beginPath();
      // // 修改的部分
      // lets[j].p.y - s[j].w * (u - n));
      c.arc(Math.min(s[j].p.y - s[j].w * (u - n) - 2, w - 10), s[j].p.x - s[j].v * (u - n) - o, a / 2, 0, 2 * Math.PI);
      c.fillStyle = g > 1 ? (g == 2 ? '#f00' : '#0f0') : '#fff';
      c.fill();
      u += a--;
    }
  };
  let B = () => {

    c.fillStyle = g ? '#000' : '#f00';
    c.fillRect(0, 0, w, h);

    let n = [];
    for (let i = 0; i < m.length; i++) {

      let b = { x: (m[i].x * 32) - o, y: m[i].y * 32, s: m[i].t ? 16 : 32 };

      if (m[i].t) {

        b.x += 8;
        b.y += 8;
      }

      c.fillStyle = g ? (m[i].t ? (m[i].t == 2 ? '#f00' : '#0f0') : '#fff') : '#600';
      // 修改的部分
      c.fillRect(b.y, b.x, b.s, b.s);
      let j = x < b.x + b.s && x + 16 > b.x && y < b.y + b.s && y + 16 > b.y;
      if (j) {

        g = m[i].t;

        v = g ? 5 : 0;
      }
      if (!(j && m[i].t) && b.x > -32) {
        n.push(m[i]);
      }
    }
    m = n;
  };

  let L = ($) => {

    let i = ($ - t) / 1e3;
    t = $;

    o = o + ~~(s * i);

    // if (k == 38 || k == 40) {

    //   y += ((k > 38 ? 1 : -1) * s * i) * 0.5;
    // }
    if (!moveX) moveX = 0;
    y = startX + moveX;

    y = Math.max(0, Math.min(y, h - 16));

    p.unshift({ x: x + 8 + o, y: y + 8 });

    p = p.slice(0, 99);

    v -= i;


    i = ~~(o / w);

    if (l != i) {

      l = i;

      i = 4 + e++;
      while (i) {

        m.push({
          x: R(20) + 20 * (l + 1),
          y: R(10),

          t: i >= e ? R(2) + 2 : 0
        });
        i--;
      }
    }

    B();

    p.length > 1 && W();

    if (v > 0) {
      s = g == 2 ? 300 : 100;
      c.fillStyle = g == 2 ? '#f00' : '#0f0';
      c.fillRect(8, 8, 48 * v / 5, 4);
    } else {

      s = 200;

      g ? g = 1 : g;
    }

    if (g) {

      requestAnimationFrame(L);
    } else {
      B();
      W();
      let img = wx.createImage();
      c.fillStyle = 'black';
      c.font = "30px PingFang SC";
      c.textAlign = "left";
      c.fillText('   game over', 100, 100);
      img.src = 'http://img.souche.com/f2e/c1b024e2a319addec3ffd55e92cde615.png';
      console.log(img);
      c.drawImage(img, 170, 200, 60, 60);
      wx.onTouchStart((e) => {
        // console.log('enter');
        if (!g) {
          init();
          g = 1;
        }
      })
    }
  };

  // onkeydown = ($) => {
  //   k = $.which;
  // }
  let startX;
  let moveX;

  wx.onTouchStart((e) => {
    startX = e.touches[0].pageX;

  })

  wx.onTouchMove((e) => {

    moveX = e.touches[0].pageX - startX;
    if (moveX > 0) k = 40;
    if (moveX < 0) k = 38;
    // console.log(e.touches[0].pageX);
  })

  // onkeyup = () => {
  //   k = 0;
  // };

  requestAnimationFrame(L);
}
init();
