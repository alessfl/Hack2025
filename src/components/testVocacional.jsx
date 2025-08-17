import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, BookOpen, Target, Lightbulb } from 'lucide-react';

// Data for the test questions
const preguntasGardner = [
  "¿Hacer un mapa o dar instrucciones de cómo llegar?",
  "¿Normalmente sé exactamente por qué estoy molesto o contento?",
  "Puedo sumar o multiplicar mentalmente con rapidez",
  "¿Disfruto de una buena plática?",
];

const preguntasEmocional = [
  "Presto mucha atención a lo que siento.",
  "Frecuentemente sé exactamente cómo me siento.",
  "Aunque a veces me sienta triste, suelo tener una visión optimista.",
  "Puedo cambiar mis sentimientos si quiero.",
];

const preguntasIntereses = [
  "Me entusiasma resolver problemas matemáticos o lógicos.",
  "Me gusta ayudar a otras personas a entender un tema o resolver sus dificultades.",
  "Disfruto crear cosas nuevas: dibujos, música, diseños o ideas innovadoras.",
  "Suelo encontrar la mejor forma de organizar tareas o coordinar a otras personas.",
];

const questionMappings = {
  0: { title: "Test de Inteligencia Múltiple (Howard Gardner)", subtitle: "Elige Verdadero o Falso según el caso.", questions: preguntasGardner, type: "boolean" },
  1: { title: "Test de Inteligencia Emocional (TMSS)", subtitle: "Marcar del 1 al 5, qué tan identificado te sientes.", questions: preguntasEmocional, type: "rating" },
  2: { title: "Test de Intereses, Aptitudes y Habilidades", subtitle: "Responde del 1 al 5 según qué tanto te identificas (1 = nada, 5 = totalmente).", questions: preguntasIntereses, type: "rating" },
};

