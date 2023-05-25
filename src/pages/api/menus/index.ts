import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menusValidationSchema } from 'validationSchema/menus';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenus();
    case 'POST':
      return createMenus();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenus() {
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

    const data = await prisma.menus.findMany(body);
    return res.status(200).json(data);
  }

  async function createMenus() {
    await menusValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.menu_items?.length > 0) {
      const create_menu_items = body.menu_items;
      body.menu_items = {
        create: create_menu_items,
      };
    } else {
      delete body.menu_items;
    }
    const data = await prisma.menus.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
