// main.js

// 모든 섹션 카드
const cards = document.querySelectorAll('.section-card');
// 네비게이션 링크
const navLinks = document.querySelectorAll('.nav-menu a');

// key → id 매핑 헬퍼 (지금은 1:1 매핑)
function resolveId(key) {
  return key;
}

// 섹션 열기
function openSection(key) {
  // 1) 모든 섹션 숨기기
  document.querySelectorAll('.container.section')
    .forEach(sec => sec.classList.add('hidden'));

  // 2) 선택된 섹션 보이기
  const id = resolveId(key);
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
}

// 카드 클릭 처리
cards.forEach(card => {
  card.addEventListener('click', () => {
    openSection(card.dataset.target);
  });
});

// 네비게이션 클릭 처리
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();                                   // 기본 앵커 이동 막기
    const key = link.getAttribute('href').slice(1);       // "#facilities" → "facilities"
    openSection(key);
    // 스크롤 애니메이션 (0.35초 뒤에)
    setTimeout(() => {
      const id = resolveId(key);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  });
});

// 페이지 로드 시 # 해시가 있으면 해당 섹션 열기
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.slice(1);
  if (hash && document.getElementById(resolveId(hash))) {
    openSection(hash);
  }
});


// main.js

// (1) DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
    const cards    = document.querySelectorAll(".section-card");
    const sections = document.querySelectorAll(".container.section");
  
    // helper: id 그대로 가져오기
    const openSection = key => {
      sections.forEach(sec => {
        sec.classList.toggle("hidden", sec.id !== key);
      });
    };
  
    // (2) 카드 클릭 → 해당 섹션 열고 → 스크롤
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const targetId = card.dataset.target;      // e.g. "facilities"
        const section  = document.getElementById(targetId);
        if (!section) return;
  
        // 1) 섹션 열기
        openSection(targetId);
  
        // 2) 조금 딜레이 준 뒤 스크롤 (section이 보이도록)
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      });
    });
  });
  