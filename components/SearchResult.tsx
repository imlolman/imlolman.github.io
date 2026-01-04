import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SearchResultProps {
  title: string;
  url?: string;
  displayUrl?: string;
  description: React.ReactNode;
  breadcrumbs?: string[];
  isAd?: boolean;
  onLinkClick?: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({ 
  title, 
  url, 
  displayUrl, 
  description, 
  breadcrumbs,
  isAd = false,
  onLinkClick
}) => {
  return (
    <div className="mb-8 max-w-2xl font-sans">
      <div className="group cursor-pointer">
        {isAd && (
          <div className="flex items-center gap-2 mb-1">
             <span className="font-bold text-black text-sm">Sponsored</span>
          </div>
        )}
        
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="block" onClick={onLinkClick}>
             <div className="flex items-center text-sm text-[#202124] mb-1">
              {isAd ? (
                 <div className="flex items-center gap-2">
                    {displayUrl || url} 
                    <ExternalLink size={12} className="text-gray-500" />
                 </div>
              ) : (
                <>
                  <div className="bg-gray-100 rounded-full p-1 mr-3">
                    <img src={`https://www.google.com/s2/favicons?domain=${url}`} alt="icon" className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#202124] text-sm">{new URL(url).hostname}</span>
                    <span className="text-[#5f6368] text-xs">
                      {breadcrumbs ? breadcrumbs.join(' › ') : url}
                    </span>
                  </div>
                </>
              )}
            </div>
            <h3 className="text-xl text-[#1a0dab] group-hover:underline visited:text-[#609] truncate">
              {title}
            </h3>
          </a>
        ) : (
           <h3 className="text-xl text-[#1a0dab] mb-1">{title}</h3>
        )}
      </div>
      
      <div className="text-sm text-[#4d5156] leading-6 mt-1">
        {description}
      </div>
    </div>
  );
};