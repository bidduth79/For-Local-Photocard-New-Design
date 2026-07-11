import React from 'react';
import { PatternSettings } from './news/PatternSettings';
import { ImageSettings } from './news/ImageSettings';
import { useAppContext } from '../../context/AppContext';

export default function RightSidebarControls() {
  const state = useAppContext();
  
  return (
    <>
      <ImageSettings />
      <div id="panel-pattern-settings-desktop">
        <PatternSettings />
      </div>
    </>
  );
}
