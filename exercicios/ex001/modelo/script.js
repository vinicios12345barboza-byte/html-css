document.addEventListener('DOMContentLoaded', function() {
    
    /* --- 1. Menu Hamburger (Mobile) --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        // Exibe/Oculta o menu mobile
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });

        // Fecha o menu mobile ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    /* --- 2. Scroll Suave para Links Internos --- */
    // Aplica o scroll suave para todos os links internos comecem com '#'
    document.querySelectorAll('a.scroll-link, .main-nav a[href^="#"], .mobile-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- 3. Validação Básica de Formulário e Abertura em Nova Aba --- */
    const purchaseForm = document.getElementById('purchase-form');
    const formMessage = document.getElementById('form-message');

    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio tradicional (HTTP)

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            let isValid = true;

            // Limpa mensagens anteriores
            formMessage.textContent = '';
            formMessage.style.color = '';

            // Validação de Nome
            if (nameInput.value.trim() === '') {
                isValid = false;
                alert('Por favor, preencha seu nome.');
                nameInput.focus();
                return;
            }

            // Validação de Email (Regex Simples)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                isValid = false;
                alert('Por favor, insira um e-mail válido.');
                emailInput.focus();
                return;
            }

            if (isValid) {
                // Mensagem de sucesso para o usuário
                formMessage.textContent = 'Sucesso! Abrindo a página de pagamento...';
                formMessage.style.color = 'green';
                
                // --- ATUALIZAÇÃO CRUCIAL: LINK DE REDIRECIONAMENTO ---
                // *** SUBSTITUA ESTA URL PELO SEU LINK REAL DE CHECKOUT ***
                const paymentPageURL = 'https://shortsvirais.com.br/'; 

                // Define um pequeno atraso (2 segundos) para que o usuário veja a mensagem
                setTimeout(() => {
                    // COMANDO QUE ABRE A URL EM UMA NOVA ABA (_blank)
                    window.open(paymentPageURL, '_blank');
                    
                    // Limpa o formulário, mas o usuário permanece na Landing Page
                    purchaseForm.reset(); 
                }, 2000); 
            }
        });
    }
});