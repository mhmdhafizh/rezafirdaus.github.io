// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== SMOOTH SCROLL TO SECTION =====
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== DOWNLOAD CV =====
function downloadCV() {
    // Create a simple CV text file
    const cvContent = `
REZA FIRDAUS
Kontak: +62 882 9057 3524 | rezanihh9@gmail.com | Kota Serang

==================================================
PROFIL
==================================================
Reza Firdaus adalah pribadi yang teliti dan berdedikasi, didukung oleh pengalaman 
di lingkungan kerja dan organisasi. Memiliki etika kerja yang ulet, rajin, dan 
tekun, serta bertanggung jawab terhadap pekerjaan. Mampu bekerja dengan baik 
dalam lingkungan organisasi maupun tim, serta percaya diri dapat dipercaya dalam 
setiap kesempatan yang diberikan.

==================================================
PENDIDIKAN
==================================================
MA NEGERI 1 SERANG (2020-2023)
Jurusan IPA
Kota Serang, Banten

==================================================
PENGALAMAN KERJA
==================================================

PT. KOMPONEN FUTARA NUSAPERSADA
Bagian Warehouse (2023-2024)
- Melakukan pengecekan komponen barang dengan teliti
- Melakukan AUDIT komponen setiap 1 bulan sekali
- Memastikan keakuratan data dan dokumentasi warehouse

PASKIBRA - MA Negeri 1 Serang
Anggota & Ketua Paskibra (2021-2023)
- Menjadi ketua paskibra pada tahun 2022-2023
- Menjadi peserta upacara peringatan hari kemerdekaan 17 Agustus 2022
- Menjadi pelatih UKS (Usaha Kesehatan Sekolah) di sekolah menengah pertama

PELATIHAN BBPVP SERANG
Pelatihan WELDER (2023)
- Pelatihan WELDER SMAW 3G UP-PF
- Menguasai teknik pengelasan sesuai standar industri
- Sertifikasi profesional keahlian las

==================================================
KEAHLIAN & KOMPETENSI
==================================================
✓ Analisis Pekerjaan
✓ Kerja Tim (Memimpin dan Individu)
✓ 5S & Keselamatan Kerja
✓ Tanggung Jawab & Kepercayaan
✓ Etos Kerja Tinggi
✓ Pembelajaran Cepat & Adaptasi

==================================================
DIBUAT: 2024
==================================================
Portfolio: Reza Firdaus Portfolio Website
`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cvContent));
    element.setAttribute('download', 'CV_REZA_FIRDAUS.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('CV berhasil diunduh!', 'success');
}

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const data = {
            nama: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subjek: contactForm.querySelectorAll('input[type="text"]')[1]?.value || '',
            pesan: contactForm.querySelector('textarea').value
        };

        // Validate form
        if (!data.nama || !data.email || !data.pesan) {
            showNotification('Mohon isi semua field yang wajib!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Email tidak valid!', 'error');
            return;
        }

        // Simulate sending (in real implementation, send to backend)
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success message
            showNotification('Pesan berhasil dikirim! Terima kasih telah menghubungi.', 'success');
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Log the data (in real implementation, send to server)
            console.log('Form Data:', data);
        }, 1500);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles if not in CSS
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ADD ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and timeline items
document.querySelectorAll('.skill-card, .timeline-content, .info-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ===== SCROLL ANIMATIONS FOR ELEMENTS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .skill-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== TYPING ANIMATION FOR HERO TITLE =====
function typeAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    // Reset after animation
    setTimeout(type, 300);
}

window.addEventListener('load', typeAnimation);

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent.trim();
        const isNumber = !isNaN(parseInt(text));
        
        if (isNumber) {
            const finalNumber = parseInt(text);
            let currentNumber = 0;
            const increment = Math.ceil(finalNumber / 50);
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    stat.textContent = text;
                    clearInterval(counter);
                } else {
                    stat.textContent = currentNumber + '+';
                }
            }, 30);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// ===== SMOOTH SCROLL SUPPORT =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== DYNAMIC YEAR IN FOOTER =====
const yearSpan = document.querySelector('.footer p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
}

// ===== PARALLAX EFFECT (Optional) =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrollPosition < 500) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroContent.style.opacity = 1 - scrollPosition / 1000;
    }
});

// ===== INITIAL SETUP =====
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    updateActiveLink();
    animateOnScroll();
    
    // Log initialization
    console.log('Portfolio website loaded successfully!');
});

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.scrollToSection = scrollToSection;
window.downloadCV = downloadCV;