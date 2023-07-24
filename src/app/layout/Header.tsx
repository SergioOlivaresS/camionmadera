'use client'
import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <nav>
        <Link to={"/"}>Inicio</Link>
        <Link to={"/ofrecemos"}>Ofrecemos</Link>
        <Link to={"/productos"}>Productos</Link>
        <Link to={"/formulario"}>Formulario</Link>
        <Link to={"/registros"}>Registros</Link>


    </nav>
  )
}
