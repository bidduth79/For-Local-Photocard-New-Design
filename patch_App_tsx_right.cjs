const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `      </div>

      <FullscreenPreviewModal `;

const rightCol = `
        {/* Right Content - Extra Controls (Sticky on Desktop) */}
        <div className="hidden lg:flex lg:order-3 lg:col-span-3 flex-col h-[calc(100vh-120px)] relative sticky top-24 z-30">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-24 pr-2">
            <RightSidebarControls />
          </div>
        </div>
      </div>

      <FullscreenPreviewModal `;

appTsx = appTsx.replace(targetStr, rightCol);

if(!appTsx.includes('RightSidebarControls')) {
  console.log("Failed to replace");
}

fs.writeFileSync('src/App.tsx', appTsx);
