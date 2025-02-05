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
