import React, { useEffect, useState } from "react";
import UserController from "../controllers/UserController";

const UserSelection = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  // Esta funcion obtiene todos los usuarios de la base de datos por el controlador
  useEffect(() => {
    const agarrarUsuarios = async () => {
      const usersData = await UserController.obtenerUsuarios();
      console.log("Usuarios obtenidos desde Firebase:", usersData); 
      setUsers(usersData);
    };
    agarrarUsuarios();
  }, []);

  // Esto es para ver y poder seleccionar un usuario
  return (
    <div>
      <h2>Escoge un usuario</h2>

      {users.length === 0 ? <p>Cargando usuarios...</p> : null}

      {["profesor", "administrador", "estudiante"].map((role) => (
        <div key={role}>
          <h3>{role.charAt(0).toUpperCase() + role.slice(1)}s</h3>
          {users
            .filter(user => user.rol === role)
            .map((user) => (
              <button key={user.id} onClick={() => onSelectUser(user)}>
                {user.nombre}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default UserSelection;
