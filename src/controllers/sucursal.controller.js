import { Sucursal, Ciudad, TipoSucursal } from '../models/index.js';
import { validateCreateSucursal, validateUpdateSucursal } from '../validators/sucursal.validator.js';

// Obtener todas las sucursales
export const getAllSucursales = async (req, res) => {
  try {
    // Primero intentar sin relaciones para verificar si hay datos
    const sucursalesSinRelaciones = await Sucursal.findAll({
      order: [['Sucursal', 'ASC']]
    });
    console.log(`Sucursales sin relaciones: ${sucursalesSinRelaciones.length}`);
    
    // Si hay datos, intentar con relaciones
    let sucursales;
    if (sucursalesSinRelaciones.length > 0) {
      try {
        sucursales = await Sucursal.findAll({
          include: [
            { model: Ciudad, as: 'ciudad', required: false },
            { model: TipoSucursal, as: 'tipoSucursal', required: false }
          ],
          order: [['Sucursal', 'ASC']]
        });
        console.log(`Sucursales con relaciones: ${sucursales.length}`);
      } catch (relError) {
        console.error('Error al cargar con relaciones, usando sin relaciones:', relError);
        // Si falla con relaciones, usar sin relaciones
        sucursales = sucursalesSinRelaciones;
      }
    } else {
      sucursales = sucursalesSinRelaciones;
    }
    
    // Convertir a JSON plano para asegurar compatibilidad
    const sucursalesData = sucursales.map(sucursal => sucursal.toJSON());
    
    console.log(`Sucursales encontradas: ${sucursalesData.length}`);
    if (sucursalesData.length > 0) {
      console.log('Ejemplo de sucursal JSON:', JSON.stringify(sucursalesData[0], null, 2));
      console.log('Primera sucursal:', {
        Sucursal: sucursalesData[0].Sucursal,
        IdSucursal: sucursalesData[0].IdSucursal,
        IdCiudad: sucursalesData[0].IdCiudad,
        IdTipoSucursal: sucursalesData[0].IdTipoSucursal,
        tieneTipoSucursal: !!sucursalesData[0].tipoSucursal,
        tipoSucursal: sucursalesData[0].tipoSucursal,
        tieneCiudad: !!sucursalesData[0].ciudad,
        ciudad: sucursalesData[0].ciudad
      });
    } else {
      console.warn('⚠️ No se encontraron sucursales en la base de datos');
      console.log('Verifica que la tabla "sucursal" tenga datos insertados');
    }
    res.json(sucursalesData);
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: error.message });
  }
};

// Obtener una sucursal por ID
export const getSucursalById = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = await Sucursal.findByPk(id, {
      include: [
        { model: Ciudad, as: 'ciudad' },
        { model: TipoSucursal, as: 'tipoSucursal' }
      ]
    });
    
    if (!sucursal) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva sucursal
export const createSucursal = async (req, res) => {
  try {
    // Validar datos de entrada
    const validation = validateCreateSucursal(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const nuevaSucursal = await Sucursal.create(req.body);
    res.status(201).json(nuevaSucursal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una sucursal
export const updateSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar datos de entrada
    const validation = validateUpdateSucursal(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const [updated] = await Sucursal.update(req.body, {
      where: { IdSucursal: id }
    });
    
    if (updated) {
      const sucursalActualizada = await Sucursal.findByPk(id);
      res.json(sucursalActualizada);
    } else {
      res.status(404).json({ error: 'Sucursal no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una sucursal
export const deleteSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sucursal.destroy({
      where: { IdSucursal: id }
    });
    
    if (deleted) {
      res.json({ message: 'Sucursal eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Sucursal no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

