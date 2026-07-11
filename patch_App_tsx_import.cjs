const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

if (!appTsx.includes("import RightSidebarControls")) {
  appTsx = appTsx.replace(
    `import SidebarControls from './components/controls/SidebarControls';`,
    `import SidebarControls from './components/controls/SidebarControls';\nimport RightSidebarControls from './components/controls/RightSidebarControls';`
  );
  fs.writeFileSync('src/App.tsx', appTsx);
}
