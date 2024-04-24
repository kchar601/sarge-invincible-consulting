const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const highResImage = new Image();
            highResImage.src = img.getAttribute('data-src');
            highResImage.onload = () => {
                img.src = highResImage.src;
                img.style.opacity = 1;
            };
            observer.unobserve(img);
        }
    });
}, { rootMargin: "50px 0px", threshold: 0.01 });

document.querySelectorAll('img.progressive-image').forEach(img => {
    observer.observe(img);
});
