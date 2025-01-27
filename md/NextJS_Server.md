# 🌐 Next.js 15 backend

---

---

Learn how to Make Rest API using Nextjs 15 ➕ MongoDb🍃 ➕ Mongoose

> The Mongoose side of this Is exactly similar to one in **MERN**

---

---

# 🌟 Data Fetching

## 1️⃣ Client Slide

This is the normal way by fetching inside a `useEffect()` hook🪝.

```tsx
"use client";

export default function Home() {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		// 🚨 Fetching Data inside useEffect()
		const fetchAlbums = async () => {
			try {
				const res = await fetch("jsonplaceholder.typicode.com/albums");
				const data = await res.json();

				setAlbums(data);
			} catch (error) {
				consol.error(error);
			}
		};
	}, []);

	return <div>// Do sth with Albums</div>;
}
```

## 2️⃣ Server side fetching (recommnedend✨)

🪄 Shorter, Faster, safer, better SEO, Automatic Request Deduplication, Secure.
🪄 Has reduce request waterfall.
🪄 Allows you to make direct Db calls without need of API
Has Hot Module replacement(HMR) Caching 👉 Faster responses & reduced cost for API calls.

```tsx
export default async function Home() {
	const res = await fetch("jsonplaceholder.typicode.com/albums");

	if (!res.ok) throw new Error("Error fetching Albums");

	return <div>// Do sth with Albums</div>;
}
```

---

---

# ✨ Server Side startegies.

## 1️⃣ Static Site Generation(_SSG_)

This is when HTML pages are generated at `Build-time`

## 2️⃣ Static Rendering (_SSR_) - **Default**

Routes are rendered at build-time or in background after **Data realidation**
**Result is cached** and can be moved to a Content Delivary Network(CDN)

## 3️⃣ Increamental Site Regeneration (_ISG_)

This is an extension of SSG that allows you to update Static content after build.
Perfect for pages whose content updates occationally BUT **doesn't need Real-time Updates**.

Applied by:

### ✍️ Time-based Revalidation:

#### 👉 Validate ENTIRE PAGE after some time

Uses a **route segment config** to Revalidate **entire page ➕ All its requests** after specified seconds.

```tsx
//🧙‍♂️ Set time in SECONDS
export const revalidate = 3600; // 👉 Validate per Hour

export default async function Home() {
	const res = await fetch("jsonplaceholder.typicode.com/albums");

	if (!res.ok) throw new Error("Error fetching Albums");

	return <div>// Do sth with Albums</div>;
}
```

#### 👉 Revalidate REQUEST (only) after some time.

```tsx
export default async function Home() {
	const res = await fetch("jsonplaceholder.typicode.com/albums", {
		next: { revalidate: 3600 }, // 👉 Revalidate request Only per hour.
	});

	if (!res.ok) throw new Error("Error fetching Albums");

	return <div>// Do sth with Albums</div>;
}
```

### ✍️ On-demand Revalidation

More Precise.

#### 👉 Using `revalidatePath()` func

#### 👉 Using (`revalidateTag`)

## 4️⃣ Server Side Rendering (**_SSR_**)

Generates HTML on server in response to User Request, thus unique for each user instead of deployment.
Slower than SSG and heavy on the server buh u always get upto-date content.
Ideal for highly dynamic content or content that needs real-time Data.

Applied by:

### ✍️ Time-based revalidation

Here, set the revalidate time to **ZERO (0)** 👉 Validate only when requested

#### 👉 For entire PAGE

```tsx
//🧙‍♂️ Set time in SECONDS
export const revalidate = 0; // 👉 Validate only when requested

export default async function Home() {
	const res = await fetch("jsonplaceholder.typicode.com/albums");

	if (!res.ok) throw new Error("Error fetching Albums");

	return <div>// Do sth with Albums</div>;
}
```

#### 👉 For specific Request

