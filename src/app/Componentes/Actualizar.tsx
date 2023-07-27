import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Persona } from '../Interfaces/IFormulario';
import { actualizarPersona, obtenerPersona,} from '../Firebase/promesas';


export const Actualizar = () => {
  const params = useParams();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [lugarGrabado, setLugarGrabado] = useState("");
  const [edad, setEdad] = useState(""); 
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rango, setRango] = useState(50);  
  const [horaEntrega, setHoraEntrega] = useState(""); 
  const [comentario, setComentario] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  const [errorLugarGrabado, setErrorLugarGrabado] = useState("")
  const [idPersona, setIdPersona] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errorHoraEntrega, setErrorHoraEntrega] = useState("")


  useEffect(() => {
    if (params.idPersona !== undefined) {
      obtenerPersona(params.idPersona).then((v) => {
        if (v != undefined && v.idPersona!= undefined) {
          setNombre(v.nombre);
          setApellido(v.apellido);
          setLugarGrabado(v.lugarGrabado);
          setEdad(v.edad.toString()); 
          setEmail(v.email);
          setTelefono(v.telefono.toString());
          setRango(v.rango);
          setHoraEntrega(v.horaEntrega); 
          setComentario(v.comentario);
          setIdPersona(v.idPersona);  
        }
      });
    }
  }, [params.idPersona]);

const actualizar = () => {

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

  if (edad.trim() === "") {
    setErrorEdad("Debe ingresar la edad");
    return;
  } else {
    const edadNumber = parseInt(edad);
    if (isNaN(edadNumber) || edadNumber <= 0) {
      setErrorEdad("Debe ingresar una edad válida y no negativa");
      return;
    }
    setEdad(edadNumber.toString());
    setErrorEdad("");
  }

  if (!lugarGrabado) {
    setErrorLugarGrabado("Debe seleccionar un lugar grabado");
    return;
  } else {
    setErrorLugarGrabado("");
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

  if (horaEntrega.trim() === "") {
    setErrorHoraEntrega("Debe seleccionar una hora de entrega");
    return;
  } else {
    setErrorHoraEntrega("");
  }

 const p: Persona = {
      nombre,
      apellido,
      lugarGrabado,
      edad: parseInt(edad),
      email,
      telefono: parseInt(telefono),
      rango,
      horaEntrega,
      comentario,
    };

    actualizarPersona(idPersona, p).then(() => {
      alert("Datos actualizados de " + nombre + " " + apellido);
      setUpdateSuccess(true); 
    });

    console.log(nombre);
    console.log(apellido);
    console.log(lugarGrabado);
    console.log(edad);
    console.log(email);
    console.log(telefono);
    console.log(rango)
    console.log(horaEntrega)
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

  const cambiarRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setLugarGrabado(event.target.value);
    setErrorLugarGrabado("");
  };

  const cambiarComentario = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(event.target.value);
  };

  return (
    <form><br />
      <h2>Actualice los datos necesarios </h2><br />
        <label>Nombre: </label><br />
        <input
          type="text"
          onChange={(e) => validarNombre(e.target.value)}
          value={nombre}
        /><br />
        <span>{errorNombre}</span><br />
      
        <label>Apellido: </label><br />
        <input
          type="text"
          onChange={(e) => validarApellido(e.target.value)}
          value={apellido}
        /><br />
        <span>{errorApellido}</span><br />
     
        <label>Edad: </label><br />
        <input
          type="number"
          onChange={(e) => setEdad(e.target.value)}
          value={edad}
        /><br />
          <span>{errorEdad}</span>
        <br />
        <label>Posicion Grabado</label><br />
        <input
          type="radio"
          id="lugarizquierda"
          name="lugarGrabado"
          value="izquierda"
          checked={lugarGrabado === "izquierda"}
          onChange={cambiarRadio}
        />
        <label htmlFor="lugarizquierda">Izquierda</label><br />
        <input
          type="radio"
          id="lugarderecha"
          name="lugarGrabado"
          value="derecha"
          checked={lugarGrabado === "derecha"}
          onChange={cambiarRadio}
        />
        <label htmlFor="lugarderecha">Derecha</label><br />
        <span>{errorLugarGrabado}</span><br />
        <label>Email: </label><br />
        <input
          type="email"
          onChange={(e) => validarEmail(e.target.value)}
          value={email}
        /><br />
        <span>{errorEmail}</span><br />
     
        <label>Teléfono: </label><br />
        <input
          type="tel"
          onChange={(e) => validarTelefono(e.target.value)}
          value={telefono}
        /><br />
        <span>{errorTelefono}</span><br />

        <label>Seleccionar tamaño de tabla:</label><br />
          <input
            type="range"
            min="30"
            max="100"
            value={rango}
            onChange={(e) => setRango(parseInt(e.target.value))}
          /><br />
          <span>{rango}</span><br />
      
        <label>Hora de entrega:</label><br />
        <input
          type="time"
          onChange={(e) => setHoraEntrega(e.target.value)}
          value={horaEntrega}
        /><br />
        <span>{errorHoraEntrega}</span><br />

      <label>Comentario: </label><br />
      <textarea
          rows={4}
          cols={50}
          value={comentario}
          onChange={cambiarComentario}
        /><br />
      <button type='button' onClick={actualizar} disabled={isLoading}>
        {isLoading ? "Actualizando..." : "Actualizar"}
      </button>
      {updateSuccess && <div>Actualización exitosa</div>}
    </form>
  );
};