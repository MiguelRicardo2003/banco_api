import { Cuentahabiente, Cuenta, TipoCuenta, TipoDocumento, Ciudad } from '../models/index.js';

// Obtener todos los titulares con sus cuentas
export const getTitularesConCuentas = async (req, res) => {
  try {
    const titulares = await Cuentahabiente.findAll({
      include: [
        {
          model: TipoDocumento,
          as: 'tipoDocumento',
          attributes: ['IdTipoDocumento', 'TipoDocumento', 'Sigla']
        },
        {
          model: Ciudad,
          as: 'ciudad',
          attributes: ['IdCiudad', 'Ciudad']
        },
        {
          model: Cuenta,
          as: 'cuentas',
          attributes: ['IdCuenta', 'Numero', 'FechaApertura', 'Saldo'],
          include: [
            {
              model: TipoCuenta,
              as: 'tipoCuenta',
              attributes: ['IdTipoCuenta', 'TipoCuenta']
            }
          ]
        }
      ],
      order: [['Nombre', 'ASC']]
    });

    res.json(titulares);
  } catch (error) {
    console.error('Error al obtener titulares con cuentas:', error);
    res.status(500).json({ error: 'Error al obtener titulares con cuentas' });
  }
};
