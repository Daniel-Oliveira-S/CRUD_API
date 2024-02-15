import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { Contact, ContactCreate } from "../intefaces/contact.interface";
import { authMiddleware } from "../middleware/auth.middleware";
export async function contactRoutes(fastify: FastifyInstance) {
  const userUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authMiddleware);
  fastify.post<{
    Body: ContactCreate;
  }>("/", async (req, reply) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"];
    try {
      const data = await userUseCase.create({
        name,
        email,
        phone,
        userEmail: emailUser as string,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/", async (req, reply) => {
    const emailUser = req.headers["email"];
    try {
      const data = await userUseCase.listAllContacts(emailUser as string);
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.put<{ Body: Contact; Params: { id: string } }>(
    "/:id", // Add the route path here
    async (req, reply) => {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      try {
        const data = await userUseCase.updateContact({
          id,
          name,
          email,
          phone,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.delete<{
    Params: { id: string };
  }>("/:id", async (req, reply) => {
    const { id } = req.params;

    try {
      const data = await userUseCase.delete(id);
    } catch (error) {
      reply.send(error);
    }
  });
}
