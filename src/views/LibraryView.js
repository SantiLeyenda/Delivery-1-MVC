import React, { useEffect, useState } from "react";
import LibroController from "../controllers/LibroController";
import EstudianteController from "../controllers/EstudianteController";

const LibraryView = ({ user }) => {
  
  const [libros, setLibros] = useState([]);
  const [message, hacerMensajito] = useState("");

  // Esta funcion obtiene todos los libros de la base de datos por el controlador
  useEffect(() => {
    const agarrarLibro = async () => {
      const librosData = await LibroController.obtenerLibros();
      setLibros(librosData);
    };
    agarrarLibro();
  }, []);

  // Esta funcion maneja el evento de pedir un libro por el controlador
  const pedirLibros = async (id, titulo) => {
    const resultado = await EstudianteController.solicitarLibro(user, id, titulo);
    hacerMensajito(resultado.message);
    setLibros(await LibroController.obtenerLibros());
  };

  // Esta funcion maneja el evento de devolver un libro por el controlador
  const libroDevolver = async (id) => {
    const resultado = await EstudianteController.devolverLibro(id);
    hacerMensajito(resultado.message);
    setLibros(await LibroController.obtenerLibros());
  };

  return (
    <div>
      <h2>Bienvenido, {user.nombre} ({user.rol})</h2>
      {message && <p>{message}</p>}

      <h3>Libros disponibles</h3>
      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            {libro.titulo} - {libro.autor} ({libro.genero}) [{libro.estado}]
            
            {user.rol === "estudiante" && libro.estado === "Disponible" && (
              <button onClick={() => pedirLibros(libro.id, libro.titulo)}>Pedir</button>
            )}

            {user.rol === "estudiante" && libro.estado === "Prestado" && libro.usuario === user.nombre && (
              <button onClick={() => libroDevolver(libro.id)}>Devolver</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryView;
