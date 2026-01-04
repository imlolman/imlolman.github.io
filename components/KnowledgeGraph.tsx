import React from 'react';
import { ProfileData, ImageItem } from '../types';
import { Mail } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { ANALYTICS_EVENTS } from '../analytics';

interface KnowledgeGraphProps {
   data: ProfileData;
   images?: ImageItem[];
   onImageClick?: (image: ImageItem) => void;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data, images = [], onImageClick }) => {
   const posthog = usePostHog();
   const displayImages = images.length > 0 ? images : [];

   return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white w-full lg:max-w-sm shadow-sm font-sans h-fit">
         {/* Header Images - With Real Images Overlay */}
         <div className="grid grid-cols-4 gap-0 mb-4 h-32 overflow-hidden rounded-t-lg relative">
            {/* Background Placeholders */}
            <div className="col-span-2 bg-[#4285F4] h-full flex items-center justify-center text-white text-4xl font-bold opacity-80 z-0">
               SG
            </div>
            <div className="bg-gray-200 h-full z-0"></div>
            <div className="bg-gray-300 h-full z-0"></div>

            {/* Image Overlays - positioned absolutely to match grid cells */}
            {displayImages[0] && (
               <div
                  className="absolute top-0 left-0 h-full cursor-pointer group z-10"
                  style={{ width: '50%' }}
                  onClick={(e) => {
                     e.stopPropagation();
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_IMAGE_CLICKED, {
                        image_title: displayImages[0].title,
                        image_position: 0
                     });
                     onImageClick?.(displayImages[0]);
                  }}
               >
                  <img
                     src={displayImages[0].url}
                     alt={displayImages[0].title}
                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
                     style={{ objectPosition: 'center 0%' }}
                  />
               </div>
            )}
            {displayImages[1] && (
               <div
                  className="absolute top-0 h-full cursor-pointer group z-10"
                  style={{ left: '50%', width: '25%' }}
                  onClick={(e) => {
                     e.stopPropagation();
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_IMAGE_CLICKED, {
                        image_title: displayImages[1].title,
                        image_position: 1
                     });
                     onImageClick?.(displayImages[1]);
                  }}
               >
                  <img
                     src={displayImages[1].url}
                     alt={displayImages[1].title}
                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
               </div>
            )}
            {displayImages[2] && (
               <div
                  className="absolute top-0 h-1/2 cursor-pointer group z-10"
                  style={{ left: '75%', width: '25%' }}
                  onClick={(e) => {
                     e.stopPropagation();
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_IMAGE_CLICKED, {
                        image_title: displayImages[2].title,
                        image_position: 2
                     });
                     onImageClick?.(displayImages[2]);
                  }}
               >
                  <img
                     src={displayImages[2].url}
                     alt={displayImages[2].title}
                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
               </div>
            )}
            {displayImages[3] && (
               <div
                  className="absolute bottom-0 h-1/2 cursor-pointer group z-10"
                  style={{ left: '75%', width: '25%' }}
                  onClick={(e) => {
                     e.stopPropagation();
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_IMAGE_CLICKED, {
                        image_title: displayImages[3].title,
                        image_position: 3
                     });
                     onImageClick?.(displayImages[3]);
                  }}
               >
                  <img
                     src={displayImages[3].url}
                     alt={displayImages[3].title}
                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
               </div>
            )}
         </div>

         <div className="mb-4 relative">
            <h2 className="text-3xl font-normal text-[#202124] mb-1">{data.name}</h2>
            <p className="text-[#5f6368] text-sm mb-4">{data.titles.join(' • ')}</p>

            <div className="flex gap-3 mb-4 border-b border-gray-200 pb-4">
               <a 
                  href={`mailto:${data.socials.find(s => s.name === 'Email')?.url}`} 
                  className="group cursor-pointer" 
                  title="Email"
                  onClick={() => {
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_EMAIL_CLICKED, {
                        email: data.socials.find(s => s.name === 'Email')?.url
                     });
                  }}
               >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 text-gray-700 transition-colors">
                     <Mail size={18} />
                  </div>
               </a>
               <a 
                  href={data.socials.find(s => s.name === 'LinkedIn')?.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group cursor-pointer" 
                  title="LinkedIn"
                  onClick={() => {
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_LINKEDIN_CLICKED, {
                        url: data.socials.find(s => s.name === 'LinkedIn')?.url
                     });
                  }}
               >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 text-gray-700 transition-colors">
                     <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                     </svg>
                  </div>
               </a>
               <a 
                  href={data.socials.find(s => s.name === 'GitHub')?.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group cursor-pointer" 
                  title="GitHub"
                  onClick={() => {
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_GITHUB_CLICKED, {
                        url: data.socials.find(s => s.name === 'GitHub')?.url
                     });
                  }}
               >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 text-gray-700 transition-colors">
                     <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                     </svg>
                  </div>
               </a>
               <a 
                  href={data.socials.find(s => s.name === 'Portfolio')?.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group cursor-pointer" 
                  title="Website"
                  onClick={() => {
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_WEBSITE_CLICKED, {
                        url: data.socials.find(s => s.name === 'Portfolio')?.url
                     });
                  }}
               >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 text-gray-700 transition-colors">
                     <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                     </svg>
                  </div>
               </a>
               <a 
                  href={data.socials.find(s => s.name === 'Medium')?.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group cursor-pointer" 
                  title="Medium"
                  onClick={() => {
                     posthog?.capture(ANALYTICS_EVENTS.KNOWLEDGE_GRAPH_MEDIUM_CLICKED, {
                        url: data.socials.find(s => s.name === 'Medium')?.url
                     });
                  }}
               >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 text-gray-700 transition-colors">
                     <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                     </svg>
                  </div>
               </a>
            </div>

            <div className="text-sm leading-6 text-[#202124]">
               <p className="mb-4">
                  {data.summary}
               </p>

               <div className="space-y-3">
                  <div className="flex">
                     <span className="font-bold min-w-[100px]">Current Role:</span>
                     <span>{data.currentWork.role} at {data.currentWork.company}</span>
                  </div>
                  <div className="flex">
                     <span className="font-bold min-w-[100px]">Location:</span>
                     <span>{data.location}</span>
                  </div>
                  <div className="flex">
                     <span className="font-bold min-w-[100px]">Experience:</span>
                     <span>8+ Years</span>
                  </div>
                  <div className="flex">
                     <span className="font-bold min-w-[100px]">Key Skills:</span>
                     <span>Microservices, Laravel, AWS, Cyber Security</span>
                  </div>
               </div>

               {/* Professional Certifications */}
               <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-bold mb-3">Professional Certifications</h4>
                  <div className="space-y-3">
                     {data.certifications.map((cert, idx) => (
                        <div key={idx} className="pb-3 border-b last:border-0 border-gray-100">
                           {cert.badgeUrl && (
                              <img src={cert.badgeUrl} alt={cert.name} className="h-6 mb-2" />
                           )}
                           <h5 className="text-sm font-medium text-[#202124] mb-1">{cert.name}</h5>
                           <p className="text-xs text-[#5f6368] mb-0.5">{cert.issuer}</p>
                           <p className="text-xs text-[#1a73e8]">{cert.date}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};