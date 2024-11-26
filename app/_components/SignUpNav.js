import BackButton from './BackButton';

function SignUpNav({heading = ''}) {
  return (
    <nav className="absolute left-0 right-0 top-0 flex w-svw items-center justify-between px-3 py-1">
      <div className="flex items-center gap-2 justify-self-start">
        <BackButton />
        <span className="text-xl font-semibold text-accent-shade-500">Back</span>
      </div>
      <h3 className="absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold">
        {`${heading}`}
      </h3>
      <div className="w-12"></div>
    </nav>
  );
}

export default SignUpNav;
