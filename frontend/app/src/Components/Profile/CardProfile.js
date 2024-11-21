import PublicationsProfile from "./PublicationsProfile"
import React, { useState } from 'react'
import ConfigurationProfile from "./ConfigurationProfile";

function CardProfile() {
    const [activeTab, setActiveTab] = useState('activity'); // Estado para la pestaña activa
  
    const handleTabClick = (tab) => {
      setActiveTab(tab); // Cambia la pestaña activa
    };
  
    return (
      <div className="card">
        <div className="card-header p-2">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className={activeTab === 'activity' ? 'nav-link active' : 'nav-link'}
                onClick={() => handleTabClick('activity')}
                href="#"
              >
                Actividad
              </a>
            </li>
            <li className="nav-item">
              <a
                className={activeTab === 'settings' ? 'nav-link active' : 'nav-link'}
                onClick={() => handleTabClick('settings')}
                href="#"
              >
                Configuración
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className={activeTab === 'activity' ? 'tab-pane active' : 'tab-pane'} id="activity">
              <PublicationsProfile />
            </div>
            <div className={activeTab === 'settings' ? 'tab-pane active' : 'tab-pane'} id="settings">
            <ConfigurationProfile />
            </div>
          </div>
        </div>
      </div>
    );
  }
export default CardProfile
