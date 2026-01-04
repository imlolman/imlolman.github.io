import React, { useEffect } from 'react';
import { X, Globe, Share2, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageItem } from '../types';
import { motion } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import { ANALYTICS_EVENTS } from '../analytics';

interface ImageViewerProps {
  image: ImageItem;
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ image, images, currentIndex, onClose, onNext, onPrevious }) => {
  const posthog = usePostHog();
  const hasNext = currentIndex < images.length - 1;
  const hasPrevious = currentIndex > 0;

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && hasNext) {
        posthog?.capture(ANALYTICS_EVENTS.IMAGE_KEYBOARD_NAVIGATION, {
          direction: 'next',
          key: 'ArrowRight',
          image_title: images[currentIndex + 1]?.title
        });
        onNext();
      } else if (event.key === 'ArrowLeft' && hasPrevious) {
        posthog?.capture(ANALYTICS_EVENTS.IMAGE_KEYBOARD_NAVIGATION, {
          direction: 'previous',
          key: 'ArrowLeft',
          image_title: images[currentIndex - 1]?.title
        });
        onPrevious();
      } else if (event.key === 'Escape') {
        posthog?.capture(ANALYTICS_EVENTS.IMAGE_VIEWER_CLOSED, {
          method: 'keyboard_escape',
          image_title: image.title
        });
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNext, hasPrevious, onNext, onPrevious, onClose, posthog, image, images, currentIndex]);

  return (
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[60] flex flex-col lg:flex-row"
      onClick={() => {
        posthog?.capture(ANALYTICS_EVENTS.IMAGE_VIEWER_CLOSED, {
          method: 'background_click',
          image_title: image.title
        });
        onClose();
      }}
    >
      {/* Main Image Area */}
      <div className="flex-grow flex items-center justify-center p-4 relative h-full">
        {/* Previous Button */}
        {hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <img
          src={image.url}
          alt={image.title}
          className="max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <button
          onClick={() => {
            posthog?.capture(ANALYTICS_EVENTS.IMAGE_VIEWER_CLOSED, {
              method: 'close_button_mobile',
              image_title: image.title
            });
            onClose();
          }}
          className="absolute top-4 right-4 text-white/70 hover:text-white lg:hidden z-20"
        >
          <X size={24} />
        </button>
      </div>

      {/* Sidebar Details */}
      <div
        className="w-full lg:w-[400px] bg-[#202124] text-[#e8eaed] p-6 flex flex-col h-auto lg:h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl leading-snug font-medium">{image.title}</h2>
          <div className="flex gap-2">
            <button 
              className="p-2 hover:bg-[#3c4043] rounded-full"
              onClick={() => {
                posthog?.capture(ANALYTICS_EVENTS.IMAGE_SHARE_CLICKED, {
                  image_title: image.title,
                  image_url: image.url
                });
              }}
            >
              <Share2 size={20} />
            </button>
            <button className="p-2 hover:bg-[#3c4043] rounded-full"><MoreVertical size={20} /></button>
            <button 
              onClick={() => {
                posthog?.capture(ANALYTICS_EVENTS.IMAGE_VIEWER_CLOSED, {
                  method: 'close_button_desktop',
                  image_title: image.title
                });
                onClose();
              }} 
              className="hidden lg:block p-2 hover:bg-[#3c4043] rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">
            {image.source.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{image.source}</span>
            <span className="text-xs text-[#9aa0a6]">{image.source}</span>
          </div>
        </div>

        <a
          href={image.contextLink}
          target="_blank"
          rel="noreferrer"
          className="bg-[#8ab4f8] text-[#202124] text-center py-2 rounded-full font-medium hover:bg-[#aecbfa] transition-colors mb-4 block"
          onClick={() => {
            posthog?.capture(ANALYTICS_EVENTS.IMAGE_VISIT_CLICKED, {
              image_title: image.title,
              context_link: image.contextLink
            });
          }}
        >
          Visit
        </a>

        <div className="mt-auto pt-6 border-t border-[#3c4043]">
          <p className="text-xs text-[#9aa0a6]">Images may be subject to copyright.</p>
        </div>
      </div>
    </motion.div>
  );
};