# ⭐ Next JS 14 💫

## 📅 File Conventions.

### 🪄 `📜page.jsx` - _Main page of route dir._

👉 This is the main Page that loads up when the directory route is active.

### 🪄 `📜layout.jsx` - _creating common layout in children pages._

The **root Layout** `📁app/layout.jsx` file structures general layout of **Entire app**. Mostly used to add layouts like, **Headers** & **Footers**
👉 Basically for sharing of UI components amoung child components.

##### This can be also be used in subfolders😲.

You can define layout by exporting a react Components from a `📜layout.jsx` file. This file **MUST** accept a `children` prop that will b populated by child components.

E.g `📁blog/📜layout.jsx`

```jsx
import React from "react";

const BlogLayout = ({ children }) => {
	return (
		<div>
			<h3 className="text-3xl">Blog Layout📜📜.</h3>
			{children}
		</div>
	);
};

export default BlogLayout;
```

> 🚨Note
> Passing data btw parent layout & its children is **Note possible**. However u can fetch the same data in a route more than once, & React will automatically **Dedupe🔎** the request without affecting the poerformance.

### 🪄 `📜loading.jsx` Show page loader:

👉 Create a file named `📁blog/📜loading.jsx` under route dir

```jsx
import React from "react";

const Loading = () => {
	return <div>Loading page...</div>;
};

export default Loading;
```

### 🪄 `📜error.jsx` - _Custom Error Layout when page loads incorrectly._

MUST be **"client comeponent"**
👉 Create the `/📜error.jsx` file in **respective route folder**.

> Takes 2 params:
> `error` : Error details
> `reset`: A function to reset the error boundary: (basically **Try again**)

```jsx
"use client";

import Link from "next/link";
import React from "react";

export default function AdminError({ error, reset }) {
	console.log(error);

	return (
		<div>
			<h3>Sorry Admin loading Error occured!</h3>
			<div>
				<Link href="/">Back Home</Link>

				{/* // Attempt to recover by trying to re-render the segment */}
				<button onClick={() => reset()}>Try again</button>
			</div>
		</div>
	);
}
```

> #### 🧙‍♂️ Note the following
>
> - To handle errors for a specific layout, place an `📜error.js` file in **layouts parent segment**.
> - To handle errors within the root layout, use a variation of error.js called `📜app/global-error.js`.
>
> ```jsx
> "use client";
>
> import React from "react";
>
> export default function GlobalError({ error, reset }) {
> 	return (
> 		<html>
> 			<body>
> 				<h4>Something went wrong!</h4>
> 				<button onClick={() => reset()}>Try Again</button>
> 			</body>
> 		</html>
> 	);
> }
> ```

### 🪄 `📜not-found.jsx` - _Custom 404 page (notfound)_:

👉 Create file named `📁app/📜not-found.jsx` in app dir.

```jsx
import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<div className="space-y-2">
			<h2 className="text-3xl fontl-semibold">404 page not found😭</h2>
			<Link href={"/"} className="border p-2 rounded-md">
				Back home
			</Link>
		</div>
	);
};

export default NotFound;
```

---

---

> ## 🧙‍♂️ When to use Server compnents Vs. Client components.
>
> | Task                                                                  | Server component | Client component |
> | --------------------------------------------------------------------- | ---------------- | ---------------- |
> | Fetch data                                                            | ✅               | ⚠️               |
> | Access backend resources directly                                     | ✅               | ❌               |
> | Keep sensitive info on server(Access tokens/api keys etc)             | ✅               | ❌               |
> | Keep Large dependency on server/ reduce client-side JS.               | ✅               | ❌               |
> | Using Element Events(`onClick()`/`onChange`)                          | ❌               | ✅               |
> | Using Hooks, State & lifecycle effects                                | ❌               | ✅               |
> | Using Browser-only APIs                                               | ❌               | ✅               |
> | Using Custom hooks that depend on state, effects or browser-only APIs | ❌               | ✅               |
> | Using react class components                                          | ❌               | ✅               |

---

---

## 🌟 Routing ✈️

> To create new Route;
> 👉 Create a folder Under `📁/app` directory and name it as the **Pathname**
> 👉 Within the path-folder, create a file called `📜page.jsx`.(**Strict**)

> For Nexted routing, just do the same procedure under a **Sub-folder Route.**

### ✍️ Dynamic Routes/url Params `📁[param_name]`

👉 Create a folder name it with the param name in squarebrackets `/📁[param]`.
👉 Then create `📜page.jsx` (strict)

