import bcrypt from 'bcrypt';

// Número de rondas para el hashing (más rondas = más seguro pero más lento)
const SALT_ROUNDS = 10;

/**
 * Hashea una clave (PIN de tarjeta) usando bcrypt
 * @param {string} clave - Clave en texto plano
 * @returns {Promise<string>} - Clave hasheada
 */
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

/**
 * Compara una clave en texto plano con una clave hasheada
 * @param {string} clavePlana - Clave en texto plano
 * @param {string} claveHash - Clave hasheada almacenada
 * @returns {Promise<boolean>} - true si coinciden, false si no
 */
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

