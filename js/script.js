
  const card = document.getElementById('card')
  const playmusic = document.getElementById('card')
  const tapHint = document.getElementById('tap-hint')
  let id;
  const button = document.getElementById('muteaudio');
  const musicOn = '<i class="fas fa-volume-high"></i>';
  const musicOff = '<i class="fas fa-volume-xmark"></i>';
  const muteSound = new Howl({
    src: ['./christmas-song.m4a', './christmas-song.m4a', './christmas-song.m4a'],
    // mute: false,
    // autoplay:true,
    loop: true,
    html5: true,
    volume: 1
  });
  muteSound.autoUnlock = false;
  card.addEventListener('click', function(e){
    e.preventDefault();
    $('html, body').css({overflow: 'hidden'});
    card.classList.toggle('flipped');

    // if (tapHint) {
    //   tapHint.remove()
    // }
    // else if(!tapHint){
    //   tapHint.add()
    // }
  });
  // play music once tim flip card
  playmusic.addEventListener('click', playchristmas, {once:true});
  function playchristmas(){
    muteSound.play();
  }
  // update date of card
  var date = moment();
  document.getElementById("date").innerHTML = date.format('DD.MM.YYYY');


  // mute/unmute

  
  button.addEventListener("click", () => {
      // if the audio is muted, set the btn.innerHTML to unmuteIcon
      // otherwise, set it to the muteIcon
      if (muteSound.muted) {
        button.innerHTML = musicOn;
        muteSound.mute(false);
      } else {
        button.innerHTML = musicOff;
        muteSound.mute(true);
      }
      // toggle the muted property of the audio element
      muteSound.muted = !muteSound.muted;
  });