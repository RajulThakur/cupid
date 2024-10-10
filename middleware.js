import { auth } from "./auth";

/*import { NextResponse } from "next/server";

function middleware(request) {
  return NextResponse.redirect(new URL('/about',request.url))
}
  
export default middleware;
*/
export const middleware = auth;
export const config = {
  matcher: ["/inbox/:path*"],
};
