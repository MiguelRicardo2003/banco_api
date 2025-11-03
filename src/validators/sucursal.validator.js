export const validateCreateSucursal = (data) => {
  const errors = [];
  
  if (!data.Sucursal || data.Sucursal.trim().length === 0) {
    errors.push('El nombre de la sucursal es obligatorio');
  }
  
  if (data.Sucursal && data.Sucursal.length > 80) {
    errors.push('El nombre de la sucursal no puede exceder 80 caracteres');
  }
  
  if (!data.IdCiudad) {
    errors.push('La ciudad es obligatoria');
  }
  
  if (!data.IdTipoSucursal) {
    errors.push('El tipo de sucursal es obligatorio');
  }
  
  if (data.Direccion && data.Direccion.length > 100) {
    errors.push('La dirección no puede exceder 100 caracteres');
  }
  
  if (data.Telefono && data.Telefono.length > 20) {
    errors.push('El teléfono no puede exceder 20 caracteres');
  }
  
  if (data.Horario && data.Horario.length > 50) {
    errors.push('El horario no puede exceder 50 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUpdateSucursal = (data) => {
  const errors = [];
  
  if (data.Sucursal !== undefined && data.Sucursal.trim().length === 0) {
    errors.push('El nombre de la sucursal no puede estar vacío');
  }
  
  if (data.Sucursal && data.Sucursal.length > 80) {
    errors.push('El nombre de la sucursal no puede exceder 80 caracteres');
  }
  
  if (data.Direccion && data.Direccion.length > 100) {
    errors.push('La dirección no puede exceder 100 caracteres');
  }
  
  if (data.Telefono && data.Telefono.length > 20) {
    errors.push('El teléfono no puede exceder 20 caracteres');
  }
  
  if (data.Horario && data.Horario.length > 50) {
    errors.push('El horario no puede exceder 50 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
