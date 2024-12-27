import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAGLavPX9JEbTXPFn1Mb5-GR7CP5s8zvPk",
    authDomain: "sparta-8a3f8.firebaseapp.com",
    projectId: "sparta-8a3f8",
    storageBucket: "sparta-8a3f8.firebasestorage.app",
    messagingSenderId: "802229582034",
    appId: "1:802229582034:web:18e0b25b531e37085f950b",
    measurementId: "G-GP94P2EY1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 카드 저장
document.querySelector('#joinbtn').addEventListener('click', async (e) => {
    let image = $('#image').val();
    let name = $('#name').val();
    let blog = $('#blog').val();
    let github = $('#github').val();
    let scontent = $('#scontent').val();
    let bcontent = $('#bcontent').val();
    let mbti = $('#mbti').val();

    let doc = {  // firebase 데이터 값 저장
        'image': image,
        'name': name,
        'blog': blog,
        'github': github,
        'scontent': scontent,
        'bcontent': bcontent,
        'mbti': mbti,
        'timestamp': new Date()  // 현재 시간 추가
    };

    await addDoc(collection(db, "memcard"), doc);
    alert('저장 완료!');
    window.location.reload();
});

let idxarr = [];
let idx = 1;

// Firestore에서 시간순으로 데이터 읽기
const q = query(collection(db, "memcard"), orderBy("timestamp"));  // timestamp 기준으로 정렬
const querySnapshot = await getDocs(q);

if (!querySnapshot.empty) {
    // 데이터를 받아와서 카드 HTML 생성
    querySnapshot.forEach((doc) => {
        let row = doc.data();
        let image = row['image'];
        let name = row['name'];
        let blog = row['blog'];
        let github = row['github'];
        let scontent = row['scontent'];
        let bcontent = row['bcontent'];
        let mbti = row['mbti'];

        let temp_html = `            
        <div class="card" id='memberCard${idx}' data-index='${idx}'>
        <div class="" id='checknum${idx}' data-turn='${idx}'>
        <img src="${image}" type="button" alt="${name}">
        <p>${name} [${mbti}]</p>
        <p><label><input type="text" name="eq1" value="${scontent}"></label></p>
        <p>${blog}, ${github}</p>
        <p><button id='ex'>확장</button></p>
        <p>${bcontent}</p>
        </div>
        </div>`;

        // 새 카드 HTML을 DOM에 추가
        const cardSlot = document.getElementById('cardSlot');
        cardSlot.insertAdjacentHTML('beforeend', temp_html);

        const cn = document.getElementById(`checknum${idx}`);
        const dataTurn = cn.getAttribute('data-turn');

        if (dataTurn % 2 === 0) {
            cn.classList.add('even');
        } else {
            cn.classList.add('odd');
        }

        idx++;

    });
} else {
    alert("멤버카드를 추가해주세요.");
}

// 카드 요소들을 모두 선택
const cards = document.querySelectorAll('.card');

// 각 카드에 대해 클릭 이벤트 처리
cards.forEach((card) => {
    const cardId = card.getAttribute('data-index');
    let cardState = localStorage.getItem(cardId);

    const openCard = () => {
        card.classList.add('opened');
        localStorage.setItem(cardId, 'active');  // 상태를 active로 저장
    };
    
    const closeCard = () => {
        card.classList.remove('opened');
        localStorage.setItem(cardId, null);  // 상태를 null로 저장
    };

    // 페이지 로드 시 기존 상태가 있으면 그에 맞는 클래스 추가
    if (cardState === 'active') {
        openCard();
    }

    // 카드 클릭 시 상태를 변경
    card.addEventListener('click', () => {
        cardState = localStorage.getItem(cardId);  // 상태를 새로 가져옴
        cardState !== 'active' ? openCard() : closeCard();
        
    });
});
