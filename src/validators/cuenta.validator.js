export const validateCreateCuenta = (data) => {
  const errors = [];
  
  if (!data.Numero || data.Numero.trim().length === 0) {
    errors.push('El número de cuenta es obligatorio');
  }
  
  if (data.Numero && data.Numero.length > 20) {
    errors.push('El número de cuenta no puede exceder 20 caracteres');
  }
  
  if (!data.FechaApertura) {
    errors.push('La fecha de apertura es obligatoria');
  }
  
  // Validar formato de fecha
  if (data.FechaApertura && !isValidDate(data.FechaApertura)) {
    errors.push('La fecha de apertura no tiene un formato válido');
  }
  
  if (!data.IdTipoCuenta) {
    errors.push('El tipo de cuenta es obligatorio');
  }
  
  if (!data.IdSucursal) {
    errors.push('La sucursal es obligatoria');
  }
  
  if (!data.IdCuentahabiente) {
    errors.push('El cuentahabiente titular es obligatorio');
  }
  
  if (data.Saldo !== undefined && parseFloat(data.Saldo) < 0) {
    errors.push('El saldo no puede ser negativo');
  }
  
  if (data.Sobregiro !== undefined && parseFloat(data.Sobregiro) < 0) {
    errors.push('El sobregiro no puede ser negativo');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUpdateCuenta = (data) => {
  const errors = [];
  
  if (data.Saldo !== undefined && parseFloat(data.Saldo) < 0) {
    errors.push('El saldo no puede ser negativo');
  }
  
  if (data.Sobregiro !== undefined && parseFloat(data.Sobregiro) < 0) {
    errors.push('El sobregiro no puede ser negativo');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Función auxiliar para validar fechas
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

