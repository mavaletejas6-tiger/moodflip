import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Check, AlertCircle } from 'lucide-react';
import { Language } from '../utils/i18n';

interface CameraScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageBase64: string) => void;
  language?: Language;
}

export const CameraScanModal: React.FC<CameraScanModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  language = 'en'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const isIt = language === 'it';

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
      setCameraError(null);
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera error:', err);
      setCameraError(
        isIt 
          ? 'Impossibile accedere alla webcam. Puoi comunque descrivere le tue emozioni digitandole direttamente!'
          : 'Unable to access camera. You can still type your mood directly into MoodFlip!'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(base64);
    }
  };

  const retakeSnapshot = () => {
    setCapturedImage(null);
  };

  const confirmSnapshot = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-700 p-6 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 mb-4">
          <Camera className="w-5 h-5 text-white" />
          <div>
            <h3 className="font-serif-title text-xl font-bold text-white">
              {isIt ? 'Scansione Visiva Espressione' : 'Gemini Facial Mood Scan'}
            </h3>
            <p className="text-xs font-mono-code text-neutral-400">
              {isIt ? 'Scatta un selfie per analizzare l\'espressione emotiva' : 'Capture a selfie to analyze emotional expression'}
            </p>
          </div>
        </div>

        {cameraError ? (
          <div className="py-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-xs font-mono-code text-neutral-300 max-w-xs mx-auto">
              {cameraError}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white text-black text-xs font-mono-code uppercase font-semibold cursor-pointer"
            >
              {isIt ? 'Continua senza fotocamera' : 'Continue without Camera'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full aspect-video bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Mood selfie snapshot"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              )}

              {/* Viewfinder Overlay */}
              <div className="absolute inset-4 border border-dashed border-white/40 pointer-events-none flex flex-col justify-between p-2">
                <span className="text-[10px] font-mono-code text-white/70">
                  {isIt ? 'BERSAGLIO_SCANSIONE' : 'GEMINI_SCAN_TARGET'}
                </span>
                <span className="text-[9px] font-mono-code text-white/50 text-right">
                  {isIt ? 'ESPRESSIONE_VOLTO' : 'FACE_EXPRESSION'}
                </span>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex items-center justify-between pt-2">
              {capturedImage ? (
                <>
                  <button
                    onClick={retakeSnapshot}
                    className="flex items-center gap-1.5 px-3 py-2 border border-neutral-800 text-xs font-mono-code text-neutral-300 hover:text-white hover:border-neutral-600 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {isIt ? 'Scatta di nuovo' : 'Retake'}
                  </button>
                  <button
                    onClick={confirmSnapshot}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-mono-code uppercase font-semibold tracking-wider hover:bg-neutral-200 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isIt ? 'Analizza Espressione' : 'Analyze This Expression'}
                  </button>
                </>
              ) : (
                <button
                  onClick={takeSnapshot}
                  className="w-full py-2.5 bg-white text-black text-xs font-mono-code uppercase font-bold tracking-wider hover:bg-neutral-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  {isIt ? 'Scatta Istantanea Espressione' : 'Capture Expression Snapshot'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
