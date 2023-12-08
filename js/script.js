const card = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
const music = new Audio("./music/christmas-song.ogg");
music.loop = true;
card.addEventListener('click', e => {
  $('html, body').css({overflow: 'hidden'});
  card.classList.toggle('flipped');
  music.play();
  // if (tapHint) {
  //   tapHint.remove()
  // }
  // else if(!tapHint){
  //   tapHint.add()
  // }
})
var date = moment();
document.getElementById("date").innerHTML = date.format('DD.MM.YYYY');

