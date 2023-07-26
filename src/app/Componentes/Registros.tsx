import React, { useEffect, useState } from "react";
import { obtenerPersonas } from "../Firebase/promesas";
import { Persona } from "../Interfaces/IFormulario";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const formatFecha = (fechaEntrega: Date | null) => {
  if (!fechaEntrega) return ""; // Si la fecha es nula o indefinida, devuelve una cadena vacía
  
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Registros = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    obtenerPersonas().then((listado) => {
      console.log("Ya estoy listo");
      console.log(listado);
      setPersonas(listado);
    });
  }, []);

  const renderizarDatos = () => {
    if (personas.length === 0) {
      return (
        <tr>
          <td colSpan={9}>No hay registros disponibles</td>
        </tr>
      );
    }

    return personas.map((p) => (
      <tr key={p.idPersona}>
        <td>{p.nombre}</td>
        <td>{p.apellido}</td>
        <td>{p.lugarGrabado}</td>
        <td>{p.edad}</td>
        <td>{p.email}</td>
        <td>{p.telefono}</td>
        <td>{p.fechaEntrega ? formatFecha(p.fechaEntrega) : ""}</td>
        <td>{p.horaEntrega}</td>
        <td>{p.comentario}</td>
        <td>
          <Link to={"/actualizar/" + p.idPersona}>Actualizar</Link>
        </td>
        <td>
          <Link to={"/eliminar/" + p.idPersona}>Eliminar</Link>
        </td>
      </tr>
    ));
  };

  return (
    <table>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Posicion Grabado</th>
        <th>Edad</th>
        <th>Email</th>
        <th>Telefono</th>
        <th>Fecha De Entrega</th>
        <th>Hora De Entrega</th>
        <th>Comentario</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>
      {renderizarDatos()}
    </table>
  );
};