> Params are stored inside a prop called `params`

To access the params;

```jsx
import React from "react";

function BlogPost({ params }) {
	console.log(params);

	return <div>BlogPost</div>;
}

export default BlogPost;
```

### ✍️ Catch-all Routes `[...param_name]`

Allows you to capture multiple url segments in one param (`array`)
e.g:
Route Example URL params
|Route|eample url|params|
|---|---|---|
|`app/shop/[...slug]/page.js`| /shop/a| `{ slug: ['a'] }`|
|`app/shop/[...slug]/page.js`| /shop/a/b| `{ slug: ['a', 'b'] }`|
|`app/shop/[...slug]/page.js`| /shop/a/b/c| `{ slug: ['a', 'b', 'c'] }`|

### ✍️ Optional Catch-all routes `[[...param_name]]`

The difference between catch-all and optional catch-all segments is that with optional, the route without the parameter is also matched (/shop in the example above).

> 🚨 When using this, parent's folder(📁shop) `📜page.js` **is not needed**.

| **Route**                      | **Eg URL**  | **Params**                  |
| ------------------------------ | ----------- | --------------------------- |
| `app/shop/[[...slug]]/page.js` | /shop       | `{}`                        |
| `app/shop/[[...slug]]/page.js` | /shop/a     | `{ slug: ['a'] }`           |
| `app/shop/[[...slug]]/page.js` | /shop/a/b   | `{ slug: ['a', 'b'] }`      |
| `app/shop/[[...slug]]/page.js` | /shop/a/b/c | `{ slug: ['a', 'b', 'c'] }` |

### 1️⃣ Grouping Routes `()`.

> To group related routes, yet without creating a parent route folder:

👉 Create a parent folder for ur related route Folders, and name it in `brackets()` e.g `/📁(auth)`
👉 Place all related routes under this Folder.

> Route of `/auth` **is not** created

---

### 2️⃣ Linking🔗 and Navigating✈️.

#### ✍️ `<Link />` component (Recommeded✅).

> NextJs has `<Link />` component used for client-side naviagation btw routes.
> Specify the path and Link title ie `<Link href={path} >{link-title}</Link>`

| Prop         | Default       | Definition                                                                                |
| ------------ | ------------- | ----------------------------------------------------------------------------------------- |
| **href**     | `href={null}` | Path to Url u want to navigate to.                                                        |
| **replace**  | `false`       | Replaces current history state instead of adding new url to browser history pack          |
| **scroll**   | `true`        | Scroll to top of new route & maintain scroll position for backward & forwards navigation. |
| **prefetch** | `null`        |                                                                                           |

##### 🪄 `href` can also accepts a URL objects:

```js
// Navigate to /about?name=test
<Link
  href={{pathname: "/about",
    query: {name: "test"}
  }}>
  About
<Link/>

/**
 * This HREF obj can have:
 * {
 *  pathname?,
 *  query?,
 *  href?,
 *  hash?,
 *  host?,
 *  hostname?,
 *  port?,
 *  protocal?,
 *  search?,
 *  slashes?
 * }
*/
```

##### 🪄 Linking to dynamic routes

```jsx
// ✅ Using template literals.
<Link href={`/shop/${encodeURIComponent(slug)}`}>Link name</Link>

// ✅ Using URL objects
<Link
  href={{
    pathname: '/blog/[slug]',
    query: { slug: post.slug },
  }}
>
  {post.title}
</Link>
```

> ☝️ `encodeURIComponent` is used in the example to keep the path utf-8 compatible.

> ##### 🧙‍♂️ Note the following
>
> ###### 👉 If child is a custom component that wraps an `<a>` tag.
>
> Then you **MUST** add a `passref` prop to `<Link />`. Especially when using **Styled components**.
>
> ```js
> const RedLink = styled.a`
> 	color: red;
> `;
>
> export default function NavLink({ href, name }) {
> 	return (
> 		<Link href={href} passHref legacyBehavior>
> 			<RedLink>{name}</RedLink>
> 		</Link>
> 	);
> }
> ```

#### ✍️ `useRouter()` hook🪝

Used to access the `router obj` inside function for manual routing.

```jsx
const NavLink = ({ title, path }) => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(path)} // 👉 Use route.push([path]) to navigate.
			className={`py-1 px-3 rounded-lg ${
				pathname === path ? "bg-slate-800 text-white font-medium" : null
			}`}
		>
			{title}
		</button>
	);
};
```

#### ✍️ `UsePathname` hook🪝

> Gets the **`current Route`** of the page.

