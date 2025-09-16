import { NextResponse } from "next/server";


const publicRoutes = ["/login","/signup","/public"];

export function middleware(request){
  const token = request.cookies.get("token")?.value;

  let isPublic = false;

  publicRoutes.forEach((path)=>{
    if(request.nextUrl.pathname.startsWith(path)){
      isPublic = true;
    }
  })

  if(!token && !isPublic){
    return NextResponse.redirect(new URL("/login",request.url))
  }

}

// negative matching - telling the middleware to not run for these routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}


// positive matching - telling the middleware to run for these routes
// ["/about","/contact"]