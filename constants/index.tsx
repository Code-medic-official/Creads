import { Home, MessageSquareText, PlusCircle, User, Users2 } from "lucide-react";

export const LEFT_PANNEL_LINKS: {
	icon: React.JSX.Element;
	path: string;
	label: string;
}[] = [
	{ label: "Fyp", path: "/feeds", icon: <Home /> },
	// { label: "Search", path: "/search", icon: <Search /> },
	{ label: "Chat", path: "/chat", icon: <MessageSquareText /> },
	{ label: "Create", path: "/create-thread", icon: <PlusCircle stroke="#874ced" size={30} /> },
	{ label: "Communities", path: "/communities", icon: <Users2 /> },
	{ label: "Profile", path: "/profile", icon: <User /> },
];

export const THREAD_PRIVACY = ["PUBLIC", "PRIVATE", "FRIENDS"];
