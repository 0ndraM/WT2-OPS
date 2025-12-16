document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const toggleButton = document.getElementById('toggleCollection');

    let currentCollectionId = 'collection1';

    // Toggle collection visibility
    function toggleCollections() {
        const currentCollection = document.getElementById(currentCollectionId);
        currentCollection.classList.remove('active');
        
        const newCollection = 
            currentCollectionId === 'collection1' ? 
            'collection2' : 'collection1';
            
        document.getElementById(newCollection).classList.add('active');
        currentCollectionId = newCollection;
    }

    toggleButton.addEventListener('click', toggleCollections);

    // Normalization function
    const normalize = str => 
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    // Search functionality
    searchInput.addEventListener('input', () => {
        const q = normalize(searchInput.value.trim());
        
        // Get current active collection container
        const activeCollection = document.querySelector(
            `.collections .collection.active`
        );

        // Filter all sections within active collection
        [...activeCollection.querySelectorAll('section')].forEach(sec => {
            const text = normalize(sec.textContent);
            
            if (!q) {
                sec.classList.remove('hidden');
            } else {
                sec.classList.toggle('hidden', !text.includes(q));
            }
        });
    });
});