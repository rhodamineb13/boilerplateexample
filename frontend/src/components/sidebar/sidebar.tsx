// Updated Sidebar component with smooth transitions
import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';

type MenuItem = {
  title: string;
  icon: string;
  path?: string;
  subItems?: MenuItem[];
};

type SidebarProps = {
  collapsed: boolean;
  onHover?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onHover }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [transitioning, setTransitioning] = useState<Record<string, boolean>>({});
  
  // Menu configuration
  const menuItems: MenuItem[] = [
    { path: '/home', title: 'Home', icon: 'fa-house' },
    { path: '/tasks', title: 'Tasks', icon: 'fa-clipboard-list' },
    { path: '/profile', title: 'Profile', icon: 'fa-user'},
    { path: '/employees', title: 'Employees', icon: 'fa-users'},
    { path: '/surveyors', title: 'Surveyor', icon: 'fa-magnifying-glass'}
  ];

  // Check if a menu item is active
  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  // Toggle submenu expansion with animation
  const toggleExpanded = (title: string) => {
    setTransitioning(prev => ({ ...prev, [title]: true }));
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setTransitioning(prev => ({ ...prev, [title]: false }));
    }, 300);
  };

  // Automatically expand active submenu
  useEffect(() => {
    const newExpandedItems: Record<string, boolean> = {};
    
    menuItems.forEach(item => {
      if (item.subItems) {
        const isGroupActive = item.subItems.some(subItem => isActive(subItem.path!));
        if (isGroupActive) {
          newExpandedItems[item.title] = true;
        }
      }
    });

    setExpandedItems(newExpandedItems);
  }, [location.pathname]);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <Nav className="flex-column gap-2">
          <div className="main-nav" style={{textAlign: 'center', backgroundColor: '#002f5f', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            {!collapsed && (<h5 style={{color: 'white', margin: 0}}>MAIN NAVIGATION</h5>)}            
          </div>
          {menuItems.map((item) => {
            if (item.subItems) {
              const isExpanded = expandedItems[item.title];
              const isTransitioning = transitioning[item.title];
              
              return (
                <div key={item.title}>
                  <Nav.Link
                    onClick={() => toggleExpanded(item.title)}
                    className={`sidebar-link ${isTransitioning ? 'transitioning' : ''}`}
                  >
                    <div className="link-content">
                      <i className={`fa-solid ${item.icon}`}></i>
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
                          <i 
                            className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} ms-auto transition-icon`}
                          ></i>
                        </>
                      )}
                      {collapsed && <div className="tooltip">{item.title}</div>}
                    </div>
                  </Nav.Link>

                  {!collapsed && (
                    <div 
                      className={`submenu-container ${isExpanded ? 'expanded' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                      style={{
                        height: isExpanded ? 'auto' : 0,
                        overflow: isTransitioning ? 'hidden' : undefined
                      }}
                    >
                      <div className="submenu">
                        {item.subItems.map((subItem) => (
                          <Nav.Link
                            key={subItem.path}
                            onClick={() => navigate(subItem.path!)}
                            className={`sidebar-link sub-item ${isActive(subItem.path!) ? 'active-sub' : ''}`}
                          >
                            <div className="link-content">
                              <i className={`fa-solid ${subItem.icon}`}></i>
                              <span className="submenu-text">{subItem.title}</span>
                            </div>
                          </Nav.Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <Nav.Link
                  key={item.path}
                  onClick={() => navigate(item.path!)}
                  className={`sidebar-link ${isActive(item.path!) ? 'active' : ''}`}
                >
                  <div className="link-content">
                    <i className={`fa-solid ${item.icon}`}></i>
                    {!collapsed && <span>{item.title}</span>}
                    {collapsed && <div className="tooltip">{item.title}</div>}
                  </div>
                </Nav.Link>
              );
            }
          })}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;