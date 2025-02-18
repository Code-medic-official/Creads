import {
	Home,
	MessageSquareDot,
	MessageSquareText,
	PlusCircle,
	User,
	Users2,
} from "lucide-react";

export const LEFT_PANNEL_LINKS: {
	icon: React.JSX.Element;
	path: string;
	label: string;
}[] = [
	{ label: "Fyp", path: "/feeds", icon: <Home /> },
	// { label: "Search", path: "/search", icon: <Search /> },
	{ label: "Chat", path: "/chat", icon: <MessageSquareText /> },
	{
		label: "Create",
		path: "/create-thread",
		icon: <PlusCircle stroke="#874ced" size={24} />,
	},
	{ label: "Communities", path: "/communities", icon: <Users2 /> },
	{ label: "Profile", path: "/profile", icon: <User /> },
];

export const HOME_NAV = [
	{
		name: "Home",
		link: "/",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "About",
		link: "/about",
		icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Contact",
		link: "/contact",
		icon: (
			<MessageSquareDot className="h-4 w-4 text-neutral-500 dark:text-white" />
		),
	},
];

export const THREAD_PRIVACY = ["PUBLIC", "PRIVATE", "FRIENDS"];

export const DEMO_PAGES = [
	{
		title: "Fyp",
		value: "fyp",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Fyp Page</p>
			</div>
		),
	},
	{
		title: "Communities",
		value: "communities",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Communites Page</p>
			</div>
		),
	},
	{
		title: "Comments",
		value: "comment",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Comments Page</p>
			</div>
		),
	},
	{
		title: "Create",
		value: "create",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Create Page</p>
			</div>
		),
	},
	{
		title: "Profile",
		value: "profile",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Profile Page</p>
			</div>
		),
	},
	{
		title: "Community",
		value: "community",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Community Page</p>
			</div>
		),
	},
	{
		title: "Search",
		value: "search",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
				<p>Search Page</p>
			</div>
		),
	},
];


export const TECH_STACKS = [
  {
    title: "Next.js",
    link: "https://nextjs.org/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    description: "Next.js is a React framework with server-side rendering, static site generation, and SEO optimization for high-performance apps."
  },
  {
    title: "React",
    link: "https://react.dev/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "React is a powerful JavaScript library for building dynamic, reusable UI components with a virtual DOM for efficiency."
  },
  {
    title: "TypeScript",
    link: "https://www.typescriptlang.org/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    description: "TypeScript adds static typing to JavaScript, improving code quality, maintainability, and developer productivity."
  },
  {
    title: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    description: "Tailwind CSS is a utility-first framework for fast, responsive, and modern UI design with minimal custom styling."
  },
  {
    title: "MongoDB",
    link: "https://www.mongodb.com/",
    icon: "https://icon.icepanel.io/Technology/svg/MongoDB.svg",
    description: "MongoDB is a NoSQL database that provides flexibility, scalability, and efficient document-based data storage."
  },
  {
    title: "Mongoose",
    link: "https://mongoosejs.com/",
    icon: "https://icon.icepanel.io/Technology/svg/Mongoose.js.svg",
    description: "Mongoose is an object modeling tool for MongoDB, simplifying schema validation and database interactions in Node.js."
  },
  {
    title: "Clerk Authentication",
    link: "https://clerk.com/",
    icon: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_c58d5fd4ba449e621bdcd01ac1f00976/clerk-dev.png",
    description: "Clerk simplifies authentication with social logins, multi-factor authentication, and session management for web apps."
  },
  {
    title: "shadcn/ui",
    link: "https://ui.shadcn.com/",
    icon: "https://ui.shadcn.com/favicon.ico",
    description: "shadcn/ui provides customizable, accessible components built with Radix UI and Tailwind CSS for modern web apps."
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com/",
    icon: "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75",
    description: "Aceternity UI offers beautiful, accessible UI components for fast and modern web development."
  },
  {
    title: "Lucide Icons",
    link: "https://lucide.dev/",
    icon: "https://lucide.dev/favicon.ico",
    description: "Lucide Icons is an open-source, customizable SVG icon library for consistent, modern UI design."
  }
];

