/**
 * @swagger
 * components:
 *   schemas:
 *     ShoeResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la chaussure.
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
 *     PanierResponse:
 *       type: object
 *       properties:
 *         shoes:
 *           $ref: '#/components/schemas/ShoeResponse'
 *         size:
 *           type: number
 *           description: Taille de la chaussure.
 *         quantity:
 *           type: number
 *           description: Quantité dans le panier.
 */

/**
 * Ajouter une chaussure aux favoris
 * Ajoute une chaussure aux favoris en utilisant son ID.
 *
 * @swagger
 * /user/{user_id}/favorite/{id}:
 *   post:
 *     summary: Ajouter une chaussure aux favoris
 *     description: Ajoute une chaussure aux favoris en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: ID de la chaussure
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chaussure ajoutée aux favoris avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Obtenir un favori spécifique
 * Récupère les détails d'un favori spécifique en utilisant l'ID de l'utilisateur et l'ID de la chaussure.
 *
 * @swagger
 * /user/{user_id}/favorite/{id}:
 *   get:
 *     summary: Obtenir un favori spécifique
 *     description: Récupère les détails d'un favori spécifique en utilisant l'ID de l'utilisateur et l'ID de la chaussure.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: ID de la chaussure
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du favori récupérés avec succès.
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
 * Supprimer une chaussure des favoris
 * Supprime une chaussure des favoris en utilisant son ID.
 *
 * @swagger
 * /user/{user_id}/favorite/{id}:
 *   delete:
 *     summary: Supprimer une chaussure des favoris
 *     description: Supprime une chaussure des favoris en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: ID de la chaussure
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chaussure supprimée des favoris avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Obtenir les favoris d'un utilisateur
 * Récupère les favoris d'un utilisateur en utilisant son ID.
 *
 * @swagger
 * /user/{user_id}/favorites:
 *   get:
 *     summary: Obtenir les favoris d'un utilisateur
 *     description: Récupère les favoris d'un utilisateur en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favoris de l'utilisateur récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoeResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Ajouter un article au panier
 * Ajoute un article au panier de l'utilisateur en utilisant son ID d'utilisateur et l'ID de l'article.
 *
 * @swagger
 * /user/{user_id}/cart/{id}:
 *   post:
 *     summary: Ajouter un article au panier
 *     description: Ajoute un article au panier de l'utilisateur en utilisant son ID d'utilisateur et l'ID de l'article.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: ID de l'article
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *                 description: Taille de l'article.
 *               quantity:
 *                 type: number
 *                 description: Quantité de l'article.
 *     responses:
 *       200:
 *         description: Article ajouté au panier avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Supprimer un article du panier
 * Supprime un article du panier de l'utilisateur en utilisant son ID d'utilisateur et l'ID de l'article.
 *
 * @swagger
 * /user/{user_id}/cart/{id}:
 *   delete:
 *     summary: Supprimer un article du panier
 *     description: Supprime un article du panier de l'utilisateur en utilisant son ID d'utilisateur et l'ID de l'article.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: ID de l'article
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *                 description: Taille de l'article.
 *               quantity:
 *                 type: number
 *                 description: Quantité de l'article.
 *     responses:
 *       200:
 *         description: Article supprimé du panier avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Obtenir le panier d'un utilisateur
 * Récupère le contenu du panier d'un utilisateur en utilisant son ID.
 *
 * @swagger
 * /user/{user_id}/cart:
 *   get:
 *     summary: Obtenir le panier d'un utilisateur
 *     description: Récupère le contenu du panier d'un utilisateur en utilisant son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenu du panier récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PanierResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Charger un avatar pour un utilisateur
 * Charge un avatar pour l'utilisateur en utilisant son ID d'utilisateur et le champ "avatar" dans le formulaire multipart.
 *
 * @swagger
 * /user/{user_id}/avatar:
 *   post:
 *     summary: Charger un avatar pour un utilisateur
 *     description: Charge un avatar pour l'utilisateur en utilisant son ID d'utilisateur et le champ "avatar" dans le formulaire multipart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar chargé avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Afficher l'avatar d'un utilisateur
 * Affiche l'avatar de l'utilisateur en utilisant son ID d'utilisateur.
 *
 * @swagger
 * /user/{user_id}/avatar:
 *   get:
 *     summary: Afficher l'avatar d'un utilisateur
 *     description: Affiche l'avatar de l'utilisateur en utilisant son ID d'utilisateur.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Avatar de l'utilisateur récupéré avec succès.
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Mettre à jour le mot de passe d'un utilisateur
 * Met à jour le mot de passe d'un utilisateur en utilisant son ID d'utilisateur.
 *
 * @swagger
 * /user/{user_id}/password:
 *   patch:
 *     summary: Mettre à jour le mot de passe d'un utilisateur
 *     description: Met à jour le mot de passe d'un utilisateur en utilisant son ID d'utilisateur.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Supprimer un utilisateur
 * Supprime un utilisateur en utilisant son ID d'utilisateur.
 *
 * @swagger
 * /user/{user_id}/delete:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur en utilisant son ID d'utilisateur.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

import { Express } from "express";
import multer from "multer";
import * as controller from "../controllers/users.controller";
import { authorize } from "../middleware/authenticate";
import { validate } from "../middleware/validations";
import {
  validateId,
  validateCart,
  validatePassword,
  validateUser,
} from "../validations/user.validation";
import { checkIntegrity } from "../middleware/checkIntegrity";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars/");
  },
  filename: (req, file, cb) => {
    const time = Date.now();
    const name = file.originalname.split(".")[0];
    const ext = file.originalname.split(".").pop();

    cb(null, `${name.replace(/ /g, "")}${time}.${ext}`);
  },
});

const upload = multer({ storage });

export default function (app: Express) {
  /* ================================================= */
  /* ==================== Favoris ==================== */
  /* ================================================= */
  app.post("/user/:user_id/favorite/:id", authorize(["user", "admin"]), validate(validateId), checkIntegrity, controller.addFavorite);
  app.get("/user/:user_id/favorite/:id", authorize(["user", "admin"]), validate(validateId), checkIntegrity, controller.getOneFavorite);
  app.delete("/user/:user_id/favorite/:id", authorize(["user", "admin"]), validate(validateId), checkIntegrity, controller.removeFavorite);
  app.get("/user/:user_id/favorites", authorize(["user", "admin"]), validate(validateUser), checkIntegrity, controller.getFavorites);

  /* ============================================== */
  /* ==================== Cart ==================== */
  /* ============================================== */
  app.post("/user/:user_id/cart/:id", authorize(["user", "admin"]), validate(validateCart), controller.addCart);
  app.delete("/user/:user_id/cart/:id", authorize(["user", "admin"]), validate(validateCart), controller.removeCart);
  app.get("/user/:user_id/cart", authorize(["user", "admin"]), validate(validateUser), controller.getCart);
  
  /* ============================================== */
  /* ==================== User ==================== */
  /* ============================================== */
  app.post("/user/:user_id/avatar", authorize(["user", "admin"]), validate(validateUser), upload.single("avatar"), controller.uploadAvatar);
  app.get("/user/:user_id/avatar", authorize(["user", "admin"]), validate(validateUser), controller.viewAvatar);
  app.patch("/user/:user_id/password", authorize(["user", "admin"]), validate(validatePassword), controller.updatePassword);
  app.delete("/user/:user_id/delete", authorize(["user", "admin"]), validate(validateUser), controller.deleteUser);
}