> ##### 🚨 Note: Whenever u use hook, use `"use client"`

```jsx
const NavLink = ({ title, path }) => {
	const pathname = usePathname();

	return (
		<Link
			href={path}
			className={`py-1 px-3 rounded-lg ${
				pathname === path ? "bg-slate-800 text-white font-medium" : null
			}`}
		>
			{title}
		</Link>
	);
};
```

### 3️⃣ Redirecting

#### ✍️ Redirect function

Function allows you to redirect the user to another URL. You can call redirect in Server Components, Route Handlers, and Server Actions.

```ts
"use client";

export default function Product({ params }) {
	const router = useRouter();

	useEffect(() => {
		params.productId[0] == "lenovo" && redirect("/shop"); // 👉 Redirect user to another Path.
	}, []);

	return (
		<div>
			<div className="space-y-2 p-3">
				{PRODUCTS.map((product, i) => (
					<Link
						href={`/shop/${encodeURIComponent(product.name.toLowerCase())}`}
					>
						View
					</Link>
				))}
			</div>
		</div>
	);
}
```

> #### 🚨 Note the Following
>
> 👉 **`redirect`** returns a **307** (Temporary Redirect) status code by default. When used in a Server Action, it returns a 303 (See Other), which is commonly used for redirecting to a success page as a result of a POST request.
>
> - **`redirect`** internally throws an error so should be called **outside of `try/catch` blocks**.
> - **`redirect`** can be called in Client Components during rendering process but 🛑**not in event handlers**. 🧙‍♂️You can use the **useRouter hook🪝** instead.
> - **`redirect`** also accepts absolute URLs and can be used to redirect to external links.
> - If you'd like to redirect before the render process, use `**next.config.js**` or `**Middleware

### 4️⃣ Private folders (`📁_folderName`)
Private folder indicates that's a private implemetation detail & **should not be considured in the Routing System**
Folder & all its sub folders are excluded from routing.

Some usecases include:
- Separating UI logic from routing logic
- Consistently organising internal files across project.
- For sorting and grouping files in Code editors.
- Avoiding potential naming conflicts in future Next.js Convensions.

### 5️⃣ Parallel Routing (`📁@folderName`)
Allows simultaneous or conditional rendering of **one or more pages within the same layout**.
Useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.
 
#### ✍️Slots*🔎
Parallel routes are created using named **slots**. Slots are defined with the **@folder** convention.
Slots are passed **as props** to the shared **parent layout**. For the example above, the component in app/layout.js now accepts the `@analytics` and `@team` slots props, and can render them in parallel alongside the children prop:


```jsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

> However, slots are n**ot route segments** and **do not affect the URL structure**. For example, for `/@analytics/views`, the URL will be `/views` since `@analytics` is a slot.

---
---
## 🌟 MetaData

There are two ways you can add metadata to your application:

- **Config-based Metadata**: Export a static metadata object or a dynamic `generateMetadata()` function in a `layout.js` or `page.js` file.
- **File-based Metadata**: Add static or dynamically generated special files to route segments.

> #### 🚨Good to know:
>
> - Both static and dynamic metadata through generateMetadata are **only `supported in Server Components`.**
> - Fetch requests are automatically memoized for the same data across `generateMetadata`, `generateStaticParams`, Layouts, Pages, and Server Components. React cache can be used if fetch is unavailable.
> - Next.js will wait for data fetching inside `generateMetadata` to complete before streaming UI to the client. This guarantees the first part of a streamed response includes <head> tags.

### 1️⃣ Static Metadata

To define static metadata, export a **Metadata object** from a `layout.js` or static `page.js` file.

```tsx
// 🛑 Mostly done in /📁app/📜page.js
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "...",
	description: "...",
};

export default function Page() {}
```

> 🚨 This can only be declared **ONLY ONCE** in the application.

### 2️⃣ Dynamic Metadata (`generateMetadata({params, searchParams})`).

Allows you to dynamically change metadata across different Pages.

```jsx
import React from "react";
import { metadata } from "../layout";

export const generateMetadata = ({ params, searchParams }) => {
	console.log(params);
	return { title: "Blog Pages", description: "Get all your blogs here!" };
};

const BlogLayout = ({ children }) => {
	return (
		<div>
			<h3 className="text-3xl">Blog Layout📜📜.</h3>
			{children}
		</div>
	);
};

