import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { usersRoutes } from './users.routes';
import { specificationsRoutes } from './specifications.routes';
import { authenticateRoutes } from './authenticate.routes';


const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes)
router.use('/specifications', specificationsRoutes);
router.use(authenticateRoutes);

export { router };