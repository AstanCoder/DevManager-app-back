const { pool } = require("../../database/connection");

const createUser = async (req, res) => {
  try {
    const { nombre, tipo_usuario_id, equipo_id, email, password } = req.body;

    const user = await pool.query(
      "INSERT INTO usuario (nombre, tipo_usuario_id, equipo_id, email, password) VALUES ($1, $2, $3, $4, $5)",
      [nombre, Number(tipo_usuario_id), Number(equipo_id), email, password]
    );

    return res.status(200).json({ result: user.rowCount });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const listUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_info");
    return res.status(200).json({ results: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await pool.query("DELETE FROM usuario WHERE id = $1", [
      Number(id),
    ]);

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  listUser,
  deleteUser,
};
