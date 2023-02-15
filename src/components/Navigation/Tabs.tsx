import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Tabs({ tabs, darkMode }) {
  return (
    <div className="block">
      <nav
        className={`relative z-0 flex divide-x ${
          darkMode ? "divide-darkQuin" : "divide-gray-300"
        } rounded-lg shadow`}
        aria-label="Tabs"
      >
        {tabs &&
          tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={tab.action}
              className={classNames(
                tab.current ? "text-primary" : "text-secondary",
                darkMode
                  ? "bg-darkTert hover:bg-darkSec"
                  : "bg-white hover:bg-gray-50",
                darkMode && !tab.current ? "text-altSecondary" : "",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-[104px] flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-primary" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
      </nav>
    </div>
  );
}

export default Tabs;
