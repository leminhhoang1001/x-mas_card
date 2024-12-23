const card = document.getElementById('card')
    // const playmusic = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
let id;
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';
let messagelist = [];
let lastIndex = -1; // Lưu chỉ mục tin nhắn trước đó
//= [
//     "Wishing you a season that's merry and bright!",
//     "For you at Christmas time: A wish for happiness, warmth, and love.",
//     "May this season be full of light and laughter for you and your family.",
//     "Every Christmas is merrier because you're a part of it, my friend.",
//     "Peace, good will, and happiness for you this Christmas and every other!",
//     "I hope you have a cozy Christmas that chases the chill of winter away.",
//     "May this holy season be full of true miracles and love for you, always.",
//     "Sending you the very warm wish of Christmas love!",
//     "This Christmas, let it snow and let your light glow."
// ];

const muteSound = new Howl({
    src: ['./audio/christmas-song.mp3'],
    // mute: false,
    // autoplay: true,
    loop: true,
    html5: true,
    volume: 1
});
muteSound.autoUnlock = false;

// Hàm đọc file .txt và chuyển nội dung thành mảng
// Hàm tải danh sách câu chúc từ file JSON
async function loadMessages() {
    try {
        const response = await fetch('js/messages.json'); // Đường dẫn tới file JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        messagelist = await response.json(); // Parse JSON thành mảng
        console.log('Danh sách câu chúc đã tải thành công:', messagelist);
    } catch (error) {
        console.error('Lỗi khi tải danh sách câu chúc:', error.message);
    }
}

// Hàm lấy số ngẫu nhiên sử dụng crypto
function getSecureRandomIndex(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max; // Lấy phần dư để đảm bảo trong khoảng 0 đến max - 1
}

// Sự kiện lật thiệp
card.addEventListener('click', function(e) {
    e.preventDefault();
    $('html, body').css({ overflow: 'hidden' }); // Vô hiệu hóa cuộn khi lật thiệp
    card.classList.toggle('flipped'); // Lật thiệp

    // Kiểm tra nếu đang ở mặt sau (lớp "flipped" được thêm vào)
    if (card.classList.contains('flipped')) {
        setTimeout(() => {
            if (messagelist.length === 0) {
                console.error('Danh sách câu chúc trống hoặc chưa được tải.');
                return;
            }

            // Chọn câu chúc ngẫu nhiên
            let random;
            do {
                random = getSecureRandomIndex(messagelist.length);
            } while (random === lastIndex); // Đảm bảo không lặp lại liên tiếp

            lastIndex = random; // Cập nhật chỉ mục mới
            const message = messagelist[random];

            // Xóa nội dung cũ trước khi hiển thị câu chúc mới
            const messageContainer = document.querySelector('.message-content');
            if (messageContainer) {
                messageContainer.innerHTML = ''; // Xóa nội dung cũ
            }

            // Hiển thị câu chúc mới
            new Typed('.message-content', {
                strings: [message],
                typeSpeed: 40,
                showCursor: false
            });
        }, 600); // Thời gian trễ để khớp với hiệu ứng lật
    }
});

// Tải danh sách câu chúc khi trang được tải
loadMessages();

// play music once tim flip card
card.addEventListener('click', playchristmas, { once: true });

function playchristmas() {
    muteSound.play();
}

// Kích hoạt plugin duration của dayjs
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_utc);

// update date of card
function getChristmasCountdown() {
    const now = dayjs().startOf('day'); // thời gian hiện tại
    const currentYear = now.year(); //lấy năm hiện tại

    //ngày giáng sinh
    const christmasThisYear = dayjs(`${currentYear}-12-24T00:00:00`);
    // Nếu đã qua Giáng sinh, tính cho năm tiếp theo
    // const targetDate = now.isAfter(christmasThisYear) ? dayjs(`${currentYear + 1}-12-24T00:00:00`) : christmasThisYear;

    // Nếu hiện tại là tháng 12, hiển thị đếm ngược
    if (now.month() === 11) { // Tháng 12 (tháng 0-based index)
        if (now.isBefore(christmasThisYear)) {
            const diff = christmasThisYear.diff(now, 'days'); // Số ngày còn lại
            // const countdown = dayjs.duration(diff);
            const inputcontent1 = `<p class="daysss"> Days</p>`;
            const inputcontent2 = `<p class="dayleft"> to go!</p>`;
            // return `${countdown.days()} ${inputcontent1} ${inputcontent2}`;
            return `${diff} ${inputcontent1} ${inputcontent2}`;
        } else {
            // Sau hoặc đúng ngày Giáng sinh, hiển thị ngày hiện tại    
            return `${now.format('DD.MM.YYYY')}`;

        }
    }
}

function updateCountdown() {
    const countdownElement = document.getElementById('date');
    const countdownText = getChristmasCountdown(); // Lấy dữ liệu từ hàm đếm ngược
    countdownElement.innerHTML = countdownText;
    if (countdownText.includes('.')) { // Kiểm tra nếu kết quả có định dạng ngày tháng năm (VD: DD-MM-YYYY)
        countdownElement.classList.add('green');
    } else {
        countdownElement.classList.remove('green'); // Nếu không, giữ nguyên màu đỏ
    }
}

// Cập nhật đếm ngược mỗi giây
setInterval(updateCountdown, 1000);

// Hiển thị ngay lập tức khi load trang
updateCountdown();


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


// // Random TypeWriter Message

// card.addEventListener('click', function() {
//     setTimeout(function() {
//         let random;
//         do {
//             random = getSecureRandomIndex(messagelist.length);
//         } while (random === lastIndex); // Đảm bảo không trùng với lần trước

//         lastIndex = random; // Cập nhật chỉ mục mới        
//         var speed = 50;
//         var message = messagelist[random];
//         // Làm sạch nội dung cũ (nếu có)
//         const messageContainer = document.querySelector('.message-content');
//         if (messageContainer) {
//             messageContainer.innerHTML = ''; // Xóa nội dung cũ
//         }
//         var typed = new Typed('.message-content', {
//             strings: [message],
//             typeSpeed: 40,
//             showCursor: false
//         });
//     }, 2000);
// });

// function typeWriter() {
//     var typed = new Typed('.message-content', {
//         strings: [messagelist[random]],
//         typeSpeed: 90
//     });
// }