(()=>{"use strict";var e=function e(t,i,n,l){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.value=t,this.x=i,this.y=n,this.width=l,this.height=l,this.draggable=!1,this.moving=!1,this.startX=null,this.startY=null,this.xPosition=null,this.yPosition=null};function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function i(e,t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),this.cells=[],this.cellSize=e,this.cellCount=t,this.totalCellCount=t*t,this.ctx=n,this.clicks=0,this.createCells(this.cellSize,this.cellCount),this.clicksCount=0,this.moves=[],this.dragging=!1}var n,l;return n=i,(l=[{key:"createCells",value:function(t,i){for(var n=0;n<this.totalCellCount;n++){var l=n%i,o=Math.trunc(n/i);this.cells.push(new e(n===this.totalCellCount-1?0:n+1,l,o,t))}}},{key:"getClicks",value:function(){return this.clicks}},{key:"drawCell",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.ctx.fillStyle=i?"rgba(255, 185, 59, 0.8)":"#FFB93B",this.ctx.fillRect(e+1,t+1,this.cellSize-2,this.cellSize-2)}},{key:"drawNum",value:function(e,t,i){this.ctx.font="bold ".concat(this.cellSize/2,"px Sans"),this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle="#222",this.ctx.fillText(e,t,i)}},{key:"getEmptyCell",value:function(){return this.cells.find((function(e){return 0===e.value}))}},{key:"draw",value:function(){var e=this;this.cells.forEach((function(t,i){t.value>0&&!t.moving&&(e.drawCell(t.x*e.cellSize,t.y*e.cellSize,t.value===i+1),e.drawNum(t.value,t.x*e.cellSize+e.cellSize/2,t.y*e.cellSize+e.cellSize/2))}))}},{key:"move",value:function(e){var t=this,i=this.getEmptyCell(),n="",l=function(){i.value=e.value,e.value=0,t.clicks++,t.moves.push(n),t.cells.forEach((function(e){return e.draggable=!1})),e.x-1>=0&&(t.getCell(e.x-1,e.y).draggable=!0),e.x+1<=t.cellCount-1&&(t.getCell(e.x+1,e.y).draggable=!0),e.y-1>=0&&(t.getCell(e.x,e.y-1).draggable=!0),e.y+1<=t.cellCount-1&&(t.getCell(e.x,e.y+1).draggable=!0)};e.x-1===i.x&&e.y===i.y&&(n="left",l()),e.x+1===i.x&&e.y===i.y&&(n="right",l()),e.y-1===i.y&&e.x===i.x&&(n="up",l()),e.y+1===i.y&&e.x===i.x&&(n="down",l())}},{key:"isWon",value:function(){var e=this;return this.cells.every((function(t,i,n){return t.value===e.totalCellCount-1&&i===e.totalCellCount-2||0===t.value&&i===e.totalCellCount-1||t.value+1===n[i+1].value}))}},{key:"getCell",value:function(e,t){return this.cells.find((function(i){return i.x===e&&i.y===t}))}},{key:"mix",value:function(e){for(var t=function(){return 0===Math.floor(2*Math.random())},i=null,n=null,l=0;l<e;l++){var o=this.getEmptyCell(),a=t(),s=t();a||s||(i=o.x-1,n=o.y),a&&!s&&(i=o.x,n=o.y+1),!a&&s&&(i=o.x+1,n=o.y),a&&s&&(i=o.x,n=o.y-1),0<=i&&i<=this.cellCount-1&&0<=n&&n<=this.cellCount-1&&this.move(this.getCell(i,n))}this.clicks=0}}])&&t(n.prototype,l),i}(),n=document.createElement("div");n.classList.add("info-wrapper"),n.innerHTML='\n  <div  class="timer-wrapper">\n    <div>Time spent</div>\n    <div id ="timer" class="timer">0:00:00</div>\n  </div>\n  <div  class="moves-wrapper">\n    <div>Moves done</div>\n    <div id ="moves" class="moves">0</div>\n  </div>\n  ',document.body.appendChild(n);var l=document.createElement("div");l.classList.add("controls-wrapper"),l.innerHTML='\n  <div id ="reset-button" class="reset-button" title="Reset game"></div>\n  <div id ="resume-button" class="resume-button" title="Resume game"></div>\n  <div id ="pause-button" class="pause-button" title="Pause game"></div>\n  ',document.body.appendChild(l);var o=document.querySelector("#reset-button"),a=document.querySelector("#moves"),s=function(){return window.innerWidth>640?Math.floor(.35*window.innerWidth)/3:Math.floor(320/3)},c=s(),r=3*c,u=(window.innerHeight,window.innerWidth,document.createElement("div"));document.body.appendChild(u),u.classList.add("canvas-wrapper");var d=document.createElement("canvas");d.width=r,d.height=r;var h=d.getContext("2d");u.appendChild(d),h.fillRect(0,0,d.width,d.height);var v=new i(c,3,h);function f(e){var t=Math.trunc((e.pageX-d.offsetLeft)/v.cellSize),i=Math.trunc((e.pageY-d.offsetTop)/v.cellSize);v.move(v.getCell(t,i)),h.fillRect(0,0,d.width,d.height),v.draw(),v.isWon()&&console.log("Solved in ".concat(v.getClicks()," moves")),a.innerText=v.getClicks()}v.mix(80),v.draw(),d.addEventListener("click",f),d.addEventListener("mousedown",(function(e){e.preventDefault(),e.stopPropagation(),d.addEventListener("click",f);var t=Math.trunc((e.pageX-d.offsetLeft)/v.cellSize),i=Math.trunc((e.pageY-d.offsetTop)/v.cellSize),n=Math.trunc(e.pageX-d.offsetLeft),l=Math.trunc(e.pageY-d.offsetTop),o=v.getCell(t,i);o.draggable&&(v.dragging=!0,o.moving=!0,o.startX=n,o.startY=l,o.xPosition=o.x*v.cellSize,o.yPosition=o.y*v.cellSize)})),d.addEventListener("mouseup",(function(e){e.preventDefault(),e.stopPropagation();var t=v.cells.find((function(e){return e.moving}));v.dragging=!1,v.cells.forEach((function(e){e.moving=!1,e.xPosition=null,e.yPosition=null}));var i=Math.trunc((e.pageX-d.offsetLeft)/v.cellSize),n=Math.trunc((e.pageY-d.offsetTop)/v.cellSize);console.log(i,n);var l=v.getEmptyCell();l.x===i&&l.y===n?(console.log(t),v.move(t),h.fillRect(0,0,d.width,d.height),v.draw(),v.isWon()&&console.log("Solved in ".concat(v.getClicks()," moves"))):(h.fillRect(0,0,d.width,d.height),v.draw())})),d.addEventListener("mousemove",(function(e){if(v.dragging){e.preventDefault(),e.stopPropagation(),d.removeEventListener("click",f);var t=Math.trunc(e.pageX-d.offsetLeft),i=Math.trunc(e.pageY-d.offsetTop),n=v.cells.find((function(e){return e.moving})),l=t-n.startX,o=i-n.startY;n.xPosition+=l,n.yPosition+=o,h.fillRect(0,0,d.width,d.height),v.draw(),v.drawCell(n.xPosition,n.yPosition,!0),v.drawNum(n.value,n.xPosition+v.cellSize/2,n.yPosition+v.cellSize/2),n.startX=t,n.startY=i}})),o.addEventListener("click",(function(e){e.preventDefault(),h.fillRect(0,0,d.width,d.height),v.mix(80),v.draw()})),window.addEventListener("resize",(function(){console.log("resize"),v.cellSize=s(),r=3*v.cellSize,d.width=r,d.height=r,h.fillRect(0,0,r,r),v.draw()}));var g=document.querySelector("#timer");setInterval((function(){var e=g.innerHTML.split(":"),t=e[0],i=e[1],n=e[2];59===parseInt(n)?(n="00",59===parseInt(i)?(i="00",t++):i=++i<10?"0".concat(i):i):n=++n<10?"0".concat(n):n,g.innerHTML="".concat(t,":").concat(i,":").concat(n)}),1e3)})();