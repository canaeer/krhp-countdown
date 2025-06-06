// カウントダウンの目標日時を設定します (2025年6月6日 00:00:00 JST)
// 現在時刻は2025年6月6日18時42分17秒なので、テストしやすいように少し先の未来の日時を設定します
const targetDate = new Date('2025-06-07T12:00:00').getTime(); // 例: 明日のお昼12時

const countdownElement = document.getElementById('countdown');

// 点滅用のタイマーIDを保持する変数
let blinkInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now; // 目標日時までの残り時間（ミリ秒）

    // 残り10分をミリ秒で計算 (10分 * 60秒 * 1000ミリ秒)
    const tenMinutesInMs = 10 * 60 * 1000;

    // 時間が残っている場合
    if (distance > 0) {
        // 残り時間が10分以下になったら
        if (distance <= tenMinutesInMs) {
            // まだ点滅が開始していなければ開始する
            if (!blinkInterval) {
                // カウントダウンの文字色をまず赤にする
                countdownElement.classList.add('red-countdown');
                // 0.5秒ごとに点滅（赤と元の色を交互に）
                blinkInterval = setInterval(() => {
                    countdownElement.classList.toggle('transparent'); // 透明にするクラスをトグル
                }, 500); // 0.5秒ごとに切り替え
            }
        } else {
            // 10分より多い場合は点滅を停止し、スタイルを元に戻す
            if (blinkInterval) {
                clearInterval(blinkInterval); // 点滅停止
                blinkInterval = null; // IDをクリア
                countdownElement.classList.remove('red-countdown'); // 赤色を解除
                countdownElement.classList.remove('transparent'); // 透明も解除
            }
        }

        const totalSeconds = Math.floor(distance / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formatTime = (num) => num.toString().padStart(2, '0');

        countdownElement.innerHTML = 
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    } else {
        // カウントダウンが終了した場合
        countdownElement.innerHTML = 'カウントダウン終了！';
        // 点滅が設定されていれば停止する
        if (blinkInterval) {
            clearInterval(blinkInterval);
            blinkInterval = null;
        }
        countdownElement.classList.remove('red-countdown'); // 赤色を解除
        countdownElement.classList.remove('transparent'); // 透明も解除
    }
}

// 1秒ごとにカウントダウンを更新
setInterval(updateCountdown, 1000);

// 初回表示
updateCountdown();
