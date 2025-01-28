import mongoose from "mongoose";

export const connectDb = async () => {
	const connectionStatus = mongoose.connection.readyState;

	if (connectionStatus == 1) return;

	try {
		const db = await mongoose.connect(process.env.MONGO_URI!);
		console.log(`Db Connected: ${db.connection.name}🛢️`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
