// Простая сортировка товаров
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.createElement('select');
    sortSelect.innerHTML = `
        <option value="default">По умолчанию</option>
        <option value="price-asc">Цена по возрастанию</option>
        <option value="price-desc">Цена по убыванию</option>
        <option value="name-asc">По названию (А-Я)</option>
        <option value="name-desc">По названию (Я-А)</option>
    `;
    
    // Находим контейнер товаров и вставляем сортировку
    const productsContainer = document.querySelector('.products');
    if (productsContainer) {
        productsContainer.parentNode.insertBefore(sortSelect, productsContainer);
        
        sortSelect.addEventListener('change', function() {
            const products = Array.from(productsContainer.querySelectorAll('.product'));
            
            products.sort(function(a, b) {
                switch(this.value) {
                    case 'price-asc':
                        return getPrice(a) - getPrice(b);
                    case 'price-desc':
                        return getPrice(b) - getPrice(a);
                    case 'name-asc':
                        return getText(a).localeCompare(getText(b));
                    case 'name-desc':
                        return getText(b).localeCompare(getText(a));
                    default:
                        return 0;
                }
            }.bind(this));
            
            products.forEach(product => productsContainer.appendChild(product));
        });
    }
    
    function getPrice(element) {
        const priceText = element.querySelector('.price')?.textContent || '0';
        return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
    }
    
    function getText(element) {
        return element.querySelector('.product-title')?.textContent || '';
    }
});