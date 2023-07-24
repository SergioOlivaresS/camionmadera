'use client'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Inicio } from '../Componentes/Inicio'
import { Formulario } from '../Componentes/Formulario'
import { Registros } from '../Componentes/Registros'
import { Ofrecemos } from '../Componentes/Ofrecemos'
import { Productos } from '../Componentes/Productos'
import { Actualizar } from '../Componentes/Actualizar'
import { Eliminar } from '../Componentes/Eliminar'
export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/*' element={<Inicio/>}/>
        <Route path='/ofrecemos' element={<Ofrecemos/>}/>
        <Route path='/productos' element={<Productos/>}/>
        <Route path='/formulario' element={<Formulario/>}/>
        <Route path='/registros' element={<Registros/>}/>
        <Route path='/actualizar/:idPersona' element={<Actualizar/>}/>       
        <Route path='/eliminar/:idPersona' element={<Eliminar />} /> 

      
    </Routes>
  )
}
