import React from "react";

const SidebarMenu = ({ activeSection, setActiveSection }) => {
  return (
    <div className="admin-sidebar">
      <ul className="menu">
        <li
          className={activeSection === "inventario" ? "active" : ""}
          onClick={() => setActiveSection("inventario")}
        >
          Gestión de Inventario
        </li>
        <li
          className={activeSection === "userManagement" ? "active" : ""}
          onClick={() => setActiveSection("userManagement")}
        >
          Gestión de Usuarios
        </li>
        <li
          className={activeSection === "orderManagement" ? "active" : ""}
          onClick={() => setActiveSection("orderManagement")}
        >
          Gestión de Pedidos
        </li>
        <li
          className={activeSection === "adminanuncios" ? "active" : ""}
          onClick={() => setActiveSection("adminanuncios")}
        >
          Anuncios y Notificaciones
        </li>
        <li
          className={activeSection === "Estadisticas" ? "active" : ""}
          onClick={() => setActiveSection("Estadisticas")}
        >
          Estadísticas y Reportes
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;

