import { Router } from "express";
import { methods as zapatillasController } from "../controllers/zapatillas.controller";

const router = Router();

router.post("/", zapatillasController.uploadZapatillaImage, zapatillasController.addZapatilla);


router.get("/", zapatillasController.getZapatillas)
router.get("/:id", zapatillasController.getZapatilla)
router.post("/", zapatillasController.addZapatilla)
router.delete("/:id", zapatillasController.deleteZapatilla)
router.put("/:id", zapatillasController.updateZapatilla)
router.get("/sort/zapatilla", zapatillasController.getZapatillasSorted)

export default router;