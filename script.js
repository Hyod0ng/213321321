// 날짜 표시
function displayDate() {
    const dateBox = document.getElementById("date-box");
    const today = new Date();

    const dayNames = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    const text = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()} · ${dayNames[today.getDay()]}`;
    dateBox.textContent = text;
}

// 시간대 배경 변경
function changeBackgroundByTime() {
    const hour = new Date().getHours();
    const body = document.body;

    if (hour < 12) {
        body.style.background = "#cbe3ff";
    } else if (hour < 18) {
        body.style.background = "#b2c7d9";
    } else {
        body.style.background = "#879bb0";
    }
}

// DB 키워드
const keywordDB = {
    "help": "이름, 직업, 생일, MBTI, 좋아하는색, 포지션, 음원링크(유튜브)",
    "이름": "송하영",
    "직업": "가수 / 연예인",
    "생일": "1997년 9월 29일",
    "MBTI": "ISFJ",
    "좋아하는색": "파란색",
    "포지션": "보컬"
};

// ==================================================================
// ✨ 카카오톡 대화형 기능
// ==================================================================
function addChatMessage(text, isAI = false) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");

    msg.className = isAI ? "chat-ai" : "chat-user";
    msg.textContent = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ==================================================================
// 🎥 유튜브 링크 인식 기능
// ==================================================================
function extractYouTubeID(url) {
    let id = null;

    if (url.includes("youtube.com/watch?v=")) {
        id = url.split("v=")[1].substring(0, 11);
    } else if (url.includes("youtu.be/")) {
        id = url.split("youtu.be/")[1].substring(0, 11);
    }

    return id;
}

function insertYouTubePlayer(videoID) {
    const box = document.getElementById("youtube-box");
    box.innerHTML = `
        <iframe 
            width="100%" 
            height="250" 
            src="https://www.youtube.com/embed/${videoID}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
}

// ==================================================================
// ✉ 입력 처리
// ==================================================================
function handleUserInput() {
    const input = document.getElementById("user-input");
    const value = input.value.trim();
    if (!value) return;

    addChatMessage(value, false);

    

    // 유튜브 링크 입력 시
    const ytID = extractYouTubeID(value);
    if (ytID) {
        addChatMessage("유튜브 영상이 추가되었어요!", true);
        insertYouTubePlayer(ytID);
        input.value = "";
        return;
    }

    // DB 키워드 응답
    if (keywordDB[value]) {
        addChatMessage(keywordDB[value], true);
    } else {
        addChatMessage("해당 키워드는 DB에 없습니다.\n(help 입력 시 목록 표시)", true);
    }

    input.value = "";
}

// 이벤트
document.getElementById("send-btn").addEventListener("click", handleUserInput);
document.getElementById("user-input").addEventListener("keypress", e => {
    if (e.key === "Enter") handleUserInput();
});

// 실행
displayDate();
changeBackgroundByTime();
