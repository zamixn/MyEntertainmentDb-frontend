import React from "react";
import * as ViewportProvider from '../ViewportProvider'
import SidebarFull from './SidebarFull'
import SidebarCollapsed from './SidebarCollapsed'
import * as Constants from '../../Tools/Constants'

const MyComponent = () => {
    const { width } = ViewportProvider.UseViewport();
    const breakpoint = Constants.BREAKPOINT_WIDTH;

    return width < breakpoint ? <SidebarCollapsed /> : <SidebarFull />;
};

export default function Sidebar() {
    return (
      <ViewportProvider.ViewportProvider>
        <MyComponent />
      </ViewportProvider.ViewportProvider>
    );
  }