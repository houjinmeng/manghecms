// var html = document.getElementsByTagName("html")[0];
// var hWidth = html.getBoundingClientRect().width;
// html.style.fontSize = hWidth * (100 / 360) + 'px';
window.onresize = function () {
    let userWidth = document.documentElement.clientWidth;
    let fz = userWidth / 750 * 100
    document.documentElement.style.fontSize = fz + 'px'
  }
  resizePage()
  function resizePage() {
    let userWidth = document.documentElement.clientWidth;
    let fz = userWidth / 750 * 100
    document.documentElement.style.fontSize = fz + 'px'
  
  }
  