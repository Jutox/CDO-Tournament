import React from 'react';
import { SidebarData } from '../Service/SidebarData';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column" style={{ minHeight: '100vh' }}>
          {SidebarData.map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink
                to={item.path}
                className="nav-link text-white"
                activeClassName="active"
                style={{
                  fontSize: '20px',
                  marginBottom: '10px',
                  textAlign: 'center', // Centra el texto horizontalmente
                }}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;