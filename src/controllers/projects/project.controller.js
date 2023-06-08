const { pool } = require("../../database/connection");

const registerClient = async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await pool.query(
      "INSERT INTO cliente (nombre) VALUES ($1)",
      [nombre]
    );

    return res.status(200).json({ results: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const listClient = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cliente");
    return res.status(200).json({ results: results.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const createProject = async (req, res) => {
  try {
    const { nombre, descripcion, fecha_final, cliente } = req.body;

    const _fecha = new Date(fecha_final);

    const result = await pool.query(
      "INSERT INTO proyecto (nombre, descripcion, fecha_finalizacion_estimada, cliente_id, estado_id) VALUES ($1, $2, $3, $4, $5)",
      [nombre, descripcion, _fecha, cliente, 4]
    );

    return res.status(200).json({ results: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { nombre, descripcion, usuario } = req.body;
    const result = await pool.query(
      "INSERT INTO tarea (proyecto_id, usuario_id, nombre, descripcion, estado_tarea_id) VALUES ($1, $2, $3, $4, $5)",
      [Number(project_id), usuario, nombre, descripcion, 1]
    );

    return res.status(200).json({ results: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const listProject = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM project_info");
    return res.status(200).json({ results: results.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const listTask = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT * FROM task_info WHERE proyecto_id = $1",
      [Number(id)]
    );
    return res.status(200).json({ results: results.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const listTaskStatus = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM estado_tarea");

    return res.status(200).json({ results: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id, status_id } = req.body;

    const result = await pool.query(
      "UPDATE tarea SET estado_tarea_id = $1 WHERE id = $2",
      [Number(status_id), Number(id)]
    );

    return res.status(200).json({ resutls: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM proyecto WHERE id = $1", [
      Number(id),
    ]);
    return res.status(200).json({ results: results.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("DELETE FROM proyecto WHERE id = $1", [
      Number(id),
    ]);
    return res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const listTeams = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM equipo");
    return res.status(200).json({ results: results.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const listUserType = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM tipo_usuario");
    return res.status(200).json({ results: results.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM tarea WHERE id= $1", [
      Number(id),
    ]);
    return res.status(200).json({ results: result.rowCount });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  createProject,
  createTask,
  getProject,
  listProject,
  listTask,
  registerClient,
  listTeams,
  listUserType,
  deleteProject,
  listClient,
  listTaskStatus,
  updateTaskStatus,
  deleteTask
};
