export const validateCreatePrestamo = (data) => {
  const errors = [];
  
  if (!data.IdCuenta) {
    errors.push('El ID de cuenta es obligatorio');
  }
  
  if (!data.Numero || data.Numero.trim().length === 0) {
    errors.push('El número de préstamo es obligatorio');
  }
  
  if (data.Numero && data.Numero.length > 20) {
    errors.push('El número de préstamo no puede exceder 20 caracteres');
  }
  
  if (!data.Fecha) {
    errors.push('La fecha es obligatoria');
  }
  
  if (data.Fecha && !isValidDate(data.Fecha)) {
    errors.push('La fecha no tiene un formato válido');
  }
  
  if (!data.Valor || parseFloat(data.Valor) <= 0) {
    errors.push('El valor del préstamo debe ser mayor a cero');
  }
  
  if (data.Valor && parseFloat(data.Valor) > 999999999999.99) {
    errors.push('El valor excede el límite permitido');
  }
  
  if (data.Interes === undefined || data.Interes === null) {
    errors.push('El interés es obligatorio');
  }
  
  if (data.Interes !== undefined && parseFloat(data.Interes) < 0) {
    errors.push('El interés no puede ser negativo');
  }
  
  if (data.Interes !== undefined && parseFloat(data.Interes) > 100) {
    errors.push('El interés no puede exceder el 100%');
  }
  
  if (!data.Plazo || parseInt(data.Plazo) <= 0) {
    errors.push('El plazo debe ser mayor a cero');
  }
  
  if (data.Plazo && parseInt(data.Plazo) > 360) {
    errors.push('El plazo no puede exceder 360 meses (30 años)');
  }
  
  if (data.Cuota !== undefined && data.Cuota !== null && parseFloat(data.Cuota) <= 0) {
    errors.push('La cuota debe ser mayor a cero');
  }
  
  if (data.Seguro !== undefined && data.Seguro !== null && parseFloat(data.Seguro) < 0) {
    errors.push('El seguro no puede ser negativo');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUpdatePrestamo = (data) => {
  const errors = [];
  
  if (data.Valor !== undefined && parseFloat(data.Valor) <= 0) {
    errors.push('El valor del préstamo debe ser mayor a cero');
  }
  
  if (data.Interes !== undefined && parseFloat(data.Interes) < 0) {
    errors.push('El interés no puede ser negativo');
  }
  
  if (data.Interes !== undefined && parseFloat(data.Interes) > 100) {
    errors.push('El interés no puede exceder el 100%');
  }
  
  if (data.Plazo !== undefined && parseInt(data.Plazo) <= 0) {
    errors.push('El plazo debe ser mayor a cero');
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