// Helper function to convert base64 to ArrayBuffer
const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Helper function to convert PCM to WAV format
const pcmToWav = (pcmData, sampleRate = 16000) => {
  const pcm16 = new Int16Array(pcmData);
  const dataLength = pcm16.byteLength;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // file length
  view.setUint32(4, 36 + dataLength, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 = PCM)
  view.setUint16(20, 1, true);
  // number of channels
  view.setUint16(22, 1, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate
  view.setUint32(28, sampleRate * 2, true);
  // block align
  view.setUint16(32, 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, dataLength, true);

  // write the PCM samples
  let offset = 44;
  for (let i = 0; i < pcm16.length; i++) {
    view.setInt16(offset, pcm16[i], true);
    offset += 2;
  }
  return new Blob([view], { type: 'audio/wav' });
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// Componente de Recomendación
const RecommendationDisplay = ({ recommendationData, onBackToStart, darkMode }) => {
  if (!recommendationData) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className={`rounded-xl shadow-lg p-8 max-w-md w-full text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-blue-500">Generando tu recomendación...</span>
          </div>
        </div>
      </div>
    );
  }

  const { modulos_clave, razon, ruta_recomendada } = recommendationData;

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${darkMode ? 'bg-green-800' : 'bg-green-100'}`}>
            <CheckCircle className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>¡Análisis Completado!</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Aquí tienes tu recomendación personalizada</p>
        </div>

        {/* Main Recommendation Card */}
        <div className={`rounded-xl shadow-lg p-8 mb-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center mb-6">
            <Target className={`w-6 h-6 mr-3 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Ruta Recomendada</h2>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{ruta_recomendada}</h3>
            <p className="text-indigo-100">Tu camino de aprendizaje personalizado</p>
          </div>

          {/* Reason Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Lightbulb className={`w-5 h-5 mr-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>¿Por qué esta ruta?</h4>
            </div>
            <div className={`border-l-4 p-4 rounded-r-lg ${darkMode ? 'bg-gray-700 border-yellow-400' : 'bg-yellow-50 border-yellow-400'}`}>
              <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{razon}</p>
            </div>
          </div>

          {/* Key Modules Section */}
          {modulos_clave && modulos_clave.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <BookOpen className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Módulos Clave</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {modulos_clave.map((modulo, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg p-4 flex items-center ${darkMode ? 'bg-gray-700 border-blue-600' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                      {index + 1}
                    </div>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{modulo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
            <BookOpen className="w-5 h-5 mr-2" />
            Comenzar Ruta de Aprendizaje
          </button>
          
          <button 
            onClick={onBackToStart}
            className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Realizar Otro Test
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className={`rounded-lg p-6 shadow-sm ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h5 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>¿Qué sigue?</h5>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Esta recomendación está basada en tu perfil de aprendizaje. Puedes comenzar con los módulos sugeridos 
              o explorar otras opciones según tus intereses específicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestVocacional({ darkMode }) {
  const [step, setStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [appState, setAppState] = useState('ready'); // 'ready', 'reading', 'readyToListen', 'listening'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [recommendationData, setRecommendationData] = useState(null);
  const [showRecommendationScreen, setShowRecommendationScreen] = useState(false);

  const audioPlayerRef = useRef(null);
  const recognitionRef = useRef(null);

  const [answers, setAnswers] = useState({
    gardner: {},
    emocional: {},
    intereses: {}
  });

  const currentQuestions = questionMappings[step];
  const questionsInStep = currentQuestions?.questions || [];
  const currentQuestionText = questionsInStep[currentQuestionIndex];

  // Effect for speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn("Web Speech API no está soportada en este navegador.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Transcripción de voz:', transcript);
      setAppState('ready');
      handleVoiceResponse(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      setAppState('readyToListen');
      fetchAudio("Lo siento, hubo un error con el micrófono. Por favor, haz clic y vuelve a intentarlo.", false);
    };

    recognition.onend = () => {
      console.log("Reconocimiento de voz finalizado.");
      if (appState === 'listening') {
        setAppState('readyToListen');
      }
    };

    recognitionRef.current = recognition;

  }, [appState]);

  const handleVoiceResponse = (transcript) => {
    let recognizedAnswer = null;

    if (currentQuestions.type === 'boolean') {
      if (transcript.includes('verdadero') || transcript.includes('verdad') || transcript.includes('sí')) {
        recognizedAnswer = true;
      } else if (transcript.includes('falso') || transcript.includes('no')) {
        recognizedAnswer = false;
      }
    } else if (currentQuestions.type === 'rating') {
      const numberWords = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
      const transcriptWords = transcript.split(' ');
      for (let i = 0; i < transcriptWords.length; i++) {
        const word = transcriptWords[i];
        const numberValue = parseInt(word);
        if (numberWords.includes(word)) {
          recognizedAnswer = numberWords.indexOf(word) + 1;
          break;
        } else if (!isNaN(numberValue)) {
          if (numberValue >= 1 && numberValue <= 5) {
            recognizedAnswer = numberValue;
            break;
          }
        }
      }
    }

    if (recognizedAnswer !== null) {
      setAnswers(prev => ({
        ...prev,
        [Object.keys(answers)[step]]: {
          ...prev[Object.keys(answers)[step]],
          [currentQuestionText]: recognizedAnswer
        }
      }));
      handleNext();
    } else {
      fetchAudio("Lo siento, no reconocí tu respuesta. Por favor, intenta de nuevo.", false);
    }
  };

  const fetchAudio = async (text, autoListen = false, retries = 0) => {
    if (appState === 'reading') {
      return;
    }

    setAppState('reading');

    const payload = {
      contents: [{
        parts: [{ text: text }]
      }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Puck" }
          },
        }
      },
      model: "gemini-2.5-flash-preview-tts"
    };

    const apiKey = "AIzaSyDWH_htSkSy0Nz1vas_slkSBJFb5gqKufg";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429 && retries < 5) {
          const delay = Math.pow(2, retries) * 1000 + Math.floor(Math.random() * 1000);
          console.warn(`Too many requests. Retrying in ${delay}ms...`);
          setTimeout(() => fetchAudio(text, autoListen, retries + 1), delay);
          return;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const result = await response.json();
      const audioData = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (audioData) {
        const audioBuffer = base64ToArrayBuffer(audioData);
        const wavBlob = pcmToWav(audioBuffer);
        const audioUrl = URL.createObjectURL(wavBlob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          if (autoListen) {
            setAppState('readyToListen');
          }
        };

        audioPlayerRef.current = audio;
        audio.play();
      } else {
        console.error("No audio data received from the API.");
        setAppState('ready');
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
      setAppState('ready');
    }
  };

  const handleScreenClick = (e) => {
    const isButton = e.target.closest('button, input');
    if (isButton) {
      return;
    }

    if (appState === 'reading' || appState === 'listening' || showRecommendationScreen) {
      console.log(`App is busy, ignoring click. Current state: ${appState}`);
      return;
    }

    if (appState === 'ready') {
      setAppState('reading');
      const fullText = `Pregunta ${currentQuestionIndex + 1} de ${questionsInStep.length}: ${currentQuestionText}`;
      fetchAudio(fullText, true);
    } else if (appState === 'readyToListen') {
      try {
        if (audioPlayerRef.current) audioPlayerRef.current.pause();
        recognitionRef.current.start();
        setAppState('listening');
      } catch (e) {
        console.error("Recognition is already running:", e);
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById('test-container');
    if (container) {
      container.addEventListener('click', handleScreenClick);
      return () => container.removeEventListener('click', handleScreenClick);
    }
  }, [appState, showRecommendationScreen]);

  const handleAnswerChange = (e, testType) => {
    // Stop any ongoing audio playback and voice recognition
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    if (recognitionRef.current) recognitionRef.current.stop();
    setAppState('ready');

    const value = currentQuestions.type === 'boolean' ? (e.target.value === 'true') : parseInt(e.target.value);
    const questionKey = questionsInStep[currentQuestionIndex];

    setAnswers(prev => ({
      ...prev,
      [testType]: {
        ...prev[testType],
        [questionKey]: value
      }
    }));

    // Automatically move to the next question after a button click
    handleNext();
  };

  const handleNext = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    setAppState('ready');

    if (currentQuestionIndex === questionsInStep.length - 1) {
      setStep(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    setAppState('ready');

    if (currentQuestionIndex === 0 && step > 0) {
      setStep(prev => prev - 1);
      const prevQuestions = questionMappings[step - 1].questions;
      setCurrentQuestionIndex(prevQuestions.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    if (recognitionRef.current) recognitionRef.current.stop();

    setIsSubmitting(true);
    setMessage('');
    const token = localStorage.getItem("token");

    try {
      const response = await fetch('https://d9deb98f6310.ngrok-free.app/save-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error(`Error en el análisis. HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Results successfully sent. Server response:', data);

      setRecommendationData(data.recomendacion);
      setShowRecommendationScreen(true);

    } catch (error) {
      console.error("Error submitting results to the server:", error);
      setMessage("Hubo un problema al procesar tus resultados. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToStart = () => {
    setShowRecommendationScreen(false);
    setRecommendationData(null);
    setStep(0);
    setCurrentQuestionIndex(0);
    setAnswers({
      gardner: {},
      emocional: {},
      intereses: {}
    });
    setAppState('ready');
    setMessage('');
  };

  const isLastQuestion = currentQuestionIndex === questionsInStep.length - 1;
  const isLastStep = step === Object.keys(questionMappings).length - 1;
  const cardClasses = `p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-in-out transform ${darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white border border-gray-200"}`;

  return (
  <div 
    id="test-container" 
    className={`py-12 min-h-screen relative overflow-hidden 
      ${darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" 
        : "bg-gradient-to-br from-indigo-50 via-white to-purple-100 text-gray-800"
      }`}
  >
    {/* Fondo decorativo */}
    <div className="absolute inset-0 -z-10 opacity-30">
      <div className="w-[40rem] h-[40rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse absolute top-10 left-10"></div>
      <div className="w-[35rem] h-[35rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse absolute bottom-10 right-10"></div>
    </div>

    <div className="container mx-auto px-4 flex justify-center items-center">
      {showRecommendationScreen ? (
        <RecommendationDisplay 
          recommendationData={recommendationData}
          onBackToStart={handleBackToStart}
          darkMode={darkMode}
        />
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-10 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-in-out"
              style={{ 
                width: `${(
                  (step * 100 / Object.keys(questionMappings).length) + 
                  ((currentQuestionIndex + 1) / questionsInStep.length * (100 / Object.keys(questionMappings).length))
                )}%` 
              }}
            ></div>
          </div>

          {/* Tarjeta principal */}
          <div className={`
            p-10 rounded-2xl shadow-2xl backdrop-blur-md 
            transition-all duration-500 ease-in-out border
            ${darkMode 
              ? "bg-gray-800/80 border-gray-700 text-white" 
              : "bg-white/80 border-gray-200"
            }
          `}>
            <h3 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {currentQuestions.title}
            </h3>
            <p className="text-center text-lg mb-8 text-gray-500 dark:text-gray-400">
              {currentQuestions.subtitle}
            </p>

            {message && (
              <div className={`text-white text-center p-3 rounded-xl mb-4 shadow-md 
                ${message.includes('Error') || message.includes('problema') 
                  ? 'bg-red-500' 
                  : 'bg-green-500'
                }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pregunta */}
              <div className={`
                p-6 rounded-xl border transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-md
                ${darkMode 
                  ? "border-gray-600 bg-gray-700/80" 
                  : "bg-gray-50/70 hover:bg-white"
                }
              `}>
                <div className="flex flex-col items-center text-center">
                  <span className="text-2xl font-semibold mb-4">{currentQuestionText}</span>

                  {/* Estados de voz */}
                  {appState === 'ready' && <p className="text-sm text-gray-500">Haz clic para escuchar la pregunta 🎧</p>}
                  {appState === 'reading' && <p className="text-sm text-indigo-500 animate-pulse">Leyendo la pregunta...</p>}
                  {appState === 'readyToListen' && <p className="text-sm text-gray-500">Haz clic para responder 🎤</p>}
                  {appState === 'listening' && <p className="text-sm text-green-500 animate-pulse">Escuchando... habla ahora 🗣️</p>}

                  {/* Opciones */}
                  {currentQuestions.type === 'boolean' && (
                    <div className="flex gap-6 mt-6">
                      {['Verdadero', 'Falso'].map((label) => (
                        <label
                          key={label}
                          className={`
                            relative flex items-center justify-center w-36 h-16 
                            rounded-xl cursor-pointer font-bold text-lg shadow-md
                            transition-all duration-300 transform hover:scale-105
                            ${answers.gardner[currentQuestionText] === (label === 'Verdadero') 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105' 
                              : darkMode 
                                ? 'bg-gray-600 text-white hover:bg-gray-500' 
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name={`gardner-${currentQuestionIndex}`}
                            value={label === 'Verdadero'}
                            onChange={(e) => handleAnswerChange(e, 'gardner')}
                            checked={answers.gardner[currentQuestionText] === (label === 'Verdadero')}
                            className="absolute opacity-0"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  )}

                  {currentQuestions.type === 'rating' && (
                    <div className="flex gap-4 mt-6 flex-wrap justify-center">
                      {[1, 2, 3, 4, 5].map(valor => (
                        <label
                          key={valor}
                          className={`
                            w-14 h-14 flex items-center justify-center rounded-full 
                            font-bold cursor-pointer transition-all duration-300
                            ${answers[Object.keys(answers)[step]][currentQuestionText] === valor
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-110' 
                              : darkMode 
                                ? 'bg-gray-600 text-white hover:bg-gray-500' 
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name={`rating-${currentQuestionIndex}`}
                            value={valor}
                            onChange={(e) => handleAnswerChange(e, Object.keys(answers)[step])}
                            checked={answers[Object.keys(answers)[step]][currentQuestionText] === valor}
                            className="absolute opacity-0"
                          />
                          {valor}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Botones navegación */}
              <div className="flex justify-between items-center mt-10">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={step === 0 && currentQuestionIndex === 0}
                  className="px-6 py-3 rounded-xl font-semibold shadow-md 
                    bg-gray-200 hover:bg-gray-300 text-gray-800 
                    dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white
                    transition-all duration-300 disabled:opacity-50"
                >
                  ⬅ Anterior
                </button>

                {isLastQuestion && isLastStep ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl font-semibold shadow-lg 
                      bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                      hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Procesando..." : "Finalizar 🚀"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl font-semibold shadow-lg 
                      bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                      hover:scale-105 transition-all duration-300"
                  >
                    Siguiente ➡
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
);

}