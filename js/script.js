
  const card = document.getElementById('card')
  // const playmusic = document.getElementById('card')
  const tapHint = document.getElementById('tap-hint')
  let id;
  const button = document.getElementById('muteaudio');
  const musicOn = '<i class="fas fa-volume-high"></i>';
  const musicOff = '<i class="fas fa-volume-xmark"></i>';
  const messagelist = [
    "Wishing you a season that's merry and bright!", 
    "For you at Christmas time: A wish for happiness, warmth, and love.", 
    "May this season be full of light and laughter for you and your family.", 
    "Every Christmas is merrier because you're a part of it, my friend.", 
    "Peace, good will, and happiness for you this Christmas and every other!", 
    "I hope you have a cozy Christmas that chases the chill of winter away.", 
    "May this holy season be full of true miracles and love for you, always.", 
    "Sending you the very warm wish of Christmas love!", 
    "This Christmas, let it snow and let your light glow."
      ];
  const random = Math.floor(Math.random() * messagelist.length);
  var i =0;
  var speed = 50;
  var message = messagelist[random];
  const muteSound = new Howl({
    src: ['./audio/christmas-song.mp3'],
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
  card.addEventListener('click', playchristmas, {once:true});
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


  // Random TypeWriter Message

  card.addEventListener('click', function(){setTimeout(function(){    
    var typed = new Typed('.message-content', {
    strings: [messagelist[random]],
    typeSpeed: 40,
    showCursor: false
    });},2000);}, {once:true}
  );

  // function typeWriter() {
  //   var typed = new Typed('.message-content', {
  //     strings: [messagelist[random]],
  //     typeSpeed: 90
  //   });
  // }
