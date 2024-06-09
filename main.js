let odai = [];
let usedodai = [];

// お題を表示する要素
const odaiDisplay = document.getElementById('odaiDisplay');

// ファイルからお題を読み込む(東方リスト)
function loadodaiFromFile(fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(text => {
            document.getElementById('inputodai').value = text;
        })
        .catch(error => {
            console.error('Error loading file:', error);
            themeDisplay.innerText = "ファイルの読み込みに失敗しました。";
        });
	}

function odaiclick() {
    // お題リストが空の場合は設定する
    if (odai.length === 0) {
        const input = document.getElementById('inputodai').value;
        odai = input.split(/[\s\u3000]+/).map(odai => odai.trim()).filter(odai => odai !== "");
        if (odai.length > 0) {
            usedodai = [...odai];
        } else {
            odaiDisplay.innerText = "リストが空っぽ";
            return;
        }
    }

    // お題を生成する
    generateodai();
}

function generateodai() {

    // ランダムにインデックスを選択
    const randomIndex = Math.floor(Math.random() * usedodai.length);
    const selectedodai = usedodai.splice(randomIndex, 1)[0];

    if (usedodai.length === 0) {
        odaiDisplay.innerText = `お題は「${selectedodai}」です。お題をひとまわりしました。`;
        odai = []; 
    } else {
        odaiDisplay.innerText = `お題は「${selectedodai}」です。`;
    }

}

function resetodai() {
            odai = []; // お題リストを空にする
            usedodai = []; // 使用済みインデックスリストを空にする
            document.getElementById('inputodai').value = ''; // テキストエリアを空にする
            document.getElementById('odaiDisplay').innerText = '🌈 無に返しました。'; // メッセージを表示
        }

// リセット確認関数
function confirmReset() {
	const confirmed = confirm('お題をリセットしますか？');
	if (confirmed) {
   	resetodai(); // リセットを実行
   }
}
