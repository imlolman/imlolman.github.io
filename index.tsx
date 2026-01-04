import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostHogProvider } from 'posthog-js/react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PostHogProvider
      apiKey='phc_wuA7qWm2sbpMfXCfzqEykCanpOzxG9Yl1pOHxPNCupO'
      options={{
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24',
        capture_exceptions: true, // This enables capturing exceptions using Error Tracking
        debug: false,
      }}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
