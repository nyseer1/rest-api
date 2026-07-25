"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BackToTopButton from "@/components/BackToTopButton";
``;

export default function AddListing() {
	const [isDesktop, setDesktop] = useState<boolean>(false);

	//listing info
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const saveListing = () => {
		const data = { name, description };

		// todo make http get request here with no body, get all
		//
	};
	const newListing = () => {
		setName("");
		setDescription("");
		setSubmitted(false);
	};

	const updateMedia = () => {
		setDesktop(window.innerWidth > 600);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});
	return (
		<div className="adaptive">
			<div id="home" className="adaptive">
				<Navbar />
				{/* test */}
				{isDesktop ? (
					<br style={{ lineHeight: 3 }} />
				) : (
					<br style={{ lineHeight: 6 }} />
				)}
			</div>
			{/* todo shop image here */}
			<h2>Software Shop</h2>
			<div id="shop" className="cardGrid">
				<div className="card">
					<Image
						src="/img_avatar.png"
						alt="NLCSynthPadLogo"
						width={500}
						height={500}
						style={{ width: "100%" }}
					/>
					<h4>
						<b>NLC Synth Pad</b>
					</h4>
					<p>
						Highly advanced touch synth pads. Capable of quickly creating
						complex rhythms and melodies through user gestures.
					</p>
				</div>
				<div className="card">
					<Image
						src="/img_avatar.png"
						alt="NLCSynthPadLogo"
						width={500}
						height={500}
						style={{ width: "100%" }}
					/>
					<h4>
						<b>NLC Synth Pad</b>
					</h4>
					<p>
						Highly advanced touch synth pads. Capable of quickly creating
						complex rhythms and melodies through user gestures.
					</p>
				</div>
				<div className="card">
					<Image
						src="/img_avatar.png"
						alt="NLCSynthPadLogo"
						width={500}
						height={500}
						style={{ width: "100%" }}
					/>
					<h4>
						<b>NLC Synth Pad</b>
					</h4>
					<p>
						Highly advanced touch synth pads. Capable of quickly creating
						complex rhythms and melodies through user gestures.
					</p>
				</div>
			</div>

			<div id="contact">
				{/* test */}
				<h2>Contact</h2>
				<p className="contact-p">
					<b>Phone:</b> <a href="tel:+1-347-579-9610">(347)-579-9610</a>
					<br />
					<b>Email:</b>{" "}
					<a
						href="mailto:nyseer.couse@gmail.com"
						aria-label="nyseer.couse@gmail.com"
					>
						nyseer.couse@gmail.com
					</a>
					<br />
				</p>
				{/* todo add back to top button here */}
				<br style={{ lineHeight: 10 }} />
			</div>
			<BackToTopButton />
			{/* poo */}
		</div>
	);
}
