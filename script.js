const IMAGES = {
    PHONE: 'assets/phone.png',
    POLICE: 'assets/police.png',
    WARNING: 'assets/warning.png',
    SUCCESS: 'assets/success.png',
    WARRANT: 'assets/warrant.png',
    THREAT: 'assets/police_threat.png'
};

const flowData = {
    start: {
        speaker: "電話",
        text: "プルルルル……<br>電話がかかってきました。どうしますか？",
        advice: "まずは落ち着いて、相手を確認することが大切です。",
        image: IMAGES.PHONE,
        choices: [
            { text: "電話に出る", next: "step_scam_intro", style: "btn-danger" },
            { text: "番号を確認する", next: "check_number", style: "btn-safe" }
        ]
    },
    check_number: {
        speaker: "電話",
        text: "画面に表示された番号を確認しました。<br>知らない番号です。どうしますか？",
        advice: "知らない番号は詐欺の可能性があります。",
        image: IMAGES.PHONE,
        choices: [
            { text: "知らない番号なので、気を付けながら出る", next: "step_scam_intro", style: "btn-danger" },
            { text: "知らない番号なので出ない", next: "end_ignore", style: "btn-safe" }
        ]
    },
    end_ignore: {
        speaker: "解説",
        text: "正解です！<br>知らない番号には出ないのが一番安全です。",
        advice: "留守番電話設定にしておくと、さらに安心です。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    end_safe_call: {
        speaker: "解説",
        text: "知っている人なら大丈夫ですね。<br>でも、お金の話が出たら要注意です！",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    step_scam_intro: {
        speaker: "自称・警察",
        text: "「XX県警捜査第二課のヤマダです。犯人があなた名義のキャッシュカードを持っていました。何か心当たりがありますか？」",
        advice: null,
        image: IMAGES.POLICE,
        choices: [
            { text: "心当たりはない", next: "step_no_clue", style: "btn-primary" },
            { text: "念のため、所属と連絡先を聞く", next: "step_ask_ref", style: "btn-primary" }
        ]
    },
    step_no_clue: {
        speaker: "自称・警察",
        text: "「心当たりがないのであれば、あなたの持っているお金が犯罪で得たものでないか確認します。確認後、お金は返します。」",
        advice: "警察がお金を預かることは絶対にありません！",
        image: IMAGES.POLICE,
        choices: [
            { text: "断る", next: "step_video_offer", style: "btn-safe" },
            { text: "一旦、振り込む", next: "end_transfer_scam", style: "btn-danger" }
        ]
    },
    end_refuse: {
        speaker: "解説",
        text: "素晴らしい判断です！<br>毅然と断る勇気があなたを守りました。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    end_transfer_scam: {
        speaker: "警告",
        text: "危険！！！<br>それは詐欺です！絶対にお金を振り込んではいけません！",
        advice: "「お金を振り込んで」と言われたら100%詐欺です。今すぐ警察（#9110）に相談してください。",
        image: IMAGES.WARNING,
        isEnd: true,
        type: "danger"
    },
    step_ask_ref: {
        speaker: "自称・警察",
        text: "「XX県警のヤマダです。連絡先は、000-000-0000（実在の県警の電話番号）です。」",
        advice: "番号は偽装されている可能性があります。",
        image: IMAGES.POLICE,
        choices: [
            { text: "そのまま電話を続ける", next: "step_video_offer", style: "btn-danger" },
            { text: "一旦電話を切って、折り返し電話をかける", next: "step_callback_trap", style: "btn-safe" }
        ]
    },
    step_callback_trap: {
        speaker: "電話の相手",
        text: "（教えられた番号にかけ直しました）<br>「はい、XX県警です。……あなたには詐欺容疑で逮捕状が出ています。こちらから行くことになりますが、それでもいいですか？」",
        advice: "騙されないで！犯人が教えた番号は、犯人の仲間に繋がります。",
        image: IMAGES.THREAT,
        choices: [
            { text: "無実を訴える", next: "step_video_offer", style: "btn-primary" },
            { text: "はい", next: "end_arrest_acceptance", style: "btn-safe" }
        ]
    },
    end_callback_check: {
        speaker: "解説",
        text: "良い判断です。<br>自分で調べた警察署の番号にかけて確認しましょう。",
        advice: "教えられた番号ではなく、電話帳や公式サイトの番号にかけてください。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    step_video_offer: {
        speaker: "自称・警察",
        text: "「すぐに逮捕状を見せますので、ビデオ通話をしましょう」",
        advice: "警察はビデオ通話で逮捕状を見せることはありません！",
        image: IMAGES.POLICE,
        choices: [
            { text: "ビデオ通話をする", next: "step_video_warrant", style: "btn-danger" },
            { text: "しない", next: "end_refuse_video", style: "btn-safe" }
        ]
    },
    end_refuse_video: {
        speaker: "解説",
        text: "賢明な判断です。<br>不審な要求には応じないのが一番です。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    step_video_warrant: {
        speaker: "自称・警察",
        text: "逮捕状を提示される<br>～逮捕状は自分の住所、氏名入り～",
        advice: "画像は偽造です！騙されないで！",
        image: IMAGES.WARRANT,
        choices: [
            { text: "一旦、振り込む", next: "end_transfer_scam", style: "btn-danger" },
            { text: "誰かに相談する", next: "step_claim_innocence", style: "btn-safe" }
        ]
    },
    step_admit_fear: {
        speaker: "解説",
        text: "相手のペースに乗せられています！<br>最終的に「保釈金が必要」「調査のためにお金を預かる」と言われます。",
        image: IMAGES.WARNING,
        choices: [
            { text: "お金を振り込む", next: "end_transfer_scam", style: "btn-danger" },
            { text: "誰かに相談する", next: "step_claim_innocence", style: "btn-safe" }
        ]
    },
    step_claim_innocence: {
        speaker: "自称・警察",
        text: "「守秘義務違反となり、あなたは逮捕されます。」",
        advice: "警察がSNSで連絡したり、電話で逮捕を脅すことはありません。",
        image: IMAGES.POLICE,
        choices: [
            { text: "一旦、振り込む", next: "end_transfer_scam", style: "btn-danger" },
            { text: "それでも誰かに相談する", next: "end_consult_success", style: "btn-safe" }
        ]
    },
    end_consult_success: {
        speaker: "解説",
        text: "警察へ通報！<br>だまされたフリ作戦に協力しましょう！",
        advice: "家族や警察（#9110）に相談したあなたの勝利です。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "super_safe"
    },
    end_arrest_acceptance: {
        speaker: "解説",
        text: "正解です！<br>警察へ通報！<br>だまされたフリ作戦に協力しましょう！",
        advice: "本物の警察は電話でお金を要求したり、逮捕状を理由に脅したりしません。あなたの判断は正しかったです。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "super_safe"
    }
};

const messageEl = document.getElementById('message-text');
const speakerEl = document.getElementById('speaker-name');
const sceneImg = document.getElementById('scene-image');
const choicesContainer = document.getElementById('choices-container');
const adviceBox = document.getElementById('advice-box');
const resetBtn = document.getElementById('reset-btn');
const backBtn = document.getElementById('back-btn');

let historyStack = [];

function startGame() {
    historyStack = []; // Reset history
    renderNode('start');
    resetBtn.classList.remove('hidden');
}

function resetGame() {
    historyStack = [];
    renderNode('start');
}

function goBack() {
    if (historyStack.length > 0) {
        const previousNode = historyStack.pop();
        // Since renderNode adds to history by default, we need to pass a flag or handle it
        // Actually, renderNode pushes the *current* node being rendered.
        // When we go back, we want to render 'previousNode' but NOT push it again as a duplicate/new entry, 
        // OR we just reset the stack state.

        // Simpler approach: 
        // historyStack contains [step1, step2, step3]. Current is step3.
        // Back means render step2. stack becomes [step1].

        // Wait, renderNode takes an ID. 
        // Let's change renderNode to push to history BEFORE changing.
        // No, standard stack: Push 'current' before moving to 'next'.

        renderNode(previousNode, false);
    }
}

function renderNode(nodeId, pushToHistory = true) {
    // If pushing to history, save the CURRENT node id before we overwrite the view?
    // No, usually history tracks where you CAME FROM.
    // If I am at Start, history is empty.
    // I click choice -> Next is CheckNumber. History should now have Start.

    // BUT we need to know what 'Start' was to render it again.
    // So:
    // 1. Current view is Node A.
    // 2. User clicks Node B.
    // 3. renderNode(Node B) called.
    // 4. push Node A to history? 
    // We don't track 'current node' explicitly in a var, but we can if we want.
    // Or we just push the nodeId passed to renderNode (State based).

    // Let's refine: History should contain the sequence of IDs visited.
    // Start -> history=[]. Render Start.
    // Go Next -> history=['start']. Render Next.
    // Go Next -> history=['start', 'next']. Render...

    // So when calling renderNode(next), we push the *previous* one?  
    // Easier: We need to know what the "current" one was before switching.
    // Let's introduce a `currentNodeId` variable.
}

// Redefining functions for clarity
let currentNodeId = null;

function startGame() {
    historyStack = [];
    currentNodeId = null;
    renderNode('start');
    resetBtn.classList.remove('hidden');
}

function resetGame() {
    startGame();
}

function goBack() {
    if (historyStack.length > 0) {
        const prev = historyStack.pop();
        renderNode(prev, false);
    }
}

function renderNode(nodeId, pushToHistory = true) {
    const node = flowData[nodeId];
    if (!node) return;

    // Handle History
    if (pushToHistory && currentNodeId) {
        historyStack.push(currentNodeId);
    }

    currentNodeId = nodeId;

    // Update Back Button visibility
    if (historyStack.length > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    // Update Text
    messageEl.innerHTML = node.text;
    speakerEl.textContent = node.speaker || "状況";

    // Update Image
    if (node.image) {
        sceneImg.src = node.image;
    }

    // Update Advice - Hidden
    adviceBox.classList.add('hidden');

    // Clear previous choices
    choicesContainer.innerHTML = '';

    if (node.isEnd) {
        // Show End State
        const endBtn = document.createElement('button');
        endBtn.className = 'btn btn-primary';
        endBtn.innerHTML = '最初に戻る';
        endBtn.setAttribute('data-label', '↻');
        endBtn.onclick = resetGame;
        choicesContainer.appendChild(endBtn);
    } else {
        // Render Choices
        const labels = ['A', 'B', 'C'];
        node.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = `btn ${choice.style || 'btn-primary'}`;
            btn.innerHTML = choice.text;
            btn.setAttribute('data-label', labels[index] || '');
            btn.onclick = () => renderNode(choice.next);
            choicesContainer.appendChild(btn);
        });
    }
}

// Initialize
startGame();
