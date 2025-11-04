import {
  Cuenta,
  TipoCuenta,
  Sucursal,
  Cuentahabiente,
  Titular
} from "../models/index.js";
import {
  validateCreateCuenta,
  validateUpdateCuenta,
} from "../validators/cuenta.validator.js";

//Obtener todas las cuentas
export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await Cuenta.findAll({
      include: [
        { model: TipoCuenta, as: "tipoCuenta" },
        { model: Sucursal, as: "sucursal" },
        { model: Cuentahabiente, as: "titulares" },
      ],
    });
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener una cuenta por Id
export const getCuentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const cuenta = await Cuenta.findByPk(id, {
      include: [
        { model: TipoCuenta, as: "tipoCuenta" },
        { model: Sucursal, as: "sucursal" },
        { model: Cuentahabiente, as: "titualres" },
      ],
    });

    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada" });
    }

    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Crear una nueva cuenta
export const createCuenta = async (req, res) => {
  try {
    // validar datos de entrada
    const validation = validateCreateCuenta(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const { Numero, IdCuentahabiente } = req.body;

    //Validar que el numero de cuenta no este duplicado
    const existente = await Cuenta.findOne({
      where: {
        Numero,
      },
    });
    if (existente) {
      return res
        .status(400)
        .json({ error: "Ya existe una cuenta con este número" });
    }

    // Validar que el cuentahabiente existe si se proporciona
    if (IdCuentahabiente) {
      const cuentahabiente = await Cuentahabiente.findByPk(IdCuentahabiente);
      if (!cuentahabiente) {
        return res.status(400).json({ error: "El cuentahabiente no existe" });
      }
    }

    // Crear la cuenta sin el IdCuentahabiente (no es parte de la tabla cuenta)
    const datosCuenta = { ...req.body };
    delete datosCuenta.IdCuentahabiente;

    const nuevaCuenta = await Cuenta.create(datosCuenta);

    // Si se proporcionó un cuentahabiente, crear la relación titular
    if (IdCuentahabiente) {
      await Titular.create({
        IdCuenta: nuevaCuenta.IdCuenta,
        IdCuentahabiente: IdCuentahabiente
      });
    }

    // Obtener la cuenta con sus relaciones para devolverla
    const cuentaCompleta = await Cuenta.findByPk(nuevaCuenta.IdCuenta, {
      include: [
        { model: TipoCuenta, as: "tipoCuenta" },
        { model: Sucursal, as: "sucursal" },
        { model: Cuentahabiente, as: "titulares" }
      ]
    });

    res.status(201).json(cuentaCompleta);
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    res.status(400).json({ error: error.message });
  }
};

//Actualizar una cuenta
export const updateCuenta = async (req, res) => {
  try {
    const { id } = req.params;

    //Validar datos de entrada
    const validation = validateUpdateCuenta(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const [updated] = await Cuenta.update(req.body, {
      where: { IdCuenta: id },
    });

    if (updated) {
      const cuentaActualizada = await Cuenta.findByPk(id);
      res.json(cuentaActualizada);
    } else {
      res.status(404).json({ error: "Cuenta no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una cuenta
export const deleteCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cuenta.destroy({
      where: { IdCuenta: id },
    });

    if (deleted) {
      res.json({ message: "Cuenta eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Cuenta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el saldo de una cuenta
export const getSaldoCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const cuenta = await Cuenta.findByPk(id, {
      attributes: ["IdCuenta", "Numero", "Saldo", "Sobregiro"],
      include: [
        { model: TipoCuenta, as: "tipoCuenta", attributes: ["TipoCuenta"] },
      ],
    });

    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada" });
    }

    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
