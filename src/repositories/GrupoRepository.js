 // Asignar grupo 
 asignarGrupo: async(asignacion) => { 
    try { 
      const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ", 
asignacion); 
      console.log('resultado: ', result) 
      return result; 

    } catch (error) { 
      console.log('Ocurrio un problema al asignar el grupo', error); 
    } 
  } 