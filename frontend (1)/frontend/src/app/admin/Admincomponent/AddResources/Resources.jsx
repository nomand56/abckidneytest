
import { useEffect, useState } from 'react';
import PlayerAd from '../AddLectures/PlayerAd.jsx';
import QuizSection from '../Quiz/index.jsx';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('profile');6
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700 ">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'profile' ? 'border-blue-500' : ''
              }`}
            id="profile-tab"
            data-tabs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected={activeTab === 'profile'}
            onClick={() => handleTabClick('profile')}
          >
            Lectures
          </button>
        </li>
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'dashboard' ? 'border-blue-500' : ''
              }`}
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected={activeTab === 'dashboard'}
            onClick={() => handleTabClick('dashboard')}
          >
            Quizes
          </button>
        </li>
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'settings' ? 'border-blue-500' : ''
              }`}
            id="settings-tab"
            data-tabs-target="#settings"
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected={activeTab === 'settings'}
            onClick={() => handleTabClick('settings')}
          >
            Flashcards
          </button>
        </li>
     
      </ul>

      <div id="default-tab-content">
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? 'block' : 'hidden'
            }`}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <PlayerAd/>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? 'block' : 'hidden'
            }`}
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <QuizSection/>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? 'block' : 'hidden'
            }`}
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the <strong>Settings</strong> tabs associated content. Clicking
            another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control
            the content visibility and styling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;