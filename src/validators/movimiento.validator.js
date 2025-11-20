export const validateCreateMovimiento = (data) => {
  const errors = [];
  
  if (!data.IdCuenta) {
    errors.push('El ID de cuenta es obligatorio');
  }
  
  if (!data.Valor || parseFloat(data.Valor) <= 0) {
    errors.push('El valor debe ser mayor a cero');
  }
  
  if (data.Valor && parseFloat(data.Valor) > 999999999999.99) {
    errors.push('El valor excede el límite permitido');
  }
  
  if (!data.IdTipoMovimiento) {
    errors.push('El tipo de movimiento es obligatorio');
  }
  
  if (!data.IdSucursal) {
    errors.push('La sucursal es obligatoria');
  }
  
  if (!data.Fecha) {
    errors.push('La fecha es obligatoria');
  }
  
  if (data.Fecha && !isValidDate(data.Fecha)) {
    errors.push('La fecha no tiene un formato válido');
  }
  
  if (data.Descripcion && data.Descripcion.length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres');
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

