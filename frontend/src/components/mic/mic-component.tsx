import React, { memo } from "react";
import MicIcon from '@mui/icons-material/Mic';

export const VoiceToText = memo((props:{setText:(value:any)=>void, language:'kn-IN'|'en-us'}) => {
    const {setText, language}=props;
    const [isListening, setIsListening] = React.useState(false);
    const [recognition, setRecognition] = React.useState<any>(null);

    React.useEffect(() => {
        // Check if browser supports SpeechRecognition
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = true;
            recog.interimResults = true;
            recog.lang = language;

            recog.onresult = (event: any) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setText(transcript);
            };

            setRecognition(recog);
        } else {
            console.info('Speech Recognition not supported in this browser.');
        }
    }, []);

    const startListening = () => {
        setIsListening(true);
        recognition?.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition?.stop();
    };

    return (
        <div className="p-4">
            <div className="mt-2 flex gap-2">
                {!isListening ? (
                    <MicIcon onClick={startListening}/>
                ) : (
                    <MicIcon onClick={stopListening}/>
                )}
            </div>
        </div>
    );
});

