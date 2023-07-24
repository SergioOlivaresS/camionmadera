import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPersona, eliminarPersona } from '../Firebase/promesas';
import { Persona } from '../Interfaces/IFormulario'; 

export const Eliminar = () => {
  const { idPersona } = useParams();
  const navigate = useNavigate();

  const [persona, setPersona] = React.useState<Persona | null>(null); 

  React.useEffect(() => {
    if (idPersona) {
      obtenerPersona(idPersona).then((v: Persona | undefined) => { 
        if (v !== undefined) {
          setPersona(v);
        }
      });
    }
  }, [idPersona]);


  const handleEliminar = async () => {
    try {
      if (idPersona) {
        await eliminarPersona(idPersona);
        alert('Persona eliminada exitosamente.');
        navigate('/registros');
      } else {
        alert('Error: No se encontró el ID de la persona.');
      }
    } catch (error) {
      console.error('Error al eliminar persona:', error);
      alert('Hubo un error al eliminar la persona. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCancelar = () => {
    navigate('/registros');
  };

  if (!persona) {
    return <div>Cargando...</div>;
  }

  return (
    <div><br />
      <h2>Detalles de la persona a eliminar:</h2><br />
      <p>Nombre: {persona.nombre}</p>
      <p>Apellido: {persona.apellido}</p>
      <p>Edad:{persona.edad}</p>
      <p>Email:{persona.email}</p>
      {/* Mostrar otros campos para los detalles de la persona (lugarGrabado, edad, email, telefono, etc.) */}
      
      <button onClick={handleEliminar}>Confirmar Eliminación</button>
      <button onClick={handleCancelar}>Cancelar</button>
    </div>
  );
};
