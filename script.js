// カウントダウンの目標日時を設定します
// 例: 2025年12月31日 23時59分59秒
// 今日の日付が2025年6月4日なので、少し先のテスト用に日付を変更してみましょう
const targetDate = new Date('2025-06-06T19:00:00').getTime(); // 例: 今日の正午

const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now; // 目標日時までの残り時間（ミリ秒）

    // 時間が残っている場合
    if (distance > 0) {
        // 日数は考慮せず、総時間を計算します
        const totalSeconds = Math.floor(distance / 1000);

        const hours = Math.floor(totalSeconds / 3600); // 3600秒 = 1時間
        const minutes = Math.floor((totalSeconds % 3600) / 60); // 3600秒で割った余りを60秒で割る
        const seconds = totalSeconds % 60; // 60秒で割った余り

        // 数字が1桁の場合に、前に '0' をつけて2桁表示にする関数
        const formatTime = (num) => num.toString().padStart(2, '0');

        countdownElement.innerHTML = 
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    } else {
        // カウントダウンが終了した場合
        countdownElement.innerHTML = 'カウントダウン終了！';
    }
}

// 1秒ごとにカウントダウンを更新
setInterval(updateCountdown, 1000);

// 初回表示
updateCountdown();
