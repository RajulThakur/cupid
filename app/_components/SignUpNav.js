import { ArrowBackRounded } from "@mui/icons-material"

function SignUpNav({heading=''}) {
  return (
    <nav className='flex absolute top-0 left-0 right-0 w-svw items-center justify-between px-3 py-1'>
        <div className='flex items-center gap-2 justify-self-start'>
          <button className='p-2 rounded-full bg-accent-shade-300'>
            <ArrowBackRounded className='stroke-accent-tint-500 fill-accent-tint-500' />
          </button>
          <span className='font-semibold text-accent-shade-500 text-xl'>
            Back
          </span>
        </div>
        <h3 className='font-bold text-2xl  absolute left-1/2 transform -translate-x-1/2'>
          {`${heading}`}
        </h3>
        <div className="w-12"></div>
      </nav>
  )
}

export default SignUpNav
