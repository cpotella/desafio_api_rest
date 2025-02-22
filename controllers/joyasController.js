const format = require("pg-format");
const pool = require("../config/config");

const obtenerJoyas = async (req, res) => {
    try {
        const { limit = 10, page = 1, order_by = "id_ASC" } = req.query;
        const [campo, direccion] = order_by.split("_");
        const offset = (page - 1) * limit;

        const query = format(
            "SELECT * FROM inventario ORDER BY %I %s LIMIT %s OFFSET %s",
            campo,
            direccion.toUpperCase(),
            limit,
            offset
        );

        const { rows: joyas } = await pool.query(query);
        res.json(generarHATEOAS(joyas, limit, page));
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error al obtener las joyas" });
    }
};

// Función para generar HATEOAS
const generarHATEOAS = (joyas, limit, page) => ({
    total: joyas.length,
    page: page,
    limit: limit,
    next: `/joyas?limit=${limit}&page=${parseInt(page) + 1}`,
    previous: page > 1 ? `/joyas?limit=${limit}&page=${parseInt(page) - 1}` : null,
    data: joyas,
});


//joyas filtos precio max, min, categoria, metal

const obtenerJoyasPorFiltro = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;
        let filtros = [];

        if (precio_max) filtros.push(`precio <= ${precio_max}`);
        if (precio_min) filtros.push(`precio >= ${precio_min}`);
        if (categoria) filtros.push(format("categoria = %L", categoria));
        if (metal) filtros.push(format("metal = %L", metal));

        let consulta = "SELECT * FROM inventario";
        if (filtros.length > 0) {
            consulta += ` WHERE ${filtros.join(" AND ")}`;
        }

        const { rows: inventario } = await pool.query(consulta);
        res.json({ total: inventario.length, data: inventario });

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error al filtrar las joyas" });
    }
};

module.exports = { obtenerJoyas, obtenerJoyasPorFiltro };
