import validator from "validator";
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

      const errors: String[] = []

      const cpfExists = await repository.findOne({ where: { cpf } });

      if (cpfExists)
        errors.push("CPF já existe")

      const emailExists = await repository.findOne({ where: { email } });

      if (emailExists)
        errors.push("Email já existe")

      if (full_name.length < 3 || full_name.length > 250)
        errors.push("Nome precisa ter entre 3 e 250 caracteres")

      if (!validator.isEmail(email))
        errors.push("Email inválido")

      if (phone_number.length !== 11)
        errors.push("Telefone precisa ter 11 dígitos (DDD + número com 9 dígitos)")

      if (cep.length !== 8)
        errors.push("CEP precisa ter 8 dígitos")

      if (city.length < 3)
        errors.push("Nome da cidade precisa ter no mínimo 3 caracteres")

      if (neighborhood.length < 3)
        errors.push("Nome do bairro precisa ter no mínimo 3 caracteres")

      if (address.length < 3)
        errors.push("Nome do endereço precisa ter no mínimo 3 caracteres")


      if (hear_about_the_event.length < 5)
        errors.push("Descrição muito curta de onde soube do evento")

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
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
        await repository.manager.save(subscriber);
        return res.json(subscriber);
      }
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

  public async index(_req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);
      const subscribers = await repository.find();

      return res.json(subscribers);
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);

      const { id } = req.params;

      const subscriber = await repository.findOne({ where: { id } });

      if (!subscriber)
        return res.status(400).json({ errors: ["Inscrito não encontrado"] })

      return res.json(subscriber);
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
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

      const errors: String[] = []

      const cpfExists = await repository.findOne({ where: { cpf } });

      if (!!cpf && cpfExists)
        errors.push("CPF já existe")

      const emailExists = await repository.findOne({ where: { email } });

      if (emailExists && !(email === subscriber.email))
        errors.push("Email já existe")

      if (!!full_name && (full_name.length < 3 || full_name.length > 250))
        errors.push("Nome precisa ter entre 3 e 250 caracteres")

      if (!!email && !validator.isEmail(email))
        errors.push("Email inválido")

      if (!!phone_number && (phone_number.length !== 11))
        errors.push("Telefone precisa ter 11 dígitos (DDD + número com 9 dígitos)")

      if (!!cep && (cep.length !== 8))
        errors.push("CEP precisa ter 8 dígitos")

      if (!!city && (city.length < 3))
        errors.push("Nome da cidade precisa ter no mínimo 3 caracteres")

      if (!!neighborhood && (neighborhood.length < 3))
        errors.push("Nome do bairro precisa ter no mínimo 3 caracteres")

      if (!!address && (address.length < 3))
        errors.push("Nome do endereço precisa ter no mínimo 3 caracteres")

      if (!!hear_about_the_event && (hear_about_the_event.length < 5))
        errors.push("Descrição muito curta de onde soube do evento")

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
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
      }
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Subscriber);

      const { id } = req.params;

      const errors: String[] = []

      const user = await repository.findOne({ where: { id } })

      if (!user) errors.push("Inscrito não encontrado")

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
        await repository.delete({ id });

        return res.json({
          deleted: true,
        });
      }
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

}

export default new SubscriberController();