```tsx
export default async function Home() {
	const res = await fetch("jsonplaceholder.typicode.com/albums", {
		next: { revalidate: 0 }, // 👉 Revalidate request Only per fetch/request.
	});

	if (!res.ok) throw new Error("Error fetching Albums");

	return <div>// Do sth with Albums</div>;
}

// 🧙‍♂️ Or

const res = await fetch("jsonplaceholder.typicode.com/albums", {
	next: { cache: "no-store" }, // 👉 Revalidate request Only per fetch/request.
});
```

## 5️⃣ Partial Pre-rendering (**_PPR_**) `<Suspense />`

Combined static & dynamic rendering.
Allows you to render static shell of page while streaming Synamic content.

---

---

# 🌟 Backend with Server Actions🤩

Are functions running on the Server side allowing you to perform Direct Server functionality like Db interactions, without need of an API🤯
Best organised inside `📁lib/📁actions` folder and named, `📜[func].actions.ts`.

> - 👉 If its a server action file, MUST have `"use server"` at top of file.
> - 👉 If it's only in a component MUST have `"use server"` in beginning of function body

## 🧙‍♂️ Let's create User functionality with Server actions.

👉 Create a file `📁lib/📁actions/📜user.actions.ts`

### 1️⃣ Connecting to database🛢️

👉 Create a file `📁lib/🛢️database/📜db.ts`

```ts
import mongoose from "mongoose";

const connect = async () => {
	const connectionState = mongoose.connection.readyState;

	if (connectionState == 1) {
		console.log("Db Already connected"); // 🚨 Prevent multiple connection to Db.
		return;
	} else if (connectionState == 2) {
		console.log("Connecting...");
		return;
	}

	try {
		const db = await connect(process.env.MONGO_URI);
		console.log(`Db connected: ${db.connection.name}🛢️`);
	} catch (error) {
		console.error("Db not Connected⚠️");
		process.exit(1);
	}
};

export default connect;
```

### 2️⃣ Creating Models.📅:

##### 👉 Create within: `📁lib/🛢️database/📁models/📜[name].model.ts`

```ts
import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		age: Number,
	},
	{ timestamps: true }
);

// 🚨NOTE: do this👇 To prevent creation of multiple instances of model
export default models.User || model("User", userSchema);
```

##### 👉 You will always want to define the TYPE of you model(_to help prevent errors_); To do this:

```ts
import { Document, model, models, Schema } from "mongoose";

// 🚨 DEfine this to aid in your development.
export interface iUser extends Document {
	_id: string;
	username: string;
	email: string;
	password: string;
	age?: number;
}

const userSchema = new Schema({
	// Schema...
});

export default models.User || model("User", userSchema);
```

## 🌟Common Server action operations:

### #️⃣ Upsert Operations:

**`Upsert`** - (_update + insert_) db Operation for updating document if it exists or Insert (create) new Doc if it doesn't exist.

👉 Within a `📁actions/📜user.actions.ts` file

```ts
"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../database/db";
import userModel, { iUser } from "../database/models/user.model";

export const upsertUser = async (user: iUser, pathname): Promise<void> => {
	await connectDb();

	try {
		await userModel.findByIdAndUpdate(
			{ _id: user._id },
			{
				username: user.username,
				email: user.email,
				password: user.password,
				age: user.age,
			},
			{ upsert: true }
		);
	} catch (error) {
		throw new Error(error);
	}

	if (pathname == "/user/profile") revalidatePath(patname);
};
```
### 1️⃣ Fetch Data:

#### 👉Create a `getUsers()` server Action

```ts
export const getUsers = async ():Promise<iUser[]> => {
	try {
		await connectDb();
		const users = await userModel.find();

    return users // 🚨 If sending to Server component
		return JSON.parse(JSON.stringify(users)); // 🚨 If sending to client component
	} catch (error: any) {
		throw new Error(error);
	}
};
```

##### 👉 Getting data in Server Component `🚩 Recommended`

