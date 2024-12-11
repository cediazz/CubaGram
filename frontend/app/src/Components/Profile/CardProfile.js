import PublicationsProfile from "./PublicationsProfile"
import React, { useState } from 'react'
import ConfigurationProfile from "./ConfigurationProfile";


function CardProfile(props) {
    
  const user_id = localStorage.getItem('user_id')
  const [activeTab, setActiveTab] = useState('settings'); // Estado para la pestaña activa
  
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
                Publicaciones
              </a>
            </li>
            {props.userData.id == user_id &&
            <li className="nav-item">
              <a
                className={activeTab === 'settings' ? 'nav-link active' : 'nav-link'}
                onClick={() => handleTabClick('settings')}
                href="#"
              >
                Configuración
              </a>
            </li>}
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className={activeTab === 'activity' ? 'tab-pane active' : 'tab-pane'} id="activity">
              <PublicationsProfile />
            </div>
            {props.userData.id == user_id &&
              <div className={activeTab === 'settings' ? 'tab-pane active' : 'tab-pane'} id="settings">
            <ConfigurationProfile setLoading={props.setLoading} setUserData={props.setUserData} userData={props.userData} />
            </div>}
          </div>
        </div>
      </div>
      
     
    );
  }
export default CardProfile
