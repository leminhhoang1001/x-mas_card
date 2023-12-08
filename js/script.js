const card = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
card.addEventListener('click', function(e){
  e.preventDefault();
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'],platform = window.navigator?.userAgentData?.platform || window.navigator.platform;
const muteSound = new Howl({
  src: ['./christmas-song.ogg'],
  mute: false,
  loop: true,
  volume: 1
});
muteSound.mobileAutoEnable = false;
const music = new Audio("./music/christmas-song.ogg");
music.loop = true;

  if(iosPlatforms.indexOf(platform) !== -1){muteSound.play();}
  else{music.play();}
  $('html, body').css({overflow: 'hidden'});
  card.classList.toggle('flipped');

  // if (tapHint) {
  //   tapHint.remove()
  // }
  // else if(!tapHint){
  //   tapHint.add()
  // }
});
var date = moment();
document.getElementById("date").innerHTML = date.format('DD.MM.YYYY');

