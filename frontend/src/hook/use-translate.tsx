// src/hooks/useTranslation.js
import { useState, useEffect } from 'react';

export const useDynamicTranslation = (text: string, targetLanguage: string) => {
    const [translatedText, setTranslatedText] = useState(text);

    useEffect(() => {
        const translateText = async () => {
            try {
                // Note: Google Translate API requires an API key
                const response = await fetch(
                    `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            q: text,
                            target: targetLanguage,
                        }),
                    }
                );

                const data = await response.json();
                setTranslatedText(data.data.translations[0].translatedText);
            } catch (error) {
                console.error('Translation error:', error);
                setTranslatedText(text); // Fallback to original text
            }
        };

        if (text && targetLanguage !== 'en') {
            translateText();
        } else {
            setTranslatedText(text);
        }
    }, [text, targetLanguage]);

    return translatedText;
};
