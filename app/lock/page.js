import { BackspaceRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function LockPage() {
  const styles = "px-5 py-6 text-2xl ";
  return (
    <div className="flex h-svh flex-col justify-between px-3">
      <section className="flex flex-col gap-10">
        <nav className="flex justify-between py-2">
          <Avatar />
          <Avatar />
        </nav>
        <section className="flex flex-col items-center justify-center">
          <p className="text-2xl">
            Hi, <span>Priyanka</span>
          </p>
          <span className="text-sm">Enter Cupid PIN</span>
        </section>
        <section className="flex justify-center gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <input
              maxLength="1"
              className="h-12 w-12 rounded-lg 
              focus:outline-accent-shade-500
              text-center border-2 border-slate-200 p-3 text-2xl active:border-accent-shade-300"
              type="password"
              key={i}
            />
          ))}
        </section>
      </section>
      <section className="grid grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <button className={styles} key={`button${i + 1}`}>
            {i + 1}
          </button>
        ))}
        <button className={styles}>.</button>
        <button className={styles}>0</button>
        <button className={styles}>
          <BackspaceRounded
            sx={{ fill: "#4d6342", height: "25px", width: "25px" }}
          />
        </button>
      </section>
    </div>
  );
}

export default LockPage;
