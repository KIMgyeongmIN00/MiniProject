import { updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";   // updateDoc 모듈 추가
import { deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";   // deleteDoc 모듈 추가
import { doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";         // doc 모듈 추가

let temp_html = `            
            <div class="introWrapping" id="card-${docId}">
                <p class="introImg">
                    <img src="${image}" alt="내 사진">
                </p>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control URL" data-field="image" data-id="${docId}" placeholder="사진" style="display:none">${image}</p>
                    <label for="Image">사진</label>
                </div>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control" data-field="name" data-id="${docId}" placeholder="이름">${name}</p>
                    <label for="Name">이름</label>
                </div>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control" data-field="mbti" data-id="${docId}" placeholder="MBTI">${mbti}</p>
                    <label for="modMbti">MBTI</label>
                </div>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control" data-field="scontent" data-id="${docId}" placeholder="간단 소개">${scontent}</p>
                    <label for="modScon">간단 소개</label>
                </div>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control" data-field="bcontent" data-id="${docId}" placeholder="자기 소개">${bcontent}</p>
                    <label for="modBcon">자기 소개</label>
                </div>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control" data-field="blog" data-id="${docId}" placeholder="블로그 주소">${blog}</p>
                    <label for="modBlog">블로그 주소</label>
                </div>
                <div class="form-floating mb-3">
                    <p contenteditable="false" class="editable form-control" data-field="github" data-id="${docId}" placeholder="git 주소">${github}</p>
                    <label for="modGithub">git 주소</label>
                </div>
                <button class="btn btn-sm btn-warning editbtn" data-id="${docId}" placeholder="사진">수정</button>
                <button class="btn btn-sm btn-success savebtn" data-id="${docId}" style="display:none;" placeholder="사진">수정완료</button>
                <button class="btn btn-sm btn-danger deletebtn" data-id="${docId}" placeholder="사진">삭제</button>
            </div>`;
            
$('#membercard').append(temp_html);
    // div에 id="card-${docId}" 추가
    // 이미지 클래스에 URL 는 디스플레이를 바꾸는 기능
    // contenteditable 은 내용을 수정 할 수 있는 기능 true 면 수정이 가능하고 false는 수정 불가
    // 클래스에 editable 추가
    // data-field 추가
    // data-id="${docId}" 추가
    // 수정버튼 추가 - editbtn
    // 완료버튼 추가 - savebtn, stlye='display:none'
    // 삭제버튼 추가 - deletebtn

// 수정 버튼 이벤트 리스너
document.querySelectorAll('.editbtn').forEach((edit) => {   // editbtn 클래스를 가진 모든 버튼 (수정 버튼) 호출
    edit.addEventListener('click', (event) => {   // 클릭 이벤트 추가
        let docId = event.target.dataset.id;   // 클릭된 editbtn의 파이어베이스 memcard(docId)를 가져옴
        let card = document.querySelector(`#card-${docId}`);   // 해당된 card 아이디의 temp_html 호출
        let editableFields = card.querySelectorAll('.editable');   // temp_html 안에 모든 editable 클래스 호출

        editableFields.forEach((field) => {
            field.setAttribute('contenteditable', 'true');   // contenteditable == true 면 요소를 편집 가능하게 함
        });

        card.querySelector('.URL').style.display = 'block'   // image 주소가 적혀있는 박스를 block
        card.querySelector('.editbtn').style.display = 'none';   // 수정 버튼 숨김
        card.querySelector('.savebtn').style.display = 'inline-block';   // 완료 버튼 보이기
    });
});

// 완료 버튼 이벤트 리스너
document.querySelectorAll('.savebtn').forEach((save) => {   // savebtn 클래스를 가진 모든 버튼 (완료 버튼) 호출
    save.addEventListener('click', async (event) => {   // 클릭 이벤트 추가
        let docId = event.target.dataset.id;   // 클릭된 savebtn의 파이어베이스 memcard(docId)를 가져옴
        let card = document.querySelector(`#card-${docId}`);   // 해당된 card 아이디의 temp_html 호출
        let editableFields = card.querySelectorAll('.editable');   // temp_html 안에 모든 editable 요소 호출

        let editableImg = card.querySelector('.introImg img');   // 이미지 요소 호출
        let editableImgField = card.querySelector('.URL');   // URL 주소 호출

        let updates = {};   // 파이어베이스에 업데이트 될 데이터를 저장할 객체

        editableFields.forEach((field) => {
            let fieldName = field.dataset.field;   // 데이터 이름 (image, name ,mbti, scontent, bcontent, blog, github)
            let fieldValue = field.textContent.trim();   // 데이터 안에 들어갈 내용
            updates[fieldName] = fieldValue;   // 데이터를 객체에 저장
            if (fieldName === 'image') {
                editableImg.src = fieldValue;   // 이미지 주소 src에 넣기
            }
        });

        await updateDoc(doc(db, "memcard", docId), updates);   // 파이어베이스 memcard에 데이터 업데이트

        editableFields.forEach((field) => {
            field.setAttribute('contenteditable', 'false');   // false 로 수정 비활성화
        });

        card.querySelector('.URL').style.display = 'none'   // image 주소가 적혀있는 필드를 숨김
        card.querySelector('.savebtn').style.display = 'none';   // 완료 버튼 숨김
        card.querySelector('.editbtn').style.display = 'inline-block';   // 수정 버튼 보이기

        alert('수정이 완료되었습니다!');
    });
});

// 삭제 버튼 리벤트 리스너
document.querySelectorAll('.deletebtn').forEach((del) => {
    del.addEventListener('click', async (event) => {
        let docId = event.target.dataset.id;   // 클릭된 deletebtn의 파이어베이스 memcard(docId)를 가져옴

        if (confirm('정말 삭제하시겠습니까?')) {   // 확인 창을 열고 확인을 받으면
            await deleteDoc(doc(db, "memcard", docId));   // 파이어베이스내의 해당 memcard 문서 삭제
            alert('삭제가 완료되었습니다!');   // 삭제 완료 경고창 표시
            window.location.reload();   // 페이지 새로고침
        }
    });
});

