// PostHog Analytics Event Names
export const ANALYTICS_EVENTS = {
    // Page View Events
    PAGE_VIEW_HOME: 'page_view_home',
    PAGE_VIEW_RESULTS: 'page_view_results',

    // Tab Navigation Events
    TAB_CLICKED_AI_MODE: 'tab_clicked_ai_mode',
    TAB_CLICKED_ALL: 'tab_clicked_all',
    TAB_CLICKED_IMAGES: 'tab_clicked_images',
    TAB_CLICKED_VIDEOS: 'tab_clicked_videos',
    TAB_CLICKED_NEWS: 'tab_clicked_news',
    TAB_CLICKED_PROJECTS: 'tab_clicked_projects',

    // Search Events
    SEARCH_PERFORMED: 'search_performed',
    SEARCH_VOICE_CLICKED: 'search_voice_clicked',
    SEARCH_CAMERA_CLICKED: 'search_camera_clicked',
    SEARCH_CLEARED: 'search_cleared',

    // Settings & Menu Events
    SETTINGS_MENU_OPENED: 'settings_menu_opened',
    SETTINGS_HOMEPAGE_TOGGLED: 'settings_homepage_toggled',
    APPS_MENU_OPENED: 'apps_menu_opened',
    PROFILE_MENU_OPENED: 'profile_menu_opened',

    // Google Apps Easter Eggs
    GOOGLE_APP_CLICKED: 'google_app_clicked',

    // Image Interactions
    IMAGE_CLICKED: 'image_clicked',
    IMAGE_VIEWER_OPENED: 'image_viewer_opened',
    IMAGE_VIEWER_CLOSED: 'image_viewer_closed',
    IMAGE_NEXT_CLICKED: 'image_next_clicked',
    IMAGE_PREVIOUS_CLICKED: 'image_previous_clicked',
    IMAGE_KEYBOARD_NAVIGATION: 'image_keyboard_navigation',
    IMAGE_VISIT_CLICKED: 'image_visit_clicked',
    IMAGE_SHARE_CLICKED: 'image_share_clicked',

    // Social Media & Contact
    SOCIAL_LINK_CLICKED: 'social_link_clicked',
    EMAIL_CLICKED: 'email_clicked',
    RESUME_DOWNLOADED: 'resume_downloaded',
    LINKEDIN_CLICKED: 'linkedin_clicked',
    GITHUB_CLICKED: 'github_clicked',
    PORTFOLIO_CLICKED: 'portfolio_clicked',
    MEDIUM_CLICKED: 'medium_clicked',
    STACKOVERFLOW_CLICKED: 'stackoverflow_clicked',

    // Knowledge Graph Interactions
    KNOWLEDGE_GRAPH_EMAIL_CLICKED: 'knowledge_graph_email_clicked',
    KNOWLEDGE_GRAPH_LINKEDIN_CLICKED: 'knowledge_graph_linkedin_clicked',
    KNOWLEDGE_GRAPH_GITHUB_CLICKED: 'knowledge_graph_github_clicked',
    KNOWLEDGE_GRAPH_WEBSITE_CLICKED: 'knowledge_graph_website_clicked',
    KNOWLEDGE_GRAPH_MEDIUM_CLICKED: 'knowledge_graph_medium_clicked',
    KNOWLEDGE_GRAPH_IMAGE_CLICKED: 'knowledge_graph_image_clicked',

    // Project Interactions
    PROJECT_CLICKED: 'project_clicked',
    PROJECT_GITHUB_CLICKED: 'project_github_clicked',
    FEATURED_PROJECT_CLICKED: 'featured_project_clicked',
    OPEN_SOURCE_PROJECT_CLICKED: 'open_source_project_clicked',
    MACCY_PROJECT_CLICKED: 'maccy_project_clicked',

    // Video Interactions
    VIDEO_CLICKED: 'video_clicked',

    // News/Article Interactions
    NEWS_ARTICLE_CLICKED: 'news_article_clicked',

    // Footer Interactions
    FOOTER_LINK_CLICKED: 'footer_link_clicked',
    FOOTER_BUSINESS_CLICKED: 'footer_business_clicked',

    // Logo Interactions
    LOGO_CLICKED: 'logo_clicked',

    // Button Interactions
    GOOGLE_SEARCH_BUTTON_CLICKED: 'google_search_button_clicked',
    FEELING_LUCKY_BUTTON_CLICKED: 'feeling_lucky_button_clicked',
    AI_MODE_GO_BACK_CLICKED: 'ai_mode_go_back_clicked',

    // Special Sections
    ACHIEVEMENT_VIEWED: 'achievement_viewed',
    SPECIALIZATION_VIEWED: 'specialization_viewed',
    INTEREST_VIEWED: 'interest_viewed',
    PEOPLE_ALSO_SEARCH_VIEWED: 'people_also_search_viewed',

    // Badge Clicks
    BADGE_CLICKED: 'badge_clicked',
    CERTIFICATION_VIEWED: 'certification_viewed',

    // External Redirects
    EXTERNAL_GOOGLE_SEARCH: 'external_google_search',
    GOOGLE_ACCOUNT_CLICKED: 'google_account_clicked',
} as const;

export type AnalyticsEvent = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];

