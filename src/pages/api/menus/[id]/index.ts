import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menusValidationSchema } from 'validationSchema/menus';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenusById();
    case 'PUT':
      return updateMenusById();
    case 'DELETE':
      return deleteMenusById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenusById() {
    const data = await prisma.menus.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateMenusById() {
    await menusValidationSchema.validate(req.body);
    const data = await prisma.menus.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMenusById() {
    const data = await prisma.menus.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
