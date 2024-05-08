const express = require('express');
const router = express.Router();
const taxisController = require('../controllers/taxisController');

/**
 * @swagger
 * tags:
 *   name: Táxis
 *   description: Operações relacionadas aos táxis
 */

/**
 * @swagger
 * /api/taxis:
 *   get:
 *     summary: Listar todos os táxis
 *     description: Retorna uma lista paginada de todos os táxis.
 *     tags: [Táxis]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número da página a ser recuperada
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Número máximo de registros por página
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de táxis paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *                 currentPage:
 *                   type: integer
 *                   description: Número da página atual
 *                 taxis:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do táxi
 *                       plate:
 *                         type: string
 *                         description: Placa do táxi
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/taxis', taxisController.listAllTaxis);

module.exports = router;
