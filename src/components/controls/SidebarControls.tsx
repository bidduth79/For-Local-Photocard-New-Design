import React from 'react';
import ContentEditor from './news/ContentEditor';
import DesignSettings from './news/DesignSettings';
import { PatternSettings } from './news/PatternSettings';
import AdvancedColorSettings from './news/AdvancedColorSettings';
import BrandSettings from './news/BrandSettings';
import { ImageSettings } from './news/ImageSettings';
import WatermarkSettings from './news/WatermarkSettings';
import { useAppContext } from '../../context/AppContext';

export default function SidebarControls() {
  const state = useAppContext();

  return (
    <>
      <div id="panel-content-editor">
        <ContentEditor />
      </div>
      <div id="panel-design-settings">
        <DesignSettings />
      </div>
      
      {/* Hide on desktop, show only on mobile (desktop moved to right) */}
      <div className="lg:hidden space-y-6">
        <ImageSettings />
        <div id="panel-pattern-settings-mobile">
          <PatternSettings />
        </div>
      </div>

      <div id="panel-advanced-colors">
        <AdvancedColorSettings />
      </div>
      <div id="panel-brand-settings">
        <BrandSettings />
      </div>
      <div id="panel-watermark-settings">
        <WatermarkSettings />
      </div>
    </>
  );
}
