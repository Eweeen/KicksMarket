/**
 * @swagger
 * components:
 *   schemas:
 *     Shoe:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         size:
 *           type: number
 *         color:
 *           type: string
 *       required:
 *         - name
 *         - size
 *         - color
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 *     ShoeListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Shoe'
 *     ShoeResponse:
 *       type: object
 *       properties:
 *         shoe:
 *           $ref: '#/components/schemas/Shoe'
 *       required:
 *         - shoe
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
 * @swagger
 * /shoes:
 *   get:
 *     summary: Get a list of shoes
 *     description: Retrieve a list of all shoes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shoes retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoeListResponse'
 *               example:
 *                 - name: Nike Air Max
 *                   size: 42
 *                   color: black
 *                 - name: Adidas Stan Smith
 *                   size: 41
 *                   color: white
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /shoes/{id}:
 *   get:
 *     summary: Get a shoe by ID
 *     description: Retrieve a single shoe by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the shoe to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shoe retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoeResponse'
 *               example:
 *                 shoe:
 *                   name: Nike Air Max
 *                   size: 42
 *                   color: black
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *       404:
 *         description: Shoe not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 message: Shoe not found
 */

/**
 * @swagger
 * /shoes:
 *   post:
 *     summary: Add a new shoe
 *     description: Add a new shoe to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The shoe to add.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shoe'
 *             example:
 *               name: Nike Air Max
 *               size: 42
 *               color: black
 *     responses:
 *       201:
 *         description: Shoe added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoeResponse'
 *               example:
 *                 shoe:
 *                   name: Nike Air Max
 *                   size: 42
 *                   color: black
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

import { Express } from "express";
import * as controller from "../controllers/shoes.controller";
import { authorize } from "../middleware/authenticate";

export default function (app: Express) {
  // Routes users
  app.get(
    "/shoes/home",
    authorize(["user", "admin"]),
    controller.findShoesHome
  );
  app.get("/shoes/:id", authorize(["user", "admin"]), controller.findShoesById);
  app.get("/brands", authorize(["user", "admin"]), controller.findAllBrands);
  app.get(
    "/brand/:name/shoes",
    authorize(["user", "admin"]),
    controller.findAllByBrand
  );
  // Routes admin
  app.get("/shoes", authorize(["admin"]), controller.findShoes);
  app.post("/shoes", authorize(["admin"]), controller.addShoes);
  app.patch("/shoes/:id", authorize(["admin"]), controller.updateShoes);
  app.delete("/shoes/:id", authorize(["admin"]), controller.deleteShoes);
}
