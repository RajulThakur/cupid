import prisma from "../_lib/prisma";

export default async function LockPage(props) {
  const searchParams = await props.searchParams;
  const {id}= searchParams;
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { firstName: true, lastName: true }
  });

  return (
    <section className="flex flex-col items-center justify-center">
      <p className="text-2xl">
        Hi, <span>{user.firstName} {user.lastName}</span>
      </p>
      {searchParams?.setup && <span className="text-sm">Initialize Cupid PIN</span>}
      {searchParams?.isconfirm && <span className="text-sm">Confirm Cupid PIN</span>}
    </section>
  );
}
