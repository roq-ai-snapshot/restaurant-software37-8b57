import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { staffRestaurantValidationSchema } from 'validationSchema/staff-restaurants';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getStaffRestaurantById();
    case 'PUT':
      return updateStaffRestaurantById();
    case 'DELETE':
      return deleteStaffRestaurantById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStaffRestaurantById() {
    const data = await prisma.staff_restaurant.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateStaffRestaurantById() {
    await staffRestaurantValidationSchema.validate(req.body);
    const data = await prisma.staff_restaurant.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteStaffRestaurantById() {
    const data = await prisma.staff_restaurant.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