export default BlogLayout;
```
#### Basic Fields

```js
export const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
```

> #### 🧙‍♂️ Good to know
>
> `params` prop: An object containing the dynamic route parameters object from the root segment down to the segment generateMetadata is called from. Examples:
> |Route| URL| params|
> |---|---|---|
> |`app/shop/[slug]/page.js`| `/shop/1`| `{ slug: '1' }`|
> |`app/shop/[tag]/[item]/page.js`| `/shop/1/2`| `{ tag: '1', item: '2' }`|
> |`app/shop/[...slug]/page.js`| `/shop/1/2`| `{ slug: ['1', '2'] }`|
>
> `searchParams` - An object containing the current URL's search params. Examples:
> |URL| searchParams|
> |---|---|
> |`/shop?a=1`|`{ a: '1' }`|
> |`/shop?a=1&b=2`|`{ a: '1', b: '2' }`|
> |`/shop?a=1&a=2`|`{ a: ['1', '2'] }`|
>
> - `searchParams` are only available in **`page.js` segments**.
> - The `redirect()` and `notFound()` Next.js methods can also be used inside generateMetadata.

### 3️⃣ Filebased metadata

These special files are available for metadata:

- favicon.ico, apple-icon.jpg, and icon.jpg
- opengraph-image.jpg and twitter-image.jpg
- robots.txt
- sitemap.xml

> File-based metadata has the higher priority and will override any config-based metadata.

## 🌟 `<Images/>` Component

```jsx
import Image from 'next/image'

export default function Page() {
  return
    <Image
      src="/profile.png" // 👉 Next.Js has Direct access to public files so '/public/profile.png' is ❌.
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}
```

| **Prop**              | Example                                  | Type            | Status     |
| --------------------- | ---------------------------------------- | --------------- | ---------- |
| **src**               | `src="/profile.png"	`                     | String          | Required   |
| **width**             | `width={500}`                            | Integer (px)    | Required   |
| **height**            | `height={500}`                           | Integer (px)    | Required   |
| **alt**               | `alt="Picture of the author"`            | String          | Required   |
| **loader**            | `loader={imageLoader}`                   | Function        | -          |
| **fill**              | `fill={true}`                            | Boolean         | -          |
| **sizes**             | `sizes="(max-width: 768px) 100vw, 33vw"` | String          | -          |
| **quality**           | `quality={80}`                           | Integer (1-100) | -          |
| **priority**          | `priority={true}`                        | Boolean         | -          |
| **placeholder**       | `placeholder="blur"`                     | String          | -          |
| **style**             | `style={{objectFit: "contain"}}`         | Object          | -          |
| **onLoadingComplete** | `onLoadingComplete={img => done())}`     | Function        | Deprecated |
| **onLoad**            | `onLoad={event => done())}`              | Function        | -          |
| **onError**           | `onError(event => fail()}`               | Function        | -          |
| **loading**           | `loading="lazy"`                         | String          | -          |
| **blurDataURL**       | `blurDataURL="data:image/jpeg..."`       | String          | -          |
| **overrideSrc**       | `overrideSrc="/seo.png"`                 | String          | -          |

> #### 🧙‍♂️ Good to know
>
> - 👉 `width` & `height` props are **required** except for **statically imported images**.
>
> ```jsx
> import Image from "next/image";
> import docImg from "@/public/doctor.jpg";
>
> const Blog = () => {
> 	return (
> 		<div>
> 			<Image
> 				src={docImg}
> 				alt="doctor-page"
> 				// width={500} automatically provided
> 				// height={500} automatically provided
> 				// blurDataURL="data:..." automatically provided
> 				// placeholder="blur" // Optional blur-up while loading
> 			/>
> 		</div>
> 	);
> };
>
> export default BlogLayout;
> ```
>
> - 👉 The `width` and `height` do not determine the rendered size of the image file
>
> - 👉 When using `fill`, the parent element must have `position: relative`: This is necessary for the proper rendering of the image element in that layout mode.
> - 👉 When using `fill`, parent element must have `display: block`.

### 1️⃣ `priority` prop

You should add the priority property to the image that will be the Largest Contentful Paint (LCP) element for each page.
Doing so allows Next.js to specially prioritize the image for loading (e.g. through preload tags or priority hints), leading to a meaningful boost in LCP.

```jsx
<Image src={profilePic} alt="Picture of the author" priority />
```

---

---

## 🌟 Fonts✍️.

| Key            | Type                       | Required          |
| -------------- | -------------------------- | ----------------- |
| `src`          | String or Array of Objects | Yes               |
| `weight`       | String or Array            | Required/Optional |
| `style`        | String or Array            | -                 |
| `subsets`      | Array of Strings           | -                 |
| `axes`         | Array of Strings           | -                 |
| `display`      | String                     | -                 |
| `preload`      | Boolean                    | -                 |
| `fallback`     | Array of Strings           | -                 |
| `FontFallback` | Boolean or String          | -                 |
| `variable`     | String                     | -                 |
| `declarations` | Array of Objects           | -                 |

### 1️⃣ Google Fonts

Get started by importing the font you would like to use from next/font/google as a function. We recommend using **variable fonts** for the best performance and flexibility.

> To use the font in all your pages, add it to `/📜_app.j`s file under `📜/pages` as shown below:

```jsx
import { Inter } from 'next/font/google'
 
