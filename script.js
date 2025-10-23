// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// Navbar background
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.style.backgroundColor = window.scrollY > 100 ? 'rgba(255, 255, 255, 0.95)' : '#fff';
});

// Formspree
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Gönderiliyor...';
    submitButton.disabled = true;

    try {
        const formData = new FormData(this);
        const response = await fetch(this.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
        if (response.ok) {
            alert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
            this.reset();
        } else throw new Error('Form gönderilemedi');
    } catch {
        alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin veya telefonla ulaşın.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
