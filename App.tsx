import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Camera, X, Settings, Terminal, PlayCircle, Newspaper, Image as ImageIcon, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { SearchResult } from './components/SearchResult';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { ImageViewer } from './components/ImageViewer';
import { profileData } from './data';
import { ImageItem, ProjectItem } from './types';

// Google Apps configuration with sprite positions (adding 103px to each position)
const GOOGLE_APPS = [
  { name: 'Account', bgPosition: '0 -1901px', url: 'https://myaccount.google.com/', useProfileImage: true },
  { name: 'Drive', bgPosition: '0px -2144px', url: 'https://drive.google.com/' },
  { name: 'Photos', bgPosition: '0px -1773px', url: 'https://photos.google.com/' },
  { name: 'Gmail', bgPosition: '0px -552px', url: 'https://mail.google.com/' },
  { name: 'YouTube', bgPosition: '0px -1164px', url: 'https://www.youtube.com/' },
  { name: 'Maps', bgPosition: '0px -2268px', url: 'https://maps.google.com/' },
];

enum AppState {
  HOME,
  TYPING,
  SEARCHING,
  RESULTS
}

enum Tab {
  AI_MODE,
  ALL,
  IMAGES,
  VIDEOS,
  NEWS,
  PROJECTS,
  MAPS
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ALL);
  const [searchValue, setSearchValue] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [clickedApps, setClickedApps] = useState<Set<string>>(new Set());
  const [skipHomepage, setSkipHomepage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skipHomepage');
      return saved === 'true';
    }
    return false;
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedImage = selectedImageIndex !== null ? profileData.images[selectedImageIndex] : null;

  const handleImageClick = (image: ImageItem) => {
    const index = profileData.images.findIndex(img => img.url === image.url);
    setSelectedImageIndex(index >= 0 ? index : 0);
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < profileData.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const TYPING_SPEED = 80;
  const TARGET_SEARCH = profileData.handle;

  // Check skip homepage setting on mount
  useEffect(() => {
    if (skipHomepage) {
      setSearchValue(TARGET_SEARCH);
      setAppState(AppState.RESULTS);
    }
  }, []);

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects/projects.json');
        const data = await response.json();
        // Sort projects by createdAt date (newest first)
        const sortedProjects = data.sort((a: ProjectItem, b: ProjectItem) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Descending order (newest first)
        });
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (skipHomepage) return; // Skip animation if homepage is disabled

    if (appState === AppState.HOME) {
      timeout = setTimeout(() => setAppState(AppState.TYPING), 800);
    } else if (appState === AppState.TYPING) {
      if (searchValue.length < TARGET_SEARCH.length) {
        timeout = setTimeout(() => {
          setSearchValue(TARGET_SEARCH.slice(0, searchValue.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setAppState(AppState.SEARCHING), 400);
      }
    } else if (appState === AppState.SEARCHING) {
      timeout = setTimeout(() => setAppState(AppState.RESULTS), 600);
    }

    return () => clearTimeout(timeout);
  }, [appState, searchValue, skipHomepage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Check if search is for imlolman
      if (searchValue.toLowerCase().includes('imlolman') || searchValue.toLowerCase().includes('satyam')) {
        setAppState(AppState.RESULTS);
      } else {
        // Redirect to Google search
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`, '_blank');
      }
    }
  };

  const isHome = appState !== AppState.RESULTS;

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showAppsMenu) setShowAppsMenu(false);
      if (showSettingsMenu) setShowSettingsMenu(false);
      if (showProfileMenu) setShowProfileMenu(false);
      if (selectedImageIndex !== null) setSelectedImageIndex(null);
    };

    if (showAppsMenu || showSettingsMenu || showProfileMenu || selectedImageIndex !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showAppsMenu, showSettingsMenu, showProfileMenu, selectedImageIndex]);

  return (
    <div className={`min-h-screen bg-white text-[#202124] flex flex-col ${isHome || selectedImage ? 'overflow-hidden' : ''}`}>

      {/* Image Preview Overlay */}
      <AnimatePresence>
        {selectedImage && selectedImageIndex !== null && (
          <ImageViewer
            image={selectedImage}
            images={profileData.images}
            currentIndex={selectedImageIndex}
            onClose={() => setSelectedImageIndex(null)}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
          />
        )}
      </AnimatePresence>

      {/* --- Sticky Header Area (Animates from Center) --- */}
      <motion.div
        layout
        className={`flex ${isHome ? 'flex-col h-[calc(100vh-100px)] justify-center items-center px-4' : 'flex-col lg:flex-row items-center p-4 lg:p-6 !pb-0 sticky top-0 bg-white z-50 border-b border-gray-200 shadow-sm lg:shadow-none'}`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Top Right Header Controls (Only on Home) */}
        {isHome && (
          <motion.header
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-0 right-0 p-4 flex gap-4 items-center text-sm"
          >
            <div className="relative">
              <div
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettingsMenu(!showSettingsMenu);
                  setShowAppsMenu(false);
                  setShowProfileMenu(false);
                }}
              >
                <Settings size={20} className="text-gray-600" />
              </div>
              {showSettingsMenu && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-2xl shadow-[0_4px_6px_rgba(32,33,36,.28)] w-80 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <div className="text-base font-normal text-[#202124] mb-4">Quick settings</div>
                    <div className="border-t border-[#e8eaed] pt-4">
                      <div
                        className="py-3 hover:bg-[#f1f3f4] rounded-lg px-3 cursor-pointer flex items-center justify-between"
                        onClick={() => {
                          const newValue = !skipHomepage;
                          setSkipHomepage(newValue);
                          localStorage.setItem('skipHomepage', newValue.toString());
                          if (newValue && appState === AppState.HOME) {
                            setSearchValue(TARGET_SEARCH);
                            setAppState(AppState.RESULTS);
                          }
                        }}
                      >
                        <span className="text-sm text-[#202124]">Show homepage</span>
                        <div className={`w-10 h-5 rounded-full transition-colors ${skipHomepage ? 'bg-gray-300' : 'bg-[#1a73e8]'} relative`}>
                          <div className={`absolute top-0.5 ${skipHomepage ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all shadow`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAppsMenu(!showAppsMenu);
                  setShowSettingsMenu(false);
                  setShowProfileMenu(false);
                }}
              >
                <svg className="gb_Ve" focusable="false" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                </svg>
              </div>
              {showAppsMenu && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-3xl shadow-[0_4px_6px_rgba(32,33,36,.28)] w-[348px] z-50"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxHeight: 'calc(100vh - 70px)',
                    overflowY: 'auto'
                  }}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {GOOGLE_APPS.map((app) => {
                        const isAlreadyClicked = clickedApps.has(app.name);
                        const currentUniqueCount = clickedApps.size;
                        const nextUniqueCount = isAlreadyClicked ? currentUniqueCount : currentUniqueCount + 1;

                        const getAppMessage = () => {
                          // If this specific app was already clicked
                          if (isAlreadyClicked) {
                            return "you've already clicked me";
                          }

                          // First unique click
                          if (nextUniqueCount === 1) {
                            return `really? now you want '${app.name}' in the portfolio`;
                          }

                          // Second unique click
                          if (nextUniqueCount === 2) {
                            return `really? now you want '${app.name}' in the portfolio`;
                          }

                          // Third unique click
                          if (nextUniqueCount === 3) {
                            return "Bro, all the apps have same popup content, why are you clicking all of them?";
                          }

                          // Fourth unique click
                          if (nextUniqueCount === 4) {
                            return "You're still discovering, crazy person you are";
                          }

                          // Fifth and sixth unique clicks
                          if (nextUniqueCount === 5 || nextUniqueCount === 6) {
                            return `really? now you want '${app.name}' in the portfolio`;
                          }

                          // This should never happen since there are only 6 apps
                          return "you've already clicked me";
                        };

                        return (
                          <div
                            key={app.name}
                            className="flex flex-col items-center p-2 hover:bg-[#f1f3f4] rounded-lg cursor-pointer transition-colors relative group"
                            onClick={() => {
                              if (!isAlreadyClicked) {
                                setClickedApps(new Set([...clickedApps, app.name]));
                              }
                              alert(getAppMessage());
                            }}
                          >
                            {app.useProfileImage ? (
                              <div className="w-14 h-14 mb-1 rounded-full relative">
                                {/* 4-color border */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#4285F4"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                  />
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#EA4335"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                    strokeDashoffset="-39.3"
                                  />
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#FBBC04"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                    strokeDashoffset="-78.6"
                                  />
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#34A853"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                    strokeDashoffset="-117.9"
                                  />
                                </svg>
                                <img
                                  src="/images/profile.png"
                                  alt="Account"
                                  className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover"
                                />
                              </div>
                            ) : (
                              <div
                                className="w-14 h-14 mb-1 bg-no-repeat"
                                style={{
                                  backgroundImage: 'url(/google-apps-sprite.png)',
                                  backgroundPosition: app.bgPosition,
                                  backgroundSize: 'cover'
                                }}
                              />
                            )}
                            <span className="text-[11px] text-[#3c4043] text-center leading-[14px] font-['Product_Sans',Arial,sans-serif]">{app.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full cursor-pointer relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                  setShowAppsMenu(false);
                  setShowSettingsMenu(false);
                }}
              >
                {/* 4-color border */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#4285F4"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#EA4335"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                    strokeDashoffset="-26.7"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#FBBC04"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                    strokeDashoffset="-53.4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#34A853"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                    strokeDashoffset="-80.1"
                  />
                </svg>
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover"
                />
              </div>
              {showProfileMenu && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-2xl shadow-[0_4px_6px_rgba(32,33,36,.28)] w-80 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-20 h-20 rounded-full mb-3 relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#4285F4"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#EA4335"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                            strokeDashoffset="-56.5"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#FBBC04"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                            strokeDashoffset="-113"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#34A853"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                            strokeDashoffset="-169.5"
                          />
                        </svg>
                        <img
                          src="/images/profile.png"
                          alt="Profile"
                          className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-base font-medium text-[#202124]">{profileData.name}</h3>
                        <p className="text-sm text-[#5f6368]">{profileData.socials.find(s => s.name === 'Email')?.url.replace('mailto:', '')}</p>
                      </div>
                    </div>
                    <div className="border-t border-[#e8eaed] pt-4">
                      <a
                        href="https://myaccount.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2 px-4 text-sm text-[#1a73e8] hover:bg-[#f1f3f4] rounded-lg transition-colors text-center border border-[#dadce0]"
                      >
                        Manage <span className="font-bold">your</span> Google Account
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.header>
        )}

        {/* Logo Animation Container */}
        <motion.div
          layout
          className={`flex items-center ${isHome ? 'mb-8' : 'lg:mr-20 mb-4 lg:mb-0 mt-2 lg:mt-0 lg:self-start lg:mt-4 lg:ml-4'}`}
        >
          <Logo
            size={isHome ? 'large' : 'small'}
            text='Satyam'
            onClick={() => { setAppState(AppState.HOME); setSearchValue(""); }}
            className="cursor-pointer"
          />
        </motion.div>

        {/* Search Bar Container */}
        <motion.div
          layout
          className={`w-full ${isHome ? 'max-w-[584px]' : 'flex-grow lg:max-w-2xl'}`}
        >
          <form onSubmit={handleSearch} className="relative">
            <div className={`flex items-center w-full px-5 rounded-full border hover:shadow-md transition-shadow ${isHome ? 'py-3 border-gray-200' : 'py-2 bg-white shadow-md border-gray-100'}`}>
              {!isHome ? null : <Search className="text-gray-400 mr-3" size={20} />}
              <input
                ref={inputRef}
                type="text"
                className="flex-grow outline-none text-base bg-transparent"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="flex items-center gap-3 ml-2">
                {searchValue && (
                  <X
                    size={24}
                    className="text-gray-500 cursor-pointer pr-2 border-r border-gray-300"
                    onClick={() => setSearchValue("")}
                  />
                )}
                <Mic
                  className="text-[#4285F4] cursor-pointer"
                  size={20}
                  onClick={() => {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue || 'voice search')}`, '_blank');
                  }}
                />
                <Camera
                  className="text-[#4285F4] cursor-pointer"
                  size={20}
                  onClick={() => {
                    window.open('https://lens.google.com/', '_blank');
                  }}
                />
                {!isHome && <Search className="text-[#4285F4] cursor-pointer pl-3 border-l border-gray-300" size={32} onClick={handleSearch} />}
              </div>
            </div>

            {/* Home Buttons */}
            {isHome && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex justify-center gap-3 mt-8"
              >
                <button type="submit" className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 rounded text-sm text-[#3c4043]">
                  Google Search
                </button>
                <button type="button" className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 rounded text-sm text-[#3c4043]">
                  I'm Feeling Lucky
                </button>
              </motion.div>
            )}
          </form>

          {/* Results Navigation Tabs (Only in Results) */}
          {!isHome && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex gap-6 mt-4 lg:mt-6 ml-4 text-sm text-[#5f6368] overflow-x-auto no-scrollbar"
            >
              {[
                { type: Tab.AI_MODE, label: 'AI Mode', icon: Sparkles },
                { type: Tab.ALL, label: 'All', icon: Search },
                { type: Tab.IMAGES, label: 'Images', icon: ImageIcon },
                { type: Tab.VIDEOS, label: 'Videos', icon: PlayCircle },
                { type: Tab.NEWS, label: 'News', icon: Newspaper },
                { type: Tab.PROJECTS, label: 'Projects', icon: Terminal },
                { type: Tab.MAPS, label: 'Maps', icon: MapPin },
              ].map(tab => (
                <div
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type)}
                  className={`pb-3 cursor-pointer flex-shrink-0 flex items-center gap-1 ${activeTab === tab.type ? 'border-b-[3px] border-[#1a73e8] text-[#1a73e8] font-medium' : 'hover:text-[#202124]'}`}
                >
                  <tab.icon size={14} /> {tab.label}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Top Right Controls (Only in Results) */}
        {!isHome && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="hidden lg:flex items-center gap-4 ml-auto mb-auto pt-2"
          >
            <div className="relative">
              <Settings
                className="text-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettingsMenu(!showSettingsMenu);
                  setShowAppsMenu(false);
                  setShowProfileMenu(false);
                }}
              />
              {showSettingsMenu && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-2xl shadow-[0_4px_6px_rgba(32,33,36,.28)] w-80 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <div className="text-base font-normal text-[#202124] mb-4">Quick settings</div>
                    <div className="border-t border-[#e8eaed] pt-4">
                      <div
                        className="py-3 hover:bg-[#f1f3f4] rounded-lg px-3 cursor-pointer flex items-center justify-between"
                        onClick={() => {
                          const newValue = !skipHomepage;
                          setSkipHomepage(newValue);
                          localStorage.setItem('skipHomepage', newValue.toString());
                          if (newValue && appState === AppState.HOME) {
                            setSearchValue(TARGET_SEARCH);
                            setAppState(AppState.RESULTS);
                          }
                        }}
                      >
                        <span className="text-sm text-[#202124]">Show homepage</span>
                        <div className={`w-10 h-5 rounded-full transition-colors ${skipHomepage ? 'bg-gray-300' : 'bg-[#1a73e8]'} relative`}>
                          <div className={`absolute top-0.5 ${skipHomepage ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all shadow`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAppsMenu(!showAppsMenu);
                  setShowSettingsMenu(false);
                }}
              >
                <svg className="gb_Ve" focusable="false" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                </svg>
              </div>
              {showAppsMenu && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-3xl shadow-[0_4px_6px_rgba(32,33,36,.28)] w-[348px] z-50"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxHeight: 'calc(100vh - 70px)',
                    overflowY: 'auto'
                  }}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {GOOGLE_APPS.map((app) => {
                        const isAlreadyClicked = clickedApps.has(app.name);
                        const currentUniqueCount = clickedApps.size;
                        const nextUniqueCount = isAlreadyClicked ? currentUniqueCount : currentUniqueCount + 1;

                        const getAppMessage = () => {
                          // If this specific app was already clicked
                          if (isAlreadyClicked) {
                            return "you've already clicked me";
                          }

                          // First unique click
                          if (nextUniqueCount === 1) {
                            return `really? now you want '${app.name}' in the portfolio`;
                          }

                          // Second unique click
                          if (nextUniqueCount === 2) {
                            return `really? now you want '${app.name}' in the portfolio`;
                          }

                          // Third unique click
                          if (nextUniqueCount === 3) {
                            return "Bro, all the apps have same popup content, why are you clicking all of them?";
                          }

                          // Fourth unique click
                          if (nextUniqueCount === 4) {
                            return "You're still discovering, crazy person you are";
                          }

                          // Fifth and sixth unique clicks
                          if (nextUniqueCount === 5 || nextUniqueCount === 6) {
                            return `really? now you want '${app.name}' in the portfolio`;
                          }

                          // This should never happen since there are only 6 apps
                          return "you've already clicked me";
                        };

                        return (
                          <div
                            key={app.name}
                            className="flex flex-col items-center p-2 hover:bg-[#f1f3f4] rounded-lg cursor-pointer transition-colors relative group"
                            onClick={() => {
                              if (!isAlreadyClicked) {
                                setClickedApps(new Set([...clickedApps, app.name]));
                              }
                              alert(getAppMessage());
                            }}
                          >
                            {app.useProfileImage ? (
                              <div className="w-14 h-14 mb-1 rounded-full relative">
                                {/* 4-color border */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#4285F4"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                  />
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#EA4335"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                    strokeDashoffset="-39.3"
                                  />
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#FBBC04"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                    strokeDashoffset="-78.6"
                                  />
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="25"
                                    fill="none"
                                    stroke="#34A853"
                                    strokeWidth="2.5"
                                    strokeDasharray="39.3 117.8"
                                    strokeDashoffset="-117.9"
                                  />
                                </svg>
                                <img
                                  src="/images/profile.png"
                                  alt="Account"
                                  className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover"
                                />
                              </div>
                            ) : (
                              <div
                                className="w-14 h-14 mb-1 bg-no-repeat"
                                style={{
                                  backgroundImage: 'url(/google-apps-sprite.png)',
                                  backgroundPosition: app.bgPosition,
                                  backgroundSize: 'cover'
                                }}
                              />
                            )}
                            <span className="text-[11px] text-[#3c4043] text-center leading-[14px] font-['Product_Sans',Arial,sans-serif]">{app.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full cursor-pointer relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                  setShowAppsMenu(false);
                  setShowSettingsMenu(false);
                }}
              >
                {/* 4-color border */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#4285F4"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#EA4335"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                    strokeDashoffset="-26.7"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#FBBC04"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                    strokeDashoffset="-53.4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="17"
                    fill="none"
                    stroke="#34A853"
                    strokeWidth="2.5"
                    strokeDasharray="26.7 80.1"
                    strokeDashoffset="-80.1"
                  />
                </svg>
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover"
                />
              </div>
              {showProfileMenu && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-2xl shadow-[0_4px_6px_rgba(32,33,36,.28)] w-80 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-20 h-20 rounded-full mb-3 relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#4285F4"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#EA4335"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                            strokeDashoffset="-56.5"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#FBBC04"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                            strokeDashoffset="-113"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#34A853"
                            strokeWidth="3"
                            strokeDasharray="56.5 169.6"
                            strokeDashoffset="-169.5"
                          />
                        </svg>
                        <img
                          src="/images/profile.png"
                          alt="Profile"
                          className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-base font-medium text-[#202124]">{profileData.name}</h3>
                        <p className="text-sm text-[#5f6368]">{profileData.socials.find(s => s.name === 'Email')?.url.replace('mailto:', '')}</p>
                      </div>
                    </div>
                    <div className="border-t border-[#e8eaed] pt-4">
                      <a
                        href="https://myaccount.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2 px-4 text-sm text-[#1a73e8] hover:bg-[#f1f3f4] rounded-lg transition-colors text-center border border-[#dadce0]"
                      >
                        Manage <span className="font-bold">your</span> Google Account
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* --- Main Content Area --- */}
      <AnimatePresence mode="wait">
        {!isHome && (
          <motion.div
            key={activeTab} // Animate when tab changes
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col lg:flex-row gap-8 px-4 lg:px-6 lg:pl-[220px] py-6 max-w-[1400px] flex-1"
          >
            {/* --- TAB: AI MODE --- */}
            {activeTab === Tab.AI_MODE && (
              <div className="flex-grow max-w-2xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-lg text-[#4d5156] mb-4">
                    AI Mode? Really? Even Google's confused. Go back to All mode please.
                  </p>
                  <button
                    onClick={() => setActiveTab(Tab.ALL)}
                    className="bg-[#1a73e8] text-white px-6 py-2 rounded hover:bg-[#1557b0] transition-colors"
                  >
                    Go back to All
                  </button>
                </div>
              </div>
            )}

            {/* --- TAB: ALL --- */}
            {activeTab === Tab.ALL && (
              <>
                <div className="flex-grow max-w-2xl">
                  <div className="text-sm text-[#70757a] mb-4">
                    About {Math.floor(Math.random() * 1000000)} results ({(Math.random() * 0.5 + 0.2).toFixed(2)} seconds)
                  </div>

                  {/* LinkedIn / Ad */}
                  <SearchResult
                    title="Connect with Satyam Gupta (imlolman)"
                    description={
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.socials.filter(s => s.name !== 'Medium').map((s, i) => (
                          <a key={i} href={s.url} target="_blank" rel="noreferrer">
                            <img src={s.badgeUrl} alt={s.name} className="h-6 rounded-sm opacity-90 hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    }
                    url={profileData.socials.find(s => s.name === 'LinkedIn')?.url}
                    displayUrl="linkedin.com/in/imlolman"
                    isAd={true}
                  />

                  {/* Brandzzy Work */}
                  <SearchResult
                    title={`${profileData.currentWork.role} - ${profileData.currentWork.company}`}
                    url="https://brandzzy.com"
                    breadcrumbs={['Brandzzy', 'Team', 'Satyam Gupta']}
                    description={
                      <div className="space-y-2">
                        <p className="font-medium text-gray-800">{profileData.currentWork.period}</p>
                        <div className="flex gap-2 my-2 overflow-x-auto">
                          {profileData.currentWork.stats.map((stat, i) => (
                            <img key={i} src={stat.icon} alt={stat.label} className="h-5" />
                          ))}
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[#4d5156]">
                          {profileData.currentWork.description.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    }
                  />

                  {/* Projects Section */}
                  <div className="mb-6">
                    <h3 className="text-xl text-[#202124] mb-4">Featured Projects</h3>
                    {profileData.projects.map((project, idx) => (
                      <SearchResult
                        key={idx}
                        title={project.title}
                        url={project.url || `https://github.com/${profileData.handle}`}
                        breadcrumbs={['Projects', project.title]}
                        description={
                          <div>
                            <p>{project.description}</p>
                            <div className="mt-2 flex flex-wrap gap-1 text-xs ">
                              <span className="text-gray-500 mr-1 font-bold">Stack:</span>
                              {project.techStack.join(', ')}
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </div>

                  {/* Open Source Section */}
                  <div className="mb-8">
                    <h3 className="text-xl text-[#202124] mb-1 flex items-center gap-2">
                      <Terminal size={20} className="text-[#EA4335]" /> {profileData.openSource.projects.title}
                    </h3>
                    <p className="text-sm text-[#5f6368] mb-4">{profileData.openSource.projects.subtitle}</p>

                    {profileData.openSource.projects.categories.map((category, catIdx) => (
                      <div key={catIdx} className="mb-6">
                        <h4 className="text-base font-medium text-[#202124] mb-3">{category.name}</h4>
                        <div className="grid lg:grid-cols-2 gap-4">
                          {category.items.map((project, i) => (
                            <div key={i} className="border p-3 rounded hover:shadow-sm">
                              <a href={project.url} target="_blank" rel="noreferrer" className="text-[#1a0dab] hover:underline font-medium block">{project.name}</a>
                              <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Maccy Contribution Section */}
                  <div className="mb-8">
                    <h3 className="text-xl text-[#202124] mb-1 flex items-center gap-2">
                      <Terminal size={20} className="text-[#34A853]" /> {profileData.openSource.maccy.title}
                    </h3>
                    <p className="text-sm text-[#5f6368] mb-4">{profileData.openSource.maccy.subtitle}</p>

                    <div className="border p-4 rounded hover:shadow-sm max-w-xl">
                      <a href={profileData.openSource.maccy.project.url} target="_blank" rel="noreferrer" className="text-[#1a0dab] hover:underline font-medium text-lg block">{profileData.openSource.maccy.project.name}</a>
                      <p className="text-sm text-gray-600 mt-2">{profileData.openSource.maccy.project.description}</p>
                    </div>
                  </div>

                  {/* People also search for */}
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-lg text-[#202124] mb-4 font-medium">People also search for</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "fun developer to work with",
                        "Coolest full-stack developer in India",
                        "Why everyone's favorite developer is the best to work with",
                        "Top-rated coding companion",
                        "Best teammate for any tech stack",
                        "Legendary bug fixer and code magician",
                      ].map((query, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-sm text-[#202124] hover:bg-gray-50 cursor-default transition-colors"
                        >
                          {query}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Knowledge Graph */}
                <div className="hidden lg:block min-w-[360px]">
                  <KnowledgeGraph data={profileData} images={profileData.images.slice(0, 4)} onImageClick={handleImageClick} />

                  {/* Achievements */}
                  <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm w-full lg:max-w-sm">
                    <h3 className="text-lg text-[#202124] mb-3 font-medium">Achievements</h3>
                    <div className="space-y-3">
                      {profileData.achievements.map((achievement, i) => (
                        <div key={i} className="pb-3 border-b last:border-0 border-gray-100">
                          <p className="text-sm text-[#4d5156]">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm w-full lg:max-w-sm">
                    <h3 className="text-lg text-[#202124] mb-3 font-medium">Specializations</h3>
                    <div className="space-y-2">
                      {profileData.specializations.map((spec, i) => (
                        <div key={i} className="py-2 border-b last:border-0 border-gray-100 text-sm text-[#4d5156] cursor-pointer hover:bg-gray-50 px-2 -mx-2">
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* People also ask / Interested In */}
                  <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm w-full lg:max-w-sm">
                    <h3 className="text-lg text-[#202124] mb-3 font-medium">Interests</h3>
                    <div className="space-y-2">
                      {profileData.interests.map((interest, i) => (
                        <div key={i} className="py-2 border-b last:border-0 border-gray-100 text-sm text-[#4d5156] cursor-pointer hover:bg-gray-50 px-2 -mx-2">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* --- TAB: IMAGES --- */}
            {activeTab === Tab.IMAGES && (
              <div className="w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-cols-5 gap-4">
                  {profileData.images.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(img);
                      }}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-white text-xs font-medium truncate">{img.title}</div>
                        <div className="text-white/80 text-[10px] truncate">{img.source}</div>
                      </div>
                    </div>
                  ))}
                  {/* Placeholder Images for grid effect */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`p-${i}`} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center text-gray-300">
                      <ImageIcon size={32} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- TAB: VIDEOS --- */}
            {activeTab === Tab.VIDEOS && (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileData.videos.map((video, i) => (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col h-full group"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative overflow-hidden bg-black aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            // Fallback to maxresdefault if hqdefault fails
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('maxresdefault')) {
                              target.src = video.thumbnail.replace('hqdefault', 'maxresdefault');
                            } else {
                              // Show placeholder if all fails
                              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="480" height="360"%3E%3Crect fill="%23000" width="480" height="360"/%3E%3Ctext fill="%23fff" font-family="sans-serif" font-size="40" dy="10.5" font-weight="400" x="50%25" y="50%25" text-anchor="middle"%3E▶%3C/text%3E%3C/svg%3E';
                            }
                          }}
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-red-600 rounded-full p-4">
                            <PlayCircle size={32} className="text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 p-4 flex flex-col">
                        <h3 className="text-base font-semibold text-[#1a0dab] group-hover:underline mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="text-xs text-[#5f6368] space-y-1">
                          <div className="font-medium text-[#202124]">Satyam Gupta</div>
                          <div>{video.views} • {video.date}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* --- TAB: NEWS --- */}
            {activeTab === Tab.NEWS && (
              <div className="max-w-2xl">
                {profileData.articles.map((article, i) => (
                  <div key={i} className="mb-6 border rounded-lg p-4 hover:shadow-sm transition-shadow bg-white">
                    <div className="flex gap-2 items-center mb-2">
                      <Newspaper size={16} className="text-gray-500" />
                      <span className="text-xs text-[#202124] font-medium">{article.source}</span>
                      <span className="text-xs text-[#5f6368]">• {article.date}</span>
                    </div>
                    <h3 className="text-[#1a0dab] text-lg hover:underline mb-2 font-medium">{article.title}</h3>
                    <p className="text-sm text-[#4d5156]">{article.snippet}</p>
                  </div>
                ))}
              </div>
            )}

            {/* --- TAB: PROJECTS --- */}
            {activeTab === Tab.PROJECTS && (
              <div className="w-full">
                {loadingProjects ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">Loading projects...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => {
                      const createdDate = new Date(project.createdAt);
                      const now = new Date();
                      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                      let timeAgo = '';
                      if (diffDays < 30) {
                        timeAgo = `${diffDays} days ago`;
                      } else if (diffDays < 365) {
                        const months = Math.floor(diffDays / 30);
                        timeAgo = `${months} month${months > 1 ? 's' : ''} ago`;
                      } else {
                        const years = Math.floor(diffDays / 365);
                        timeAgo = `${years} year${years > 1 ? 's' : ''} ago`;
                      }

                      return (
                        <div
                          key={i}
                          className="border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col h-full"
                        >
                          {/* Project Image */}
                          <a
                            href={`https://imlolman.github.io/${project.name}`}
                            target="_blank"
                            rel="noreferrer"
                            className="relative group overflow-hidden bg-white"
                          >
                            <img
                              src={project.imagePath}
                              alt={project.name}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" dy="10.5" font-weight="400" x="50%25" y="50%25" text-anchor="middle"%3E' + encodeURIComponent(project.name) + '%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </a>

                          {/* Project Info */}
                          <div className="flex-1 p-5 flex flex-col">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <a
                                href={`https://imlolman.github.io/${project.name}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1"
                              >
                                <h3 className="text-lg font-bold text-[#1a0dab] hover:underline mb-1 line-clamp-2">
                                  {project.name.replace(/-/g, ' ')}
                                </h3>
                              </a>
                              <a
                                href={project.htmlUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="View on GitHub"
                              >
                                <svg className="w-5 h-5 text-gray-700 hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            </div>

                            <p className="text-xs text-[#5f6368] mb-3">
                              Created {timeAgo}
                            </p>

                            <p className="text-sm text-[#4d5156] line-clamp-3 flex-1">
                              {project.description || 'No description available'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* --- TAB: MAPS --- */}
            {activeTab === Tab.MAPS && (
              <div className="w-full h-[60vh] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-400 flex flex-col items-center">
                  <MapPin size={48} className="mb-2 text-[#EA4335]" />
                  <p>India</p>
                </div>
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (Only on Home) */}
      {isHome && (
        <motion.footer
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-[#f2f2f2] text-[#70757a] text-sm mt-auto w-full"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
              e.preventDefault();
              const text = target.textContent?.trim();
              const funnyMessages: Record<string, string> = {
                'About': "You still want to know about me? Haven't you seen the entire page already? 😅",
                'Advertising': "Want to advertise on my portfolio? That's cute! But seriously, let's talk business 💼",
                'How Search works': "This isn't actually Google search silly! But if you want to know how MY portfolio works, check the GitHub repo 🤓",
                'Privacy': "Privacy? Don't worry, I'm not tracking you. This portfolio respects your privacy more than those cookie popups 🍪",
                'Terms': "Terms and Conditions: Be awesome, be respectful, and hire me if you like what you see 😎",
                'Settings': "Settings? What settings? This is a portfolio, not a spaceship control panel 🚀"
              };
              if (text === 'Business') {
                window.location.href = 'mailto:satyamforwork@gmail.com';
              } else if (text && funnyMessages[text]) {
                alert(funnyMessages[text]);
              }
            }
          }}
        >
          <div className="px-8 py-3 border-b border-[#dadce0]">India</div>
          <div className="px-8 py-3 flex flex-wrap justify-between gap-4">
            <div className="flex gap-6">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Advertising</a>
              <a href="#" className="hover:underline">Business</a>
              <a href="#" className="hover:underline">How Search works</a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Settings</a>
            </div>
          </div>
        </motion.footer>
      )}

      {/* Footer with funny messages */}
      {!isHome && (
        <>
          {/* Footer */}
          <footer className="bg-[#f2f2f2] text-[#70757a] text-sm w-full border-t border-[#e8eaed] mt-auto"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'A') {
                e.preventDefault();
                const text = target.textContent?.trim();
                const funnyMessages: Record<string, string> = {
                  'About': "You still want to know about me? Haven't you seen the entire page already? 😅",
                  'Advertising': "Want to advertise on my portfolio? That's cute! But seriously, let's talk business 💼",
                  'How Search works': "This isn't actually Google search silly! But if you want to know how MY portfolio works, check the GitHub repo 🤓",
                  'Privacy': "Privacy? Don't worry, I'm not tracking you. This portfolio respects your privacy more than those cookie popups 🍪",
                  'Terms': "Terms and Conditions: Be awesome, be respectful, and hire me if you like what you see 😎",
                  'Settings': "Settings? What settings? This is a portfolio, not a spaceship control panel 🚀"
                };
                if (text === 'Business') {
                  window.location.href = 'mailto:satyamforwork@gmail.com';
                } else if (text && funnyMessages[text]) {
                  alert(funnyMessages[text]);
                }
              }
            }}
          >
            <div className="px-8 py-4 border-b border-[#dadce0]">India</div>
            <div className="px-8 py-4 flex flex-wrap justify-between gap-4">
              <div className="flex gap-6">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Advertising</a>
                <a href="#" className="hover:underline">Business</a>
                <a href="#" className="hover:underline">How Search works</a>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Settings</a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;