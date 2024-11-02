import UserModel from "@/models/User";

export default async function LockPage({ searchParams }) {
  const {id}= searchParams;
  const setup=searchParams?.setup;
  const isconfirm=searchParams?.isconfirm;
  const {firstName,lastName}= await UserModel.findById(id);
  return (
    <section className="flex flex-col items-center justify-center">
      <p className="text-2xl">
        Hi, <span>{firstName} {lastName}</span>
      </p>
      {setup && <span className="text-sm">Initialize Cupid PIN</span>}
      {isconfirm && <span className="text-sm">Confirm Cupid PIN</span>}
    </section>
  );
}
