'use client'
import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <nav>
        <Link to={"/"}>Inicio</Link>
        <Link to={"/ofrecemos"}>Ofrecemos</Link>
        <Link to={"/productos"}>Tablas</Link>
        <Link to={"/muebles"}>Muebles</Link>
        <Link to={"/formulario"}>Formulario</Link>
        <Link to={"/registros"}>Registros</Link>


    </nav>
  )
}
