import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Subscriber from "../models/Subscriber";

class SubscriberController {

  public async store(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);
      const {
        cpf,
        full_name,
        email,
        phone_number,
        cep,
        city,
        neighborhood,
        address,
        number,
        address_2,
        hear_about_the_event
      } = req.body;

      const subscriberExists = await repository.findOne({ where: { cpf } });

      if (subscriberExists) {
        return res.sendStatus(409);
      }

      const subscriber = new Subscriber();
      subscriber.cpf = cpf;
      subscriber.full_name = full_name;
      subscriber.email = email;
      subscriber.phone_number = phone_number;
      subscriber.cep = cep;
      subscriber.city = city;
      subscriber.neighborhood = neighborhood;
      subscriber.address = address;
      subscriber.number = number;
      subscriber.address_2 = address_2;
      subscriber.hear_about_the_event = hear_about_the_event;

      const errors = await validate(subscriber);
      if (errors.length > 0) {
        throw new Error("Validation failed!");
      } else {
        await repository.manager.save(subscriber);
        return res.json(subscriber);
      }
    } catch {
      return res.status(400).json(null)
    }
  }

  public async index(_req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);
      const subscribers = await repository.find();

      return res.json({ subscribers });
    } catch {
      return res.status(400).json(null);
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);

      const { id } = req.params;

      const subscriber = await repository.findOne({ where: { id } });

      if (!subscriber) return res.status(400).json({
        message: "Inscrito não encontrado.",
      })

      return res.json(subscriber);
    } catch {
      return res.status(400).json(null);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);

      const { id } = req.params;

      const subscriber = await repository.findOne({ where: { id } })

      const {
        cpf,
        full_name,
        email,
        phone_number,
        cep,
        city,
        neighborhood,
        address,
        number,
        address_2,
        hear_about_the_event
      } = req.body;

      await repository.update(
        {
          id
        },
        {
          cpf: cpf || subscriber.cpf,
          full_name: full_name || subscriber.full_name,
          email: email || subscriber.email,
          phone_number: phone_number || subscriber.phone_number,
          cep: cep || subscriber.cep,
          city: city || subscriber.city,
          neighborhood: neighborhood || subscriber.neighborhood,
          address: address || subscriber.address,
          number: number || subscriber.number,
          address_2: address_2 || subscriber.address_2,
          hear_about_the_event: hear_about_the_event || subscriber.hear_about_the_event,
        }
      )

      const newSubscriber = await repository.findOne({ where: { id } });

      return res.json(newSubscriber);
    } catch {
      return res.status(400).json(null)
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);

      const { id } = req.params;

      const user = await repository.findOne({ where: { id } })

      if (!user) throw new Error("Nenhum inscrito encontrado.")

      await repository.delete({ id });

      return res.json({
        deleted: true,
      });
    } catch {
      return res.status(400).json(null);
    }
  }

}

export default new SubscriberController();
