import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { staffRestaurantValidationSchema } from 'validationSchema/staff-restaurants';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getStaffRestaurants();
    case 'POST':
      return createStaffRestaurant();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStaffRestaurants() {
    let body: any = {};
    if (req.query) {
      if (req.query.relations) {
        body = { ...body, include: {} };
        if (Array.isArray(req.query.relations)) {
          req.query.relations.forEach((relation) => {
            body.include[relation] = true;
          });
        } else {
          body.include[req.query.relations] = true;
        }
      }
    }

    const data = await prisma.staff_restaurant.findMany(body);
    return res.status(200).json(data);
  }

  async function createStaffRestaurant() {
    await staffRestaurantValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.staff_restaurant.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
