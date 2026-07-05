// Filtros de Produtos
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            productCards.forEach(card => {
                if (category === 'TODOS' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
}

// Form Submission
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        email: formData.get('email'),
        projeto: formData.get('projeto'),
        mensagem: formData.get('mensagem')
    };
    
    if (!data.nome || !data.telefone || !data.email || !data.projeto || !data.mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    alert('Obrigado pelo seu interesse! Entraremos em contato em até 24 horas úteis.');
    event.target.reset();
}

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            if (header && !header.classList.contains('shadow-lg')) header.classList.add('shadow-lg');
        } else {
            if (header) header.classList.remove('shadow-lg');
        }
    });
});

// Close Mobile Menu
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('button[onclick="toggleMenu()"]');
    
    if (mobileMenu && menuButton && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// ====== CALCULADORA - TOTALMENTE FUNCIONAL ======

function addProductToCalculator(productName) {
    const productSelect = document.getElementById('productSelect');
    if (productSelect) {
        productSelect.value = productName;
        calculateBudget();
        const calcSection = document.getElementById('calculadora');
        if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateProductPrice() {
    const selectValue = document.getElementById('productSelect').value;
    if (selectValue) {
        calculateBudget();
    }
}

function calculateBudget() {
    // Elementos
    const productSelect = document.getElementById('productSelect');
    const areaInput = document.getElementById('areaInput');
    const finishSelect = document.getElementById('finishSelect');
    const freightInput = document.getElementById('freightInput');
    
    // Elementos de resumo
    const summaryProduct = document.getElementById('summaryProduct');
    const summaryArea = document.getElementById('summaryArea');
    const summaryFinish = document.getElementById('summaryFinish');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryFreight = document.getElementById('summaryFreight');
    const summaryTotal = document.getElementById('summaryTotal');
    
    // Validação de elementos
    if (!productSelect || !areaInput || !finishSelect || !freightInput ||
        !summaryProduct || !summaryArea || !summaryFinish ||
        !summarySubtotal || !summaryFreight || !summaryTotal) {
        return;
    }
    
    // Valores
    const productValue = productSelect.value;
    const area = parseFloat(areaInput.value) || 0;
    const finishMultiplier = parseFloat(finishSelect.value) || 1;
    const freight = parseFloat(freightInput.value) || 0;
    
    // Reset se vazio
    if (!productValue || area <= 0) {
        summaryProduct.textContent = '-';
        summaryArea.textContent = '-';
        summaryFinish.textContent = '-';
        summarySubtotal.textContent = 'R$ 0,00';
        summaryFreight.textContent = 'R$ 0,00';
        summaryTotal.textContent = 'R$ 0,00';
        return;
    }
    
    const productName = productValue;
    const priceInputEl = document.getElementById('priceInput');
    const unitPrice = parseFloat(priceInputEl ? priceInputEl.value : 0) || 0;
    const finishName = finishSelect.options[finishSelect.selectedIndex].text;
    
    // Cálculos
    const subtotal = area * unitPrice * finishMultiplier;
    const total = subtotal + freight;
    
    // Atualizar resumo
    summaryProduct.textContent = productName;
    summaryArea.textContent = area.toFixed(2) + ' m²';
    summaryFinish.textContent = finishName;
    summarySubtotal.textContent = 'R$ ' + subtotal.toFixed(2);
    summaryFreight.textContent = 'R$ ' + freight.toFixed(2);
    summaryTotal.textContent = 'R$ ' + total.toFixed(2);
}

function generateBudgetPDF() {
    const productSelect = document.getElementById('productSelect');
    const areaInput = document.getElementById('areaInput');
    const finishSelect = document.getElementById('finishSelect');
    const freightInput = document.getElementById('freightInput');
    
    if (!productSelect || !areaInput || !finishSelect || !freightInput) {
        alert('Calculadora não carregada corretamente!');
        return;
    }
    
    const area = parseFloat(areaInput.value) || 0;
    const finishMultiplier = parseFloat(finishSelect.value) || 1;
    const freight = parseFloat(freightInput.value) || 0;
    const productValue = productSelect.value;
    
    if (!productValue || area <= 0) {
        alert('Por favor, selecione um produto e informe a metragem.');
        return;
    }
    
    const productName = productValue;
    const priceInputEl = document.getElementById('priceInput');
    const unitPrice = parseFloat(priceInputEl ? priceInputEl.value : 0) || 0;

    if (unitPrice <= 0) {
        alert('Por favor, informe o preço/m² antes de gerar o orçamento.');
        return;
    }

    const subtotal = area * unitPrice * finishMultiplier;
    const total = subtotal + freight;
    const finishName = finishSelect.options[finishSelect.selectedIndex].text;
    
    const budgetText = `ORÇAMENTO - GRAN COMÉRCIO
========================================
Data: ${new Date().toLocaleDateString('pt-BR')}

PRODUTO: ${productName}
Metragem: ${area.toFixed(2)} m²
Preço Unitário: R$ ${unitPrice.toFixed(2)}/m²
Acabamento: ${finishName}
Multiplicador: ${finishMultiplier}x

Cálculo:
${area.toFixed(2)} m² × R$ ${unitPrice.toFixed(2)} × ${finishMultiplier} = R$ ${subtotal.toFixed(2)}

Subtotal: R$ ${subtotal.toFixed(2)}
Frete: R$ ${freight.toFixed(2)}

TOTAL: R$ ${total.toFixed(2)}

========================================
Contato: (61) 98234-5620 / (61) 98214-1529
Email: contato@grancomercio.com.br
Endereço: SAAN Quadra 3, Lote 1270, Brasília - DF
========================================
`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(budgetText));
    element.setAttribute('download', `orcamento-gran-comercio-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert('Orçamento gerado com sucesso!');
}

// Fade in animation
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out;
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

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.grid > div, .space-y-6 > div');
    animateElements.forEach(el => observer.observe(el));
});