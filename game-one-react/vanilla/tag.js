var fifteen = {
  Move: {up: -5, left: -1, down: 5, right: 1},
  order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16, 17, 18, 19 ].sort(function() { return Math.random()-.5; }).concat(0),
  hole: 19,
  isCompleted: function() { return !this.order.some(function(item, i) { return item > 0 && item-1 !== i; }); },
  go: function(move) {
    var index = this.hole + move;
      debugger;
    if (!this.order[index]) return false;
    if (move == fifteen.Move.left || move == fifteen.Move.right)
     if (Math.floor(this.hole/5) !== Math.floor(index/5)) return false;
    this.swap(index, this.hole);
    this.hole = index;
    return true; },
  swap: function(i1, i2) { var t = this.order[i1]; this.order[i1] = this.order[i2]; this.order[i2] = t; },
  solvable: function(a) {
    for (var kDisorder = 0, i = 1, len = a.length-1; i < len; i++)
      for (var j = i-1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
    return !(kDisorder % 2); } };
if (!fifteen.solvable(fifteen.order)) fifteen.swap(0, 1);
var box = document.body.appendChild(document.createElement('div'));
for (var i = 0; i < 20; i++) box.appendChild(document.createElement('div'));
window.addEventListener('keydown', function(e) {
  if (fifteen.go(fifteen.Move[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {
    draw(); if (fifteen.isCompleted()) {
      box.style.backgroundColor = "gold";
      window.removeEventListener('keydown', arguments.callee); } }});
draw();
function draw() {
  for (var i = 0, tile; tile = box.childNodes[i], i < 20; i++) {
    tile.textContent = fifteen.order[i]; tile.style.visibility = fifteen.order[i]? 'visible' : 'hidden'; console.log(tile.style.visibility);} };
