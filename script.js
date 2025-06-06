// カウントダウンの目標日時を設定します
// 現在時刻が 2025年6月6日 18:55:41 JST なので、テストしやすいように少し先の未来の日時に設定します。
// 例: 現在時刻の15分後 (2025-06-06 19:10:41) に設定
const targetDate = new Date('2025-06-06T19:00:00').getTime(); 

const countdownElement = document.getElementById('countdown');

let blinkInterval; // 点滅用のタイマーIDを保持する変数

function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate - now; // 目標日時までの残り時間（ミリ秒）

    const tenMinutesInMs = 10 * 60 * 1000;   // 残り10分をミリ秒で計算
    const fiveMinutesInMs = 5 * 60 * 1000;   // 残り5分をミリ秒で計算

    // スタイルのリセット関数 (点滅も含む全てのリセット)
    function resetStyles() {
        if (blinkInterval) {
            clearInterval(blinkInterval);
            blinkInterval = null;
        }
        countdownElement.classList.remove('red-countdown');
        countdownElement.classList.remove('critical-countdown');
        countdownElement.classList.remove('transparent');
    }

    // 時間が残っている場合
    if (distance > 0) { 
        // --- 点滅と色変更のロジック ---
        if (distance <= fiveMinutesInMs) {
            // 残り5分以下の場合: 背景を赤くし、文字を白に、点滅継続
            countdownElement.classList.add('critical-countdown');
            countdownElement.classList.remove('red-countdown'); // 念のため赤文字クラスは削除
            // 点滅がまだ開始されていなければ開始
            if (!blinkInterval) {
                blinkInterval = setInterval(() => {
                    countdownElement.classList.toggle('transparent');
                }, 500);
            }
        } else if (distance <= tenMinutesInMs) {
            // 残り10分以下だが5分より多い場合: 文字を赤くし、点滅を開始
            countdownElement.classList.remove('critical-countdown'); // 背景赤クラスは削除
            countdownElement.classList.add('red-countdown'); // 文字赤クラスを追加
            // 点滅がまだ開始されていなければ開始
            if (!blinkInterval) {
                blinkInterval = setInterval(() => {
                    countdownElement.classList.toggle('transparent');
                }, 500);
            }
        } else {
            // 10分より多い場合: 点滅も色変更も全てリセット
            resetStyles();
        }

        const totalSeconds = Math.floor(distance / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formatTime = (num) => num.toString().padStart(2, '0');
        countdownElement.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    } else { // 目標時刻を過ぎた場合 (オーバータイム)
        resetStyles(); // カウントダウン中の全てのスタイル（点滅含む）をリセット

        // 経過時間を計算 (distanceは負の値になっているので、符号を反転)
        const elapsedDistance = Math.abs(distance);
        const totalElapsedSeconds = Math.floor(elapsedDistance / 1000);

        const hours = Math.floor(totalElapsedSeconds / 3600);
        const minutes = Math.floor((totalElapsedSeconds % 3600) / 60);
        const seconds = totalElapsedSeconds % 60;

        const formatTime = (num) => num.toString().padStart(2, '0');
        countdownElement.innerHTML = `+${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        
        // 過ぎた後の文字色などをデフォルト（#007bff）に戻したい場合は、ここで設定
        // countdownElement.style.color = '#007bff';
        // countdownElement.style.backgroundColor = '#fff';
    }
}

// 1秒ごとにカウントダウンを更新
setInterval(updateCountdown, 1000);

// 初回表示
updateCountdown();
