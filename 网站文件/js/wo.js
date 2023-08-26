window.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll("p");

    // 淡入效果
    setTimeout(function() {
        paragraphs.forEach(function(p) {
            p.classList.add("fade-in");
        });
    }, 500);

    // 鼠标悬停效果
    paragraphs.forEach(function(p) {
        p.addEventListener("mouseover", function() {
            this.style.color = "red";
        });

        p.addEventListener("mouseout", function() {
            this.style.color = "#666";
        });
    });
});
