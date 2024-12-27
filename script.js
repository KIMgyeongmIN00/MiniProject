import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyBWHM8tknDZdOo-SDfCSh1qwjv7hmvqHBg",
    authDomain: "konuko-1c179.firebaseapp.com",
    projectId: "konuko-1c179",
    storageBucket: "konuko-1c179.firebasestorage.app",
    messagingSenderId: "133150593908",
    appId: "1:133150593908:web:3cb57b3fc07c9611e65221",
    measurementId: "G-PGDVBW5HFX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const btn = document.getElementById('joinbtn')

btn.addEventListener(`click`, async add => {
    if (evn.target.tagName === `BUTTON`){
    let image = $('#image').val();
    let name = $('#name').val();
    let blog = $('#blog').val();
    let github = $('#github').val();
    let scontent = $('#scontent').val();
    let bcontent = $('#bcontent').val()
    let mbti = $('#mbti').val()

    let doc = {
        'image': image,
        'name': name,
        'blog': blog,
        'github': github,
        'scontent': scontent,
        'bcontent': bcontent,
        'mbti': mbti
    };
    await addDoc(collection(db, "memcard"), doc);
    alert('저장 완료!');
    window.location.reload();
}})




let docs = await getDocs(collection(db, "memcard"));
docs.forEach((doc) => {
    let row = doc.data();
    let image = row['image'];
    let name = row['name'];
    let blog = row['blog'];
    let github = row['github'];
    let scontent = row['scontent'];
    let bcontent = row['bcontent'];
    let mbti = row['mbti'];

    let temp_html = `            
<div class="introWrapping">
    <p class="introImg"><img src="${image}" alt="내 아바타 소개"></p>
    <p>${name} ,${mbti}</p>
    <p><label><input type="text" name="eq1" value="${scontent}"></label></p>
    <p>${blog}, ${github}</p>
    <p>${bcontent}</p>
</div>
`;
    $('#membercard').append(temp_html);

});