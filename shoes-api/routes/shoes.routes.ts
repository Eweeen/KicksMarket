/**
 * @swagger
 * components:
 *   schemas:
 *     Shoe:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la chaussure.
 *         description:
 *           type: string
 *           description: Description de la chaussure.
 *         price:
 *           type: number
 *           description: Prix de la chaussure.
 *         brand:
 *           type: string
 *           description: Marque de la chaussure.
 *         hidden:
 *           type: boolean
 *           description: Indique si la chaussure est masquée ou non.
 *         image:
 *           type: string
 *           description: URL de l'image de la chaussure.
 *         sizes:
 *           type: array
 *           description: Tableau des tailles disponibles pour la chaussure.
 *           items:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *                 description: Taille de la chaussure.
 *               quantity:
 *                 type: number
 *                 description: Quantité disponible pour cette taille.
 *       required:
 *         - name
 *         - price
 *         - brand
 *         - image
 *         - sizes
 *     ShoeHome:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la chaussure.
 *         name:
 *           type: string
 *           description: Nom de la chaussure.
 *         price:
 *           type: number
 *           description: Prix de la chaussure.
 *         brand:
 *           type: string
 *           description: Marque de la chaussure.
 *         image:
 *           type: string
 *           description: Nom de l'image de la chaussure.
 *         isFavorite:
 *           type: boolean
 *           description: Indique si la chaussure est en favori ou non.
 *       required:
 *         - _id
 *         - name
 *         - price
 *         - brand
 *         - image
 *         - isFavorite
 *     ShoeRequestBody:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la chaussure.
 *         description:
 *           type: string
 *           description: Description de la chaussure.
 *         price:
 *           type: number
 *           description: Prix de la chaussure.
 *         brand:
 *           type: string
 *           description: Marque de la chaussure.
 *         hidden:
 *           type: boolean
 *           description: Indique si la chaussure est masquée ou non.
 *         image:
 *           type: string
 *           description: URL de l'image de la chaussure.
 *         sizes:
 *           type: array
 *           description: Tableau des tailles disponibles pour la chaussure.
 *           items:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *                 description: Taille de la chaussure.
 *               quantity:
 *                 type: number
 *                 description: Quantité disponible pour cette taille.
 *       required:
 *         - name
 *         - price
 *         - brand
 *         - image
 *         - sizes
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: Unauthorized
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: Internal server error
 */

/**
 * Trouver les chaussures pour la page d'accueil
 * Récupère les chaussures pour afficher sur la page d'accueil.
 *
 * @swagger
 * /shoes/home:
 *   get:
 *     tags:
 *       - Chaussures
 *     summary: Trouver les chaussures pour la page d'accueil
 *     description: Récupère les chaussures pour afficher sur la page d'accueil.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chaussures récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoeHome'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Trouver une chaussure par ID
 * Récupère une chaussure en utilisant son ID.
 *
 * @swagger
 * /shoes/{id}:
 *   get:
 *     tags:
 *       - Chaussures
 *     summary: Trouver une chaussure par ID
 *     description: Récupère une chaussure en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la chaussure
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chaussure récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoeResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Trouver toutes les marques
 * Récupère la liste de toutes les marques disponibles.
 *
 * @swagger
 * /brands:
 *   get:
 *     tags:
 *       - Chaussures
 *     summary: Trouver toutes les marques
 *     description: Récupère la liste de toutes les marques disponibles.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Marques récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Trouver les chaussures par marque
 * Récupère la liste des chaussures d'une marque spécifique.
 *
 * @swagger
 * /brand/{name}/shoes:
 *   get:
 *     tags:
 *       - Chaussures
 *     summary: Trouver les chaussures par marque
 *     description: Récupère la liste des chaussures d'une marque spécifique.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Nom de la marque
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chaussures récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shoe'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Trouver toutes les chaussures
 * Récupère la liste de toutes les chaussures disponibles.
 *
 * @swagger
 * /shoes:
 *   get:
 *     tags:
 *       - Chaussures
 *     summary: Trouver toutes les chaussures
 *     description: Récupère la liste de toutes les chaussures disponibles.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chaussures récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shoe'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Ajouter une chaussure
 * Ajoute une nouvelle chaussure à la liste des chaussures.
 *
 * @swagger
 * /shoes:
 *   post:
 *     tags:
 *       - Chaussures
 *     summary: Ajouter une chaussure
 *     description: Ajoute une nouvelle chaussure à la liste des chaussures.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoeRequestBody'
 *     responses:
 *       201:
 *         description: Chaussure ajoutée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoeResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Mettre à jour une chaussure
 * Met à jour les informations d'une chaussure existante en utilisant son ID.
 *
 * @swagger
 * /shoes/{id}:
 *   patch:
 *     tags:
 *       - Chaussures
 *     summary: Mettre à jour une chaussure
 *     description: Met à jour les informations d'une chaussure existante en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la chaussure
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoeRequestBody'
 *     responses:
 *       200:
 *         description: Chaussure mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoeResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Supprimer une chaussure
 * Supprime une chaussure existante en utilisant son ID.
 *
 * @swagger
 * /shoes/{id}:
 *   delete:
 *     tags:
 *       - Chaussures
 *     summary: Supprimer une chaussure
 *     description: Supprime une chaussure existante en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la chaussure
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Chaussure supprimée avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

import { Express } from "express";
import * as controller from "../controllers/shoes.controller";
import { authorize } from "../middleware/authenticate";
import { validate } from "../middleware/validations";
import { validateBrand, validateShoe, validateUpdateShoes, validateCreateShoes } from "../validations/shoes.validation";

export default function (app: Express) {
  /* ====================================================== */
  /* ==================== Routes users ==================== */
  /* ====================================================== */
  app.get("/shoes/home", authorize(["user", "admin"]), controller.findShoesHome);
  app.get("/shoes/:id", authorize(["user", "admin"]), validate(validateShoe), controller.findShoesById);
  app.get("/brands", authorize(["user", "admin"]), controller.findAllBrands);
  app.get("/brand/:name/shoes", authorize(["user", "admin"]), validate(validateBrand), controller.findAllByBrand);
  app.get("/shoes", authorize(["user", "admin"]), controller.findShoes);

  /* ====================================================== */
  /* ==================== Routes admin ==================== */
  /* ====================================================== */
  app.post("/shoes", authorize(["admin"]), validate(validateCreateShoes), controller.addShoes);
  app.patch("/shoes/:id", authorize(["admin"]), validate(validateUpdateShoes), controller.updateShoes);
  app.delete("/shoes/:id", authorize(["admin"]), validate(validateShoe), controller.deleteShoes);
}
