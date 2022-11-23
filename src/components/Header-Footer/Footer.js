import "./Footer.css";
import Button from "./Button";

function Footer() {
  return (
		<footer>
			<div id="divFoot">
				<Button id="arts" text="Arts" />
				<Button id="comics" text="Comics & Illustration" />
				<Button id="design" text="Design & Tech" />
				<Button id="film" text="Film" />
				<Button id="food" text="Food" />
				<Button id="games" text="Games" />
				<Button id="music" text="Arts & Craft" />
				<Button id="publishing" text="Publishing" />
			</div>
			<hr></hr>
			<div id="additionalInfo">
				<section>
					<h2>ABOUT</h2>
					<div className="infoLists">
						<ul>
							<Button id="aboutUs" text="About Us" />
						</ul>
						<ul>
							<Button id="charter" text="Our Charter" />
						</ul>
						<ul>
							<Button id="stats" text="Stats" />
						</ul>
						<ul>
							<Button id="press" text="Press" />
						</ul>
						<ul>
							<Button id="jobs" text="Jobs" />
						</ul>
					</div>
				</section>
				<section>
					<h2>Support</h2>
					<div className="infoLists">
						<ul>
							<Button id="help" text="Help Center" />
						</ul>
						<ul>
							<Button id="aboutUs" text="About Us" />
						</ul>
						<ul>
							<Button id="charter" text="Our Charter" />
						</ul>
						<ul>
							<Button id="stats" text="Stats" />
						</ul>
						<ul>
							<Button id="press" text="Press" />
						</ul>
						<ul>
							<Button id="jobs" text="Jobs" />
						</ul>
					</div>
				</section>
				<section>
					<h2>More From GrowTogether</h2>
					<div className="infoLists">
						<ul>
							<Button id="news" text="Newsletters" />
						</ul>
						<ul>
							<Button id="updates" text="GrowTogether Project Updates" />
						</ul>
						<ul>
							<Button id="create" text="The Creative Independent" />
						</ul>
						<ul>
							<Button id="apps" text="Mobile Apps" />
						</ul>
						<ul>
							<Button id="research" text="Research" />
						</ul>
					</div>
				</section>
			</div>
			<h1 id="h1Foot">GrowTogether</h1>
			<hr></hr>
			<div id="divFoot2">
				<Button id="trust" text="Trust & Safety" />
				<Button id="terms" text="Terms of Use" />
				<Button id="privacy" text="Privacy Policy" />
				<Button id="cookie" text="Cookie Policy" />
				<Button id="access" text="Accessibility" />
				<Button id="statement" text="Statement" />
				<Button id="ca" text="CA" />
				<Button id="notice" text="Notice of Consent" />
			</div>
		</footer>
	);
} 
export default Footer