//✅ If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}> // 👉 Apply the font Like this.
      <Component {...pageProps} />
    </main>
  )
}
```

You can also specify other options:
```jsx
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
```

---
---
## 🌟 API Routes🌐

> **Good to know:** If you are using the App Router, you can use Server Components or Route Handlers instead of API Routes.

Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an **API endpoint** instead of a page. They are **server-side only** bundles and won't increase your client-side bundle size.

> API Routes can't be used with **static exports**. However, **Route Handlers** in the App Router can. 
> API Routes are affected by pageExtensions configuration in `next.config.js`.

```js
import { NextResponse } from "next/server"

export const GET = (req, res) => {
  return NextResponse.json({response: "Hello Users"}, {status: 200})
}
```

Example Handler
```ts
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
```
### 1️⃣ Dynamic API ROUTE `[param]`

Just like app routes, use `[param]` convenstion to add url params.
Access them from the `response.params` object:

👉 Create a folder `📁[folder]/📜route.js`

```js
import { NextResponse } from "next/server";

export const GET = (req, res) => {
	console.log(res.params); // 👉 {id: "242032389"}
	return NextResponse.json({ user: res.params.id });
};
```
---
---
## 🌟 Middlewares 🔛
Middleware runs before cached content and routes are matched. See Matching Paths for more details.

Use file `middleware.ts` (or **.js**) in **root of project** to define Middleware. For example, at the same level as **pages** or **app**, or inside **src** if applicable.

> 🚨Note: While only one `middleware.ts` file is supported per project, you can still organize your middleware logic modularly.
> Break out middleware functionalities into separate .ts or .js files and import them into your main middleware.ts file.
> This allows for cleaner management of route-specific middleware, aggregated in the middleware.ts for centralized control.
>  By enforcing a single middleware file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple middleware layers.

👉Basic Example
```js
import { NextResponse } from "next/server";

export const middleware = (req) => {
	console.log("Middleware Hello", req.nextUrl);
	return NextResponse.json({ message: "middleware running!" });
};

export const config = {
	matcher: "/shop/:path*",
};
```

### 1️⃣ Matching Paths

### ✍️ Matcher

👉 Matching single paths
```js
export const config = {
  matcher: '/about/:path*',
}
```

👉 Matching multiple paths:

```js
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

👉 The matcher config allows full regex so matching like negative lookaheads or character matching is supported. E.g:

```js
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```
> #### Configured matchers:
> 
> - MUST start with `/`
> - Can include named parameters: `/about/:path` matches `/about/a` & `/about/b` but not `/about/a/c`
> - Can have modifiers on named parameters (starting with `:`): `/about/:path*` matches `/about/a/b/c` because 
>> - `*` **is zero or more**.
>> - `?` is **zero or one**
>> - `+` **one or more**
> - Can use regular expression enclosed in parenthesis: `/about/(.*)` is the same as `/about/:path*`

### ✍️ Conditional statements:

```js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```
### 2️⃣ Using Cookies `request.cookies`

Access cookies using **RequestCookie** API

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('nextjs') // => { name: 'nextjs', value: 'fast', Path: '/' }

  const allCookies = request.cookies.getAll() // => [{ name: 'nextjs', value: 'fast' }]
 
  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
 
  return response
}
```
---
---

## 🌟 Environment Variables.

```env
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```
👉 This loads `process.env.DB_HOST`, `process.env.DB_USER`, and `process.env.DB_PASS`

> ### 🪄 Referencing Other Variables `$`
> Eg. `$VARIABLE` inside of your .env* files. This allows you to reference other secrets. Ie:
> ```
> TWITTER_USER=nextjs
> TWITTER_URL=https://twitter.com/$TWITTER_USER
> ```
> 👉 If you need to use variable with a $ in the actual value, it needs to be escaped e.g. `\$`. 
