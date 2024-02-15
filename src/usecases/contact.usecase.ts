import { UserRespository } from "./../intefaces/user.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import {
  Contact,
  ContactCreate,
  ContactRepository,
} from "./../intefaces/contact.interface";

import { userRepositoryPrisma } from "../repositories/user.repository";
class ContactUseCase {
  private contactRepository: ContactRepository;
  private UserRespository: UserRespository;
  constructor() {
    this.contactRepository = new ContactsRepositoryPrisma();
    this.UserRespository = new userRepositoryPrisma();
  }
  async create({ email, name, phone, userEmail }: ContactCreate) {
    // email do usuário logado
    // buscar o usuário pelo email
    // verificar se o usuário existe
    // se não existir, retornar erro
    // se existir, criar o contato
    // antes de criar o contato, verificar se o contato já existe pelo telefone ou email

    const user = await this.UserRespository.findByEmail(userEmail);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const verifyIfExistsContact =
      await this.contactRepository.findByEmailOrPhone(email, phone);
    if (verifyIfExistsContact) {
      throw new Error("Contato já existe");
    }
    const contact = await this.contactRepository.create({
      email,
      name,
      phone,
      userId: user.id,
    });

    return contact;
  }
  async listAllContacts(userEmail: string) {
    const user = await this.UserRespository.findByEmail(userEmail);
    console.log(user);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const contacts = await this.contactRepository.findAllContacts(user.id);
    console.log(contacts);
    return contacts;
  }
  async updateContact({ id, name, email, phone }: Contact) {
    const data = await this.contactRepository.updateContact({
      id,
      name,
      email,
      phone,
    });
    return data;
  }

  async delete(id: string) {
    const data = await this.contactRepository.delete(id);
    return data;
  }
}
export { ContactUseCase };
