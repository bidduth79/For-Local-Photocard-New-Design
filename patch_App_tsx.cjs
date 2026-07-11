const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

appTsx = appTsx.replace(
  `import SidebarControls from './components/controls/SidebarControls';`,
  `import SidebarControls from './components/controls/SidebarControls';\nimport RightSidebarControls from './components/controls/RightSidebarControls';`
);

appTsx = appTsx.replace(
  `<div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-8 max-w-[1400px] mx-auto w-full relative">`,
  `<div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:px-6 xl:gap-8 xl:px-8 lg:py-8 max-w-[1600px] mx-auto w-full relative">`
);

appTsx = appTsx.replace(
  `<div className="order-2 lg:order-1 lg:col-span-5 flex flex-col h-[500px] lg:h-[calc(100vh-120px)] relative">`,
  `<div className="order-2 lg:order-1 lg:col-span-4 flex flex-col h-[500px] lg:h-[calc(100vh-120px)] relative">`
);

appTsx = appTsx.replace(
  `<div className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-center justify-start lg:sticky lg:top-24 z-30 h-fit">`,
  `<div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-start lg:sticky lg:top-24 z-30 h-fit">`
);

const rightCol = `
        {/* Right Content - Extra Controls (Sticky on Desktop) */}
        <div className="hidden lg:flex lg:order-3 lg:col-span-3 flex-col h-[calc(100vh-120px)] relative sticky top-24 z-30">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-24 pr-2">
            <RightSidebarControls />
          </div>
        </div>
      </div>
      <FullscreenPreviewModal 
`;

appTsx = appTsx.replace(
  `      </div>\n      <FullscreenPreviewModal `,
  rightCol
);

fs.writeFileSync('src/App.tsx', appTsx);
