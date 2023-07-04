/**
 * @swagger
 * tags:
 *   - name: Authentification
 *     description: Opérations d'authentification
 *   - name: Utilisateurs
 *     description: Opérations liées aux utilisateurs
 *   - name: Chaussures
 *     description: Opérations liées aux chaussures
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         birthdate:
 *           type: string
 *           format: date
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - birthdate
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 */

/**
 * S'inscrire
 * Permet à un utilisateur de s'inscrire en fournissant les informations requises.
 *
 * @swagger
 * /sign-up:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: S'inscrire
 *     description: Permet à un utilisateur de s'inscrire en fournissant les informations requises.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       200:
 *         description: Utilisateur inscrit avec succès.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * Se connecter
 * Permet à un utilisateur de se connecter en fournissant les informations d'identification.
 *
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: Se connecter
 *     description: Permet à un utilisateur de se connecter en fournissant les informations d'identification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *               example:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

import { Express } from "express";
import * as controller from "../controllers/auth.controller";
import { validate } from "../middleware/validations";
import { validateLogin, validateSignUp } from "../validations/auth.validation";

export default function (app: Express) {
  app.post("/sign-up", validate(validateSignUp), controller.signUp);
  app.post("/login", validate(validateLogin), controller.login);
}
