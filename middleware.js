import { auth } from "./auth";

/*import { NextResponse } from "next/server";

function middleware(request) {
  return NextResponse.redirect(new URL('/about',request.url))
}
  
export default middleware;
*/
export const middleware = function (request) {
  const response = auth(request);
  return response;
};
export const config = {
  matcher: ["/direct/:path*","/api/v1/:path*"],
};
