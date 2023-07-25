'use client'
import React, { useState, ChangeEvent } from 'react';
import { Persona } from '../Interfaces/IFormulario';
import { registrarPersona } from '../Firebase/promesas';

export const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [lugarGrabado, setLugarGrabado] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorLugarGrabado, setErrorLugarGrabado] = useState("")
  const [errorEdad, setErrorEdad] = useState("");


  const registrar = () => {
    if (nombre.trim() === "") {
      setErrorNombre("No valen espacios en blanco");
      return;
    } else {
      setNombre(nombre.trim());
    }

    if (apellido.trim() === "") {
      setErrorApellido("No valen espacios en blanco");
      return;
    } else {
      setApellido(apellido.trim());
    }
    if (!lugarGrabado) {
      setErrorLugarGrabado("Debe seleccionar un lugar grabado");
      return;
    }
    if (edad.trim() === "") {
      setErrorEdad("Debe ingresar la edad");
      return;
    } else {
      const edadNumber = parseInt(edad);
      if (isNaN(edadNumber) || edadNumber < 0) {
        setErrorEdad("Debe ingresar una edad válida y no negativa");
        return;
      }
      setEdad(edadNumber.toString());
      setErrorEdad("");
    }

    if (email.trim() === "") {
      setErrorEmail("Debe ingresar un email válido");
      return;
    } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setErrorEmail("Debe ingresar un email válido");
      return;
    } else {
      setErrorEmail("");
    }
    if (!telefono.match(/^\d{9}$/)) {
      setErrorTelefono("Debe ingresar un número de teléfono válido (9 dígitos)");
      return;
    } else {
      setErrorTelefono("");
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

    registrarPersona(p);
    console.log(nombre);
    console.log(apellido);
    console.log(lugarGrabado);
    console.log(edad);
    console.log(email);
    console.log(telefono);
    console.log(comentario);
    alert("Se registro a " + nombre + " " + apellido);

    // Limpiar campos después del registro
    setNombre("");
    setApellido("");
    setLugarGrabado("");
    setEdad("");
    setEmail("");
    setTelefono("");
    setComentario("");
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
  };

  const cambiarComentario = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(event.target.value);
  };
  return (
    
    <form><br />
      <h2>Ingrese los datos para la solicitud de su producto </h2><br />
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
     
        <label>Comentarios: </label><br />
      <textarea
          rows={4}
          cols={50}
          value={comentario}
          onChange={cambiarComentario}
        /><br />
     
      
      <button type='button' onClick={registrar}>Registrar</button>
    </form>
  );
};