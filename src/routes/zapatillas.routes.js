import { Router } from "express";
import { methods as zapatillasController } from "../controllers/zapatillas.controller";
const router = Router();

router.get("/", zapatillasController.getZapatillas)
router.get("/:id", zapatillasController.getZapatilla)
router.post("/", zapatillasController.addZapatilla)
router.delete("/:id", zapatillasController.deleteZapatilla)
router.put("/:id", zapatillasController.updateZapatilla)




export default router;