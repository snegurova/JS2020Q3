(()=>{"use strict";var e={244:(e,t,n)=>{e.exports=n.p+"edf656ba0f00183fd42c.mp3"}},t={};function n(l){if(t[l])return t[l].exports;var i=t[l]={exports:{}};return e[l](i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var l=t.getElementsByTagName("script");l.length&&(e=l[l.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e=n(244),t=function e(t,n,l,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.value=t,this.x=n,this.y=l,this.width=i,this.height=i,this.draggable=!1,this.moving=!1,this.startX=null,this.startY=null,this.xPosition=null,this.yPosition=null,this.xPositionAnimated=null,this.yPositionAnimated=null};function l(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}var i=function(){function e(t,n,l){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.cells=[],this.cellSize=t,this.cellCount=n,this.totalCellCount=n*n,this.ctx=l,this.clicks=0,this.createCells(this.cellSize,this.cellCount),this.clicksCount=0,this.moves=[],this.dragging=!1,this.cellIsMoving=!1,this.mute=!1}var n,i;return n=e,(i=[{key:"createCells",value:function(e,n){for(var l=0;l<this.totalCellCount;l++){var i=l%n,o=Math.trunc(l/n);this.cells.push(new t(l===this.totalCellCount-1?0:l+1,i,o,e))}}},{key:"getClicks",value:function(){return this.clicks}},{key:"drawCell",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.ctx.fillStyle=n?"rgba(255, 185, 59, 0.8)":"#FFB93B",this.ctx.fillRect(e+1,t+1,this.cellSize-2,this.cellSize-2)}},{key:"drawNum",value:function(e,t,n){this.ctx.font="bold ".concat(this.cellSize/2,"px Sans"),this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle="#222",this.ctx.fillText(e,t,n)}},{key:"getEmptyCell",value:function(){return this.cells.find((function(e){return 0===e.value}))}},{key:"draw",value:function(){var e=this;this.cells.forEach((function(t,n){t.value>0&&!t.moving&&(e.drawCell(t.x*e.cellSize,t.y*e.cellSize,t.value===n+1),e.drawNum(t.value,t.x*e.cellSize+e.cellSize/2,t.y*e.cellSize+e.cellSize/2))}))}},{key:"move",value:function(e){var t=this,n=this.getEmptyCell(),l="",i=function(){n.value=e.value,e.value=0,t.clicks++,t.moves.push(l),t.cells.forEach((function(e){return e.draggable=!1})),e.x-1>=0&&(t.getCell(e.x-1,e.y).draggable=!0),e.x+1<=t.cellCount-1&&(t.getCell(e.x+1,e.y).draggable=!0),e.y-1>=0&&(t.getCell(e.x,e.y-1).draggable=!0),e.y+1<=t.cellCount-1&&(t.getCell(e.x,e.y+1).draggable=!0)};e.x-1===n.x&&e.y===n.y&&(l="left",i()),e.x+1===n.x&&e.y===n.y&&(l="right",i()),e.y-1===n.y&&e.x===n.x&&(l="up",i()),e.y+1===n.y&&e.x===n.x&&(l="down",i())}},{key:"isWon",value:function(){var e=this;return this.cells.every((function(t,n,l){return t.value===e.totalCellCount-1&&n===e.totalCellCount-2||0===t.value&&n===e.totalCellCount-1||t.value+1===l[n+1].value}))}},{key:"getCell",value:function(e,t){return this.cells.find((function(n){return n.x===e&&n.y===t}))}},{key:"mix",value:function(e){for(var t=function(){return 0===Math.floor(2*Math.random())},n=null,l=null,i=0;i<e;i++){var o=this.getEmptyCell(),a=t(),r=t();a||r||(n=o.x-1,l=o.y),a&&!r&&(n=o.x,l=o.y+1),!a&&r&&(n=o.x+1,l=o.y),a&&r&&(n=o.x,l=o.y-1),0<=n&&n<=this.cellCount-1&&0<=l&&l<=this.cellCount-1&&this.move(this.getCell(n,l))}this.clicks=0}}])&&l(n.prototype,i),e}(),o=document.createElement("div");o.classList.add("info-wrapper"),o.innerHTML='\n  <div  class="timer-wrapper">\n    <div>Time spent</div>\n    <div id ="timer" class="timer">0:00:00</div>\n  </div>\n  <div  class="cells-count-wrapper">\n    <select name="cells-count" id="cells-count">\n      <option value="3">3 x 3</option>\n      <option value="4" selected>4 x 4</option>\n      <option value="5">5 x 5</option>\n      <option value="6">6 x 6</option>\n      <option value="7">7 x 7</option>\n      <option value="8">8 x 8</option>\n    </select>\n  </div>\n  <div  class="moves-wrapper">\n    <div>Moves done</div>\n    <div id ="moves" class="moves">0</div>\n  </div>\n  ',document.body.appendChild(o);var a=document.createElement("div");a.classList.add("controls-wrapper"),a.innerHTML='\n  <div id ="reset-button" class="btn reset-button" title="Reset/Delete game"></div>\n  <div id ="mute-button" class="btn mute-button" title="Mute"></div>\n  <div id ="solve-button" class="btn solve-button" title="Solve game"></div>\n  <div id ="resume-button" class="btn resume-button" title="Restore game"></div>\n  <div id ="pause-button" class="btn pause-button" title="Save game"></div>\n  ',document.body.appendChild(a);var r=document.querySelector("#reset-button"),c=document.querySelector("#pause-button"),s=document.querySelector("#resume-button"),u=document.querySelector("#solve-button"),d=document.querySelector("#mute-button"),v=document.querySelector("#moves"),m=document.querySelector("#cells-count"),h=m.options[m.selectedIndex].value,g=function(){return window.innerWidth>640?Math.floor(500/h):Math.floor(320/h)},f=g(),p=f*h,y=document.createElement("div");document.body.appendChild(y),y.classList.add("canvas-wrapper");var x=document.createElement("canvas");x.width=p,x.height=p;var S=x.getContext("2d");y.appendChild(x),S.fillRect(0,0,x.width,x.height);var C=new i(f,h,S);C.mix(Math.floor(Math.random()*h*30+Math.pow(h,3))),C.draw();var w=document.createElement("div");w.classList.add("result-wrapper"),document.body.appendChild(w);var M=new Audio(e);function b(e,t){var n=t?null:Math.trunc((e.pageX-x.offsetLeft)/C.cellSize),l=t?null:Math.trunc((e.pageY-x.offsetTop)/C.cellSize),i=t||C.getCell(n,l);if(console.log(i),i.draggable){C.mute||(M.play(),console.log(M)),i.moving=!0;var o=C.getEmptyCell();i.xPositionAnimated||(i.xPositionAnimated=i.x*C.cellSize+1),i.yPositionAnimated||(i.yPositionAnimated=i.y*C.cellSize+1);var a=function(e,t){var n=t.x*C.cellSize,l=t.y*C.cellSize;S.fillRect(0,0,x.width,x.height),C.draw(),C.drawCell(e.xPositionAnimated,e.yPositionAnimated,!0),C.drawNum(e.value,e.xPositionAnimated+C.cellSize/2,e.yPositionAnimated+C.cellSize/2),Math.trunc(e.xPositionAnimated/2)===Math.trunc(n/2)||(Math.trunc(e.xPositionAnimated/2)>Math.trunc(n/2)?e.xPositionAnimated-=2:e.xPositionAnimated+=2),Math.trunc(e.yPositionAnimated/2)!==Math.trunc(l/2)&&(Math.trunc(e.yPositionAnimated/2)>Math.trunc(l/2)?e.yPositionAnimated-=2:e.yPositionAnimated+=2),Math.trunc(e.xPositionAnimated/2)===Math.trunc(n/2)&&Math.trunc(e.yPositionAnimated/2)===Math.trunc(l/2)&&(clearInterval(r),e.xPositionAnimated=null,e.yPositionAnimated=null,e.moving=!1,C.move(e),S.fillRect(0,0,x.width,x.height),C.draw(),C.isWon()&&(w.innerHTML="Solved in ".concat(C.getClicks()," moves!")),v.innerText=C.getClicks())}.bind(null,i,o),r=setInterval(a,1)}}d.addEventListener("click",(function(){d.classList.toggle("active"),C.mute=!C.mute})),m.addEventListener("change",(function(){h=m.options[m.selectedIndex].value,C.cellCount=h,C.totalCellCount=h*h,C.cellSize=g(),localStorage.removeItem("movesArray"),localStorage.removeItem("movesCount"),localStorage.removeItem("time"),localStorage.removeItem("cells"),P.innerHTML="0:00:00",C.moves.splice(0),C.clicks=0,C.cells.splice(0),C.createCells(C.cellSize,C.cellCount),p=C.cellSize*h,x.width=p,x.height=p,S.fillRect(0,0,p,p),C.mix(Math.floor(Math.random()*h*30+Math.pow(h,3))),C.draw()})),x.addEventListener("click",b),x.addEventListener("mousedown",(function(e){e.preventDefault(),e.stopPropagation(),x.addEventListener("click",b);var t=Math.trunc((e.pageX-x.offsetLeft)/C.cellSize),n=Math.trunc((e.pageY-x.offsetTop)/C.cellSize),l=Math.trunc(e.pageX-x.offsetLeft),i=Math.trunc(e.pageY-x.offsetTop),o=C.getCell(t,n);o.draggable&&(C.dragging=!0,o.moving=!0,o.startX=l,o.startY=i,o.xPosition=o.x*C.cellSize,o.yPosition=o.y*C.cellSize)})),x.addEventListener("mouseup",(function(e){e.preventDefault(),e.stopPropagation();var t=C.cells.find((function(e){return e.moving}));C.dragging=!1,C.cells.forEach((function(e){e.moving=!1,e.xPosition=null,e.yPosition=null}));var n=Math.trunc((e.pageX-x.offsetLeft)/C.cellSize),l=Math.trunc((e.pageY-x.offsetTop)/C.cellSize),i=C.getEmptyCell();i.x===n&&i.y===l?(C.move(t),v.innerText=C.getClicks(),S.fillRect(0,0,x.width,x.height),C.draw(),C.isWon()&&(w.innerHTML="Solved in ".concat(C.getClicks()," moves!"))):(S.fillRect(0,0,x.width,x.height),C.draw())})),x.addEventListener("mousemove",(function(e){if(C.dragging){e.preventDefault(),e.stopPropagation(),x.removeEventListener("click",b);var t=Math.trunc(e.pageX-x.offsetLeft),n=Math.trunc(e.pageY-x.offsetTop),l=C.cells.find((function(e){return e.moving})),i=t-l.startX,o=n-l.startY;l.xPosition+=i,l.yPosition+=o,S.fillRect(0,0,x.width,x.height),C.draw(),C.drawCell(l.xPosition,l.yPosition,!0),C.drawNum(l.value,l.xPosition+C.cellSize/2,l.yPosition+C.cellSize/2),l.startX=t,l.startY=n}})),u.addEventListener("click",(function(){for(var e=C.getEmptyCell(),t=C.moves.length-1;t>=0;t--){var n=null;"left"===C.moves[t]&&(n=C.getCell(e.x-1,e.y)),"right"===C.moves[t]&&(n=C.getCell(e.x+1,e.y)),"up"===C.moves[t]&&(n=C.getCell(e.x,e.y-1)),"down"===C.moves[t]&&(n=C.getCell(e.x,e.y+1)),e=n,setTimeout(b,1e3,null,n)}})),r.addEventListener("click",(function(e){e.preventDefault(),localStorage.removeItem("movesArray"),localStorage.removeItem("movesCount"),localStorage.removeItem("time"),localStorage.removeItem("cells"),S.fillRect(0,0,x.width,x.height),C.mix(Math.floor(Math.random()*h*30+Math.pow(h,3))),C.draw(),P.innerHTML="0:00:00",C.moves.splice(0),C.clicks=0,v.innerText=C.getClicks(),w.innerHTML=""})),window.addEventListener("resize",(function(){C.cellSize=g(),p=C.cellSize*h,x.width=p,x.height=p,S.fillRect(0,0,p,p),C.draw()}));var L=null,P=document.querySelector("#timer");function k(){var e=P.innerHTML.split(":"),t=e[0],n=e[1],l=e[2];59===parseInt(l)?(l="00",59===parseInt(n)?(n="00",t++):n=++n<10?"0".concat(n):n):l=++l<10?"0".concat(l):l,P.innerHTML="".concat(t,":").concat(n,":").concat(l)}L=setInterval(k,1e3),c.addEventListener("click",(function(){clearInterval(L),L=null,localStorage.setItem("movesArray",C.moves),localStorage.setItem("movesCount",C.clicks),localStorage.setItem("time",P.innerHTML),localStorage.setItem("cells",JSON.stringify(C.cells))})),s.addEventListener("click",(function(){L||(L=setInterval(k,1e3)),C.moves=localStorage.getItem("movesArray").split(","),P.innerHTML=localStorage.getItem("time"),v.innerHTML=localStorage.getItem("movesCount"),C.cells=JSON.parse(localStorage.getItem("cells")),S.fillRect(0,0,x.width,x.height),C.draw()})),window.addEventListener("DOMContentLoaded",(function(){localStorage.getItem("time")&&(C.moves=localStorage.getItem("movesArray").split(","),P.innerHTML=localStorage.getItem("time"),C.clicks=localStorage.getItem("movesCount"),v.innerHTML=localStorage.getItem("movesCount"),C.cells=JSON.parse(localStorage.getItem("cells")),S.fillRect(0,0,x.width,x.height),C.draw())}))})()})();