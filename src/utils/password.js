import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashClave = async (clave) => {
  try {
    if (!clave || typeof clave !== 'string') {
      throw new Error('La clave debe ser un string válido');
    }
    return await bcrypt.hash(clave, SALT_ROUNDS);
  } catch (error) {
    console.error('Error al hashear la clave:', error);
    throw new Error('Error al procesar la clave');
  }
};

export const compareClave = async (clavePlana, claveHash) => {
  try {
    if (!clavePlana || !claveHash) {
      return false;
    }
    return await bcrypt.compare(clavePlana, claveHash);
  } catch (error) {
    console.error('Error al comparar la clave:', error);
    return false;
  }
};

