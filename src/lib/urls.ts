import urlcat from "urlcat";

// Reverse url
//  route: '/users/:id/comments/:commentId'
//  args:	 { id: 42, commentId: 86 }
//  result: '/users/42/comments/86'
export function reverse(route: string, args: any) {
  return urlcat(process.env.NEXT_PUBLIC_API_ENDPOINT, route, args);
}
