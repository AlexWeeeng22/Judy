document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 6;
    const items = Array.from(document.querySelectorAll(".published-news"));
    const pageButtons = Array.from(document.querySelectorAll(".page-btn"));
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    let currentPage = 1;
    const totalPages = pageButtons.length;
  
    function showPage(page) {
      currentPage = page;
  
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
  
      items.forEach((item, i) => {
        item.style.display = (i >= start && i < end) ? "block" : "none";
      });
  
      pageButtons.forEach((btn, i) => {
        btn.classList.toggle("w3-black", i === page - 1);
      });
  
      prevBtn.classList.toggle("w3-disabled", currentPage === 1);
      nextBtn.classList.toggle("w3-disabled", currentPage === totalPages);
    }
  
    // 初始化第一页
    showPage(1);
  
    // 页码按钮点击
    pageButtons.forEach((btn, i) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        showPage(i + 1);
      });
    });
  
    // 上一页
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
  
    // 下一页
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });
  });