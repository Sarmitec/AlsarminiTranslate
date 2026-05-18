document.getElementById('translateBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const targetLang = document.getElementById('targetLang').value;

    if (!inputText.trim()) {
        alert('Please enter text to translate');
        return;
    }

    // Show loading state
    const btn = this;
    const originalText = btn.textContent;
    btn.textContent = 'Translating...';
    btn.disabled = true;

    // Try the LibreTranslate API from libregalaxy
    const apiUrl = 'https://translate.libregalaxy.org/translate';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: inputText,
            source: 'auto',
            target: targetLang,
            format: 'text'
        })
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`);
            });
        }
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            return response.text().then(text => {
                throw new Error(`Expected JSON but got ${contentType}: ${text.substring(0, 100)}`);
            });
        }
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        if (!data.translatedText) {
            throw new Error('No translation received');
        }
        document.getElementById('outputText').value = data.translatedText;
    })
    .catch(error => {
        console.error('Translation error:', error);
        alert('Translation failed: ' + error.message);
    })
    .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    });
});