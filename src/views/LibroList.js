import React, { useEffect, useState } from "react";
import LibroController from "../controllers/LibroController";

const LibroList = () => {
  const [libros, setLibros] = useState([]);

  // Esta funcion obtiene todos los libros de la base de datos por el controlador
  useEffect(() => {
    const agarrarLibros = async () => {
      const librosData = await LibroController.obtenerLibros();
      setLibros(librosData);
    };
    agarrarLibros();
  }, []);

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {libros.length > 0 ? (
          libros.map((libro) => (
            <li key={libro.id}>
              {libro.titulo} - {libro.autor} ({libro.genero}) [{libro.estado}]
            </li>
          ))
        ) : (
          <p>No hay libros disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default LibroList;
