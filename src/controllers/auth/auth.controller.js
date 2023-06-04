const { pool } = require("../../database/connection");
const { generateToken, verifyToken } = require("../../utils/jwt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM usuario WHERE email = $1", [
      email,
    ]);

    const isValid = password === user.rows[0].password;
    if (isValid) {
      const token = generateToken(user.rows[0]);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const signup = async (req, res) => {
  try {
    const user = req.body;

    const response = await pool.query(
      "INSERT INTO usuario (nombre, tipo_usuario_id, equipo_id, email, password) VALUES ($1, $2, $3, $4, $5)",
      [user.nombre, user.tipo_usuario, user.equipo, user.email, user.password]
    );

    return res.status(200).json({ results: response });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user_id = req.user_id;

    const user = await pool.query("SELECT * FROM user_info WHERE id = $1", [
      user_id,
    ]);

    return res.status(200).json({ result: user.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
module.exports = { login, signup, getProfile };
