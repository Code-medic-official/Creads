import React from "react";
import voidImg from "@/public/assets/omega.svg";
import Image from "next/image";

export default function Void({ msg }: { msg: string }) {
	return (
		<div>
			<Image
				src={voidImg}
				alt="Void Image"
				priority
				className="w-2/3 mx-auto mb-3"
			/>
			<p className="text-center font-medium text-sm md:text-base">{msg}</p>
		</div>
	);
}
