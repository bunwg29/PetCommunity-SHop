import { Router } from 'express';

const router: Router = Router();

import * as controller from "../../controllers/admin/orderToyPet.controller";

router.get("/", controller.index);

export const orderToyPetRoutes: Router = router;
