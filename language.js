// Language selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const inputText = document.getElementById('inputText');
    const translateBtn = document.getElementById('translateBtn');
    const outputText = document.getElementById('outputText');
    
    // UI translations
    const translations = {
        en: {
            inputPlaceholder: 'Enter text to translate here',
            buttonText: 'Translate',
            outputPlaceholder: 'Translation will appear here'
        },
        es: {
            inputPlaceholder: 'Ingrese el texto para traducir aquí',
            buttonText: 'Traducir',
            outputPlaceholder: 'La traducción aparecerá aquí'
        },
        fr: {
            inputPlaceholder: 'Entrez le texte à traduire ici',
            buttonText: 'Traduire',
            outputPlaceholder: 'La traduction apparaîtra ici'
        },
        de: {
            inputPlaceholder: 'Geben Sie den Text zum Übersetzen ein',
            buttonText: 'Übersetzen',
            outputPlaceholder: 'Die Übersetzung erscheint hier'
        },
        it: {
            inputPlaceholder: 'Inserisci il testo da tradurre qui',
            buttonText: 'Traduci',
            outputPlaceholder: 'La traduzione apparirà qui'
        },
        pt: {
            inputPlaceholder: 'Insira o texto para traduzir aqui',
            buttonText: 'Traduzir',
            outputPlaceholder: 'A tradução aparecerá aqui'
        },
        ar: {
            inputPlaceholder: 'أدخل النص للترجمة هنا',
            buttonText: 'ترجمة',
            outputPlaceholder: 'ستظهر الترجمة هنا'
        },
        ru: {
            inputPlaceholder: 'Введите текст для перевода здесь',
            buttonText: 'Перевести',
            outputPlaceholder: 'Перевод появится здесь'
        },
        zh: {
            inputPlaceholder: '在此输入要翻译的文本',
            buttonText: '翻译',
            outputPlaceholder: '翻译结果将显示在这里'
        },
        ja: {
            inputPlaceholder: 'ここに翻訳するテキストを入力してください',
            buttonText: '翻訳',
            outputPlaceholder: 'ここに翻訳結果が表示されます'
        }
    };
    
    // Set initial language from localStorage or browser language
    function initLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage') || 
                         (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase();
        setLanguage(savedLang);
    }
    
    // Set language and update UI
    function setLanguage(lang) {
        // Validate language
        if (!(lang in translations)) {
            lang = 'en'; // fallback to English
        }
        
        // Save to localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // Get translations for selected language
        const uiText = translations[lang];
        
        // Update UI elements
        inputText.placeholder = uiText.inputPlaceholder;
        translateBtn.textContent = uiText.buttonText;
        outputText.placeholder = uiText.outputPlaceholder;
        
        // Update button text to show current language
        langBtn.textContent = getLanguageFlag(lang);
    }
    
    // Get flag emoji for language
    function getLanguageFlag(lang) {
        const flags = {
            en: '🇺🇸',
            es: '🇪🇸',
            fr: '🇫🇷',
            de: '🇩🇪',
            it: '🇮🇹',
            pt: '🇵🇹',
            ar: '🇸🇦',
            ru: '🇷🇺',
            zh: '🇨🇳',
            ja: '🇯🇵'
        };
        return flags[lang] || '🌐';
    }
    
    // Toggle dropdown visibility
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        langDropdown.classList.toggle('show');
    });
    
    // Handle language selection from dropdown
    langDropdown.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
            langDropdown.classList.remove('show');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('show');
        }
    });
    
    // Initialize language on page load
    initLanguage();
});