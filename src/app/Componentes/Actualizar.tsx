import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Persona } from '../Interfaces/IFormulario';
import { actualizarPersona, obtenerPersona, eliminarPersona } from '../Firebase/promesas';


export const Actualizar = () => {
  const params = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [lugarGrabado, setLugarGrabado] = useState('');
  const [edad, setEdad] = useState(''); 
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const [idPersona, setIdPersona] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (params.idPersona !== undefined) {
      obtenerPersona(params.idPersona).then((v) => {
        if (v !== undefined) {
          setNombre(v.nombre);
          setApellido(v.apellido);
          setLugarGrabado(v.lugarGrabado);
          setEdad(v.edad.toString()); 
          setEmail(v.email);
          setTelefono(v.telefono.toString()); 
          setComentario(v.comentario);
          if (v.idPersona) {
            setIdPersona(v.idPersona);
          }
        }
      });
    }
  }, [params.idPersona]);
const registrar = async() => {

  if (nombre.trim() === "") {
    setErrorNombre("No valen espacios en blanco");
  } else {
    setNombre(nombre.trim());
  }

  if (apellido.trim() === "") {
    setErrorApellido("No valen espacios en blanco");
  } else {
    setApellido(apellido.trim());
  }

  if (email.trim() === "") {
    setErrorEmail("Debe ingresar un email válido");
  } else {
    setEmail(email.trim());
  }

  if (telefono.trim() === "") {
    setErrorTelefono("Debe ingresar un número de teléfono válido");
  } else {
    setTelefono(telefono.trim());
  }

 
  const p: Persona = {
    nombre,
    apellido,
    lugarGrabado,
    edad: parseInt(edad),
    email,
    telefono: parseInt(telefono),
    comentario,
  };

  try {
    await actualizarPersona(idPersona, p);
    alert("Datos actualizados de " + nombre + " " + apellido);
  } catch (error) {
    console.error("Error al actualizar persona:", error);
    alert("Hubo un error al actualizar los datos. Por favor, inténtalo de nuevo.");
  }

  console.log(nombre);
  console.log(apellido);
  console.log(lugarGrabado);
  console.log(edad);
  console.log(email);
  console.log(telefono);
  console.log(comentario);
};

  const validarNombre = (valor:string) => {
    setNombre(valor);
    if (valor.length < 3) {
      setErrorNombre("Debe tener más de 3 letras");
    } else {
      setErrorNombre("");
    }
  };

  const validarApellido = (valor:string) => {
    setApellido(valor);
    if (valor.length < 3) {
      setErrorApellido("Debe tener más de 3 letras");
    } else {
      setErrorApellido("");
    }
  };

  const validarEmail = (valor:string) => {
    setEmail(valor);
    if (!valor.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setErrorEmail("Debe ingresar un email válido");
    } else {
      setErrorEmail("");
    }
  };

  const validarTelefono = (valor: string) => {
    setTelefono(valor);
    if (!valor.match(/^\d{9}$/)) {
      setErrorTelefono("Debe ingresar un número de teléfono válido (9 dígitos)");
    } else {
      setErrorTelefono("");
    }
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLugarGrabado(event.target.value);
  };

  const handleComentarioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(event.target.value);
  };

  const eliminarPersonaDB = async (idPersona: string) => {
    try {
      await eliminarPersona(idPersona);
    } catch (error) {
      console.error("Error al eliminar persona:", error);
      alert("Hubo un error al eliminar la persona. Por favor, inténtalo de nuevo.");
    }
  };


  return (
    
    <form><br />
      <h2>Actualice los datos necesarios </h2><br />
      <div className="mb-4">
        <label>Nombre: </label><br />
        <input
          type="text"
          onChange={(e) => validarNombre(e.target.value)}
          value={nombre}
        /><br />
        <span>{errorNombre}</span><br />
      </div>
      <div className="mb-4">
        <label>Apellido: </label><br />
        <input
          type="text"
          onChange={(e) => validarApellido(e.target.value)}
          value={apellido}
        /><br />
        <span>{errorApellido}</span><br />
      </div>
      <div className="mb-4">
        <label>Edad: </label><br />
        <input
          type="number"
          onChange={(e) => setEdad(e.target.value)}
          value={edad}
        /><br />
        <br />
      </div>
      <div className="mb-4">
      <label>Posicion Grabado</label><br />
        <input
          type="radio"
          id="lugarizquierda"
          name="lugarGrabado"
          value="izquierda"
          checked={lugarGrabado === "izquierda"}
          onChange={handleRadioChange}
        />
        <label htmlFor="lugarizquierda">Izquierda</label><br />
        <input
          type="radio"
          id="lugarderecha"
          name="lugarGrabado"
          value="derecha"
          checked={lugarGrabado === "derecha"}
          onChange={handleRadioChange}
        />
        <label htmlFor="lugarderecha">Derecha</label><br />
      </div>
      <div className="mb-4">
        <label>Email: </label><br />
        <input
          type="email"
          onChange={(e) => validarEmail(e.target.value)}
          value={email}
        /><br />
        <span>{errorEmail}</span><br />
      </div>
      <div className="mb-4">
        <label>Teléfono: </label><br />
        <input
          type="tel"
          onChange={(e) => validarTelefono(e.target.value)}
          value={telefono}
        /><br />
        <span>{errorTelefono}</span><br />
      </div>
      <div className="mb-4">
        <label>Comentarios: </label><br />
      <textarea
          rows={4}
          cols={50}
          value={comentario}
          onChange={handleComentarioChange}
        /><br />
      </div>
      
      <button type='button' onClick={registrar} disabled={isLoading}>
        {isLoading ? "Actualizando..." : "Actualizar"}
      </button>
      <button type='button' onClick={() => eliminarPersonaDB(idPersona)} disabled={isLoading}>
        {isLoading ? "Eliminando..." : "Eliminar"}
      </button>
      {updateSuccess && <div>Actualización exitosa</div>}
    </form>
  );
};