```tsx
import { getUsers } from '@/lib/actions/user.actions'
import { iUser } from '@/lib/database/models/user.model'
import React, { useEffect, useState } from 'react'

export default async function Users() {
  const users = await getUsers() // 👉 Fetching users from db.

  return (
    <div>
      <h3 className='text-3xl' >All Users :</h3>

      <div className='flex items-center gap-3' >
        {users.map(user => <div key={user._id} className='p-2 border rounded-lg' >
          <p className='text-xl font-medium' >{user.username}</p>
          <p>{user.email}</p>
          <p>{user.age}</p>
        </div>)}
      </div>
      
    </div>
  )
}
```

#### 👉 Getting data in *client component*.

You can do this using `useEffect()🪝` hook.

> 🚨 Won't Allow Revalidation.

```tsx
"use client";

import { getUsers } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import React, { useEffect, useState } from "react";

export default function Users() {
	const [users, setUsers] = useState<iUser[]>();

	// 🚨👉 Fetched within useEffect() hook.
	useEffect(() => {
		const fetchUsers = async () => {
			setUsers(await getUsers());
		};

		fetchUsers();
	}, []);

	return (
		<div>
			<h3 className="text-3xl">All Users :</h3>

			<div className="flex items-center gap-3">
				// Handle user data...
			</div>
		</div>
	);
}
```

### 2️⃣ Create Data (POST)

```ts
"use server"

export const createUser = async (user: iUser): Promise<iUser> => {
	await connectDb();

	try {
		const newUser = await userModel.create(user);

		revalidatePath("/users"); // 👉 Invalidates '/users/page.js("server component")' (where users are listed)
		return JSON.parse(JSON.stringify(newUser));
	} catch (error: any) {
		throw new Error(error);
	}
};
```

#### 👉 Create the form Component

`/components/forms/UserForm.tsx`
```ts
"use client"

//imports...

export default function UserForm() {
	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			age: 0,
		},
	});

	// 🚨 Call server action to create Document.
	const createUserHandler = async (data: z.infer<typeof userSchema>) => {
		const newUser = await createUser(data);

		console.log(newUser);
		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(createUserHandler)}
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter username..." />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				//...

				<Button className="rounded-lg space-x-1">
					Create User <User size={20} />
				</Button>
			</form>
		</Form>
	);
}
```
> #### 🪄 Detecting Pending state of Server Action: (`useTransition()`🪝)
>
> ```tsx
> "use client"
> 
> //imports...
> import { useTransition } from "react";
> 
> export default function UserForm() {
> 	const [isPending, startTransition] = useTransition(); // 👈Set up hook
> 
> 	const form = useForm<z.infer<typeof userSchema>>({
> 		//...
> 	});
> 
> 	const createUserHandler = async (data: z.infer<typeof userSchema>) => {
> 		// 🚨 Call server action to inside 'startTransition()' func.
> 		startTransition(() => createUser(data));
> 
> 		form.reset();
> 	};
> 
> 	return (
> 		<Form {...form}>
> 			<form onSubmit={form.handleSubmit(createUserHandler)}>
> 
> 				//...
> 
> 				{isPending ? (
> 					<Button className="rounded-lg space-x-1">
> 						Creating <Loader size={20} className="animate-spin" />
> 					</Button>
> 				) : (
> 					<Button className="rounded-lg space-x-1">
> 						Create User <User size={20} />
> 					</Button>
> 				)}
> 			</form>
> 		</Form>
> 	);
> }
> ```

### 3️⃣ Retrieve Document

Create a `getUser()` server action
```ts
"use server"

export const getUser = async (userId: string): Promise<iUser> => {
	try {
		await connectDb();

		const user = await userModel.findById(userId);

		return JSON.parse(JSON.stringify(user));
	} catch (error) {
		throw new Error(error);
	}
};
```

### 4️⃣ Updating Document.

Create a `updateUser()` server action

```ts
"use server"
```