import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseApp";
import { Persona } from "../Interfaces/IFormulario";

export const registrarPersona = async (persona: Persona): Promise<void> => {
  await addDoc(collection(db, "personas"), persona);
};

export const obtenerPersonas = async (): Promise<Persona[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "personas"));
    const personas: Persona[] = [];
    querySnapshot.forEach((documento) => {
      const data = documento.data();
      const persona: Persona = {
        nombre: data.nombre,
        apellido: data.apellido,
        lugarGrabado: data.lugarGrabado,
        edad: data.edad,
        email: data.email,
        telefono: data.telefono,
        comentario: data.comentario,
        idPersona: documento.id,
      };
      personas.push(persona);
    });
    return personas;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener personas:", error);
    return [];
  }
};

export const obtenerPersona = async (idPersona: string): Promise<Persona | undefined> => {
  try {
    const docRef = doc(db, "personas", idPersona);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const persona: Persona = {
        nombre: data.nombre,
        apellido: data.apellido,
        lugarGrabado: data.lugarGrabado,
        edad: data.edad,
        email: data.email,
        telefono: data.telefono,
        comentario: data.comentario,
        idPersona: docSnap.id,
      };
      return persona;
    } else {
      return undefined;
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener persona:", error);
    return undefined;
  }
};

export const actualizarPersona = async (idPersona: string, p: Persona): Promise<void> => {
  try {
    const docRef = doc(db, "personas", idPersona);
    await updateDoc(docRef, { ...p });
  } catch (error) {
    console.error("Error al actualizar persona:", error);
  }
};

export const eliminarPersona = async (idPersona: string): Promise<void> => {
  try {
    const docRef = doc(db, "personas", idPersona);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar persona:", error);
  }
};