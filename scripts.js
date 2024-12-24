import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const menu = [
    { name: '아메리카노', price: 4100, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[94]_20210430103337006.jpg' },
    { name: '카페라떼', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[41]_20210415133833725.jpg' },
    { name: '카푸치노', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[38]_20210415154821846.jpg' },
    { name: '카라멜 마끼아또', price: 5800, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[126197]_20210415154609863.jpg' },
    { name: '자바 칩 프라푸치노', price: 6300, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168016]_20210415154152122.jpg' },
    { name: '딸기 요거트 블렌디드', price: 6300, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003276]_20210416154001403.jpg' }
];



menu.forEach((item, idx) => {
    let temp = `<div class="drinks">
        <img src="${item.image}"
            alt="${item.name}">
        <p class="name">${item.name}</p>
        <p class="price">₩${item.price}</p>
        <button data-index='${idx}'>+</button>
        </div>`

    menuContainer.innerHTML += temp;
    idx++;
});