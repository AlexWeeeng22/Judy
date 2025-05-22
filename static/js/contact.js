document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (!form) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // 阻止默认跳转
  
      const formData = new FormData(form);
      
      fetch("/sendEmail", {
        method: "POST",
        body: formData
      })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          // ❌ 非 2xx 状态码（如 500），弹失败
          alert(data.message || "发送失败");
        } else {
          // ✅ 成功
          alert(data.message);
          form.reset();
        }
      })
      .catch(err => {
        alert("❌ 网络错误或服务器未响应");
        console.error(err);
      });
    });
  });




