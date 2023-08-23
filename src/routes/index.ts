import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { usersRoutes } from './user.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes)
router.use('/specifications', specificationsRoutes);

export { router };