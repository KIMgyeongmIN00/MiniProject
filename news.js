// 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// API 키와 기본 URL 설정
const apiKey = '240d7a5da123430cad5ba6d2b09fd571';  // API 키
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // CORS 우회 서비스
const urlTemplate = (keyword) => `${proxyUrl}https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&pageSize=5&apiKey=${apiKey}`;  // 날짜 기준 없이 최근 뉴스 검색

// 뉴스 데이터를 HTML로 생성하는 함수
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';  // 기존 뉴스 삭제

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }

    // 뉴스 항목을 HTML로 생성
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h2');
        title.textContent = article.title || '제목 없음';  // 제목이 없으면 '제목 없음'으로 표시

        const description = document.createElement('p');
        description.textContent = article.description || '설명이 없습니다.';  // 설명이 없으면 기본 메시지 표시

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = '자세히 보기';

        // 생성한 요소들을 뉴스 항목에 추가
        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(link);

        // 뉴스 항목을 컨테이너에 추가
        newsContainer.appendChild(newsItem);
    });
}

// 검색 요청 실행 함수
function searchNews() {
    const keyword = document.getElementById('searchKeyword').value.trim();  // 입력된 키워드 가져오기

    if (!keyword) {
        alert('검색어를 입력하세요');
        return;
    }

    const url = urlTemplate(keyword);  // 입력한 키워드를 사용하여 URL 생성

    // 뉴스 API 호출
    fetch(url)
        .then(response => response.json())  // 응답을 JSON 형식으로 변환
        .then(data => {
            const articles = data.articles;

            if (articles.length === 0) {
                alert('검색 결과가 없습니다. 다른 키워드를 시도해 보세요.');
            }

            // 헤드라인 업데이트
            const headlineElement = document.getElementById('headline');
            headlineElement.textContent = `${keyword}에 대한 최신 뉴스`;

            displayNews(articles);  // 뉴스 항목을 HTML로 생성하여 표시
        })
        .catch(error => {
            alert('뉴스를 가져오는 데 실패했습니다');
        });
}

// 검색 버튼 클릭 시 실행되는 함수
document.getElementById('searchButton').addEventListener('click', searchNews);

// 입력창에서 Enter 키 눌렀을 때도 검색이 되게 하는 이벤트 리스너
document.getElementById('searchKeyword').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchNews();  // Enter 키로 검색
    }
});
