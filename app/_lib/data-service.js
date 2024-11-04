import prisma from "./prisma";
///GET USER
export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });
  if (!user) throw new Error("User does not exist");
  return user;
}

//GET USER BY ID
export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: id }
  });
  if (!user) throw new Error("User does not exist");
  return user;
}

//GET USER ID BY EMAIL
export async function getUserIdByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });
  if (!user) throw new Error("User does not exist");
  return user.id;
}

//CREATE USER
export async function createUser(data) {
  try {
    return await prisma.user.create({
      data: data
    });
  } catch (error) {
    console.error(error.message);
  }
}

//UPDATE USER
export async function AddInfo(id, data) {
  return await prisma.user.update({
    where: { id: id },
    data: data
  });
}

//CHECK USERNAME IS PRESENT OR NAME
export async function CheckUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username: username }
  });
  return !!user;
}