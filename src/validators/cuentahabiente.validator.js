export const validateCreateCuentahabiente = (data) => {
  const errors = [];
  
  if (!data.Nombre || data.Nombre.trim().length === 0) {
    errors.push('El nombre es obligatorio');
  }
  
  if (data.Nombre && data.Nombre.length > 80) {
    errors.push('El nombre no puede exceder 80 caracteres');
  }
  
  if (!data.IdTipoDocumento) {
    errors.push('El tipo de documento es obligatorio');
  }
  
  if (!data.Documento || data.Documento.trim().length === 0) {
    errors.push('El documento es obligatorio');
  }
  
  if (data.Documento && data.Documento.length > 30) {
    errors.push('El documento no puede exceder 30 caracteres');
  }
  
  if (!data.IdCiudad) {
    errors.push('La ciudad es obligatoria');
  }
  
  if (!data.Clave || data.Clave.length < 4) {
    errors.push('La clave debe tener al menos 4 caracteres');
  }
  
  if (data.Clave && data.Clave.length > 100) {
    errors.push('La clave no puede exceder 100 caracteres');
  }
  
  if (data.Telefono && data.Telefono.length > 20) {
    errors.push('El teléfono no puede exceder 20 caracteres');
  }
  
  if (data.Direccion && data.Direccion.length > 100) {
    errors.push('La dirección no puede exceder 100 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUpdateCuentahabiente = (data) => {
  const errors = [];
  
  if (data.Nombre !== undefined && data.Nombre.trim().length === 0) {
    errors.push('El nombre no puede estar vacío');
  }
  
  if (data.Nombre && data.Nombre.length > 80) {
    errors.push('El nombre no puede exceder 80 caracteres');
  }
  
  // Solo validar la clave si se está proporcionando (no vacía)
  // Si está vacía o undefined, significa que no se quiere cambiar
  if (data.Clave !== undefined && data.Clave !== null && data.Clave !== '') {
    if (data.Clave.length < 4) {
      errors.push('La clave debe tener al menos 4 caracteres');
    }
    
    if (data.Clave.length > 100) {
      errors.push('La clave no puede exceder 100 caracteres');
    }
  }
  
  if (data.Telefono && data.Telefono.length > 20) {
    errors.push('El teléfono no puede exceder 20 caracteres');
  }
  
  if (data.Direccion && data.Direccion.length > 100) {
    errors.push('La dirección no puede exceder 100 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

