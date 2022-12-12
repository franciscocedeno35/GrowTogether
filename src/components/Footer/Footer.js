import './Footer.css';
import { BsFacebook } from 'react-icons/bs';
// import Button from "./Button";

function Footer() {
	return (
		<footer>
			{/* <hr className="whiteLine"></hr> */}
			{/* <div id="divFoot">
				<Button id="arts" text="Arts" />
				<Button id="comics" text="Comics & Illustration" />
				<Button id="design" text="Design & Tech" />
				<Button id="film" text="Film" />
				<Button id="food" text="Food" />
				<Button id="games" text="Games" />
				<Button id="music" text="Arts & Craft" />
				<Button id="publishing" text="Publishing" />
			</div> */}
			<hr className="whiteLine"></hr>
			<div id="additionalInfo">
				<section>
					<div className="infoLists">
						<ul>
							<p className="footer-title-header">ABOUT</p>
							<a href="">About us</a>
						</ul>
						<ul>
							<a href="">Our Charter</a>
						</ul>
						<ul>
							<a href="">Stats</a>
						</ul>
						<ul>
							<a href="">Press</a>
						</ul>
						<ul>
							<a href="">Jobs</a>
						</ul>
						<br />
						<ul>
							<h1 id="h1Foot">GrowTogether</h1>
						</ul>
					</div>
				</section>
				<section>
					<div className="infoLists2">
						<ul>
							<p className="footer-title-header">SUPPORT</p>
							<a href="">Help Center</a>
						</ul>
						<ul>
							<a href="">Our Rules</a>
						</ul>
						<ul>
							<a href="">Creator Resources</a>
						</ul>
						<ul>
							<a href="">Forward Funds</a>
						</ul>
						<ul>
							<a href="">Brand Assets</a>
						</ul>
					</div>
				</section>
				<section>
					<div className="infoLists3">
						<ul>
							<p className="footer-title-header">MORE FROM GrowTogether</p>
							<a href="">Newsletters</a>
						</ul>
						<ul>
							<a href="">GrowTogether Project Updates</a>
						</ul>
						<ul>
							<a href="">The Creative Independent</a>
						</ul>
						<ul>
							<a href="">Mobile Apps</a>
						</ul>
						<ul>
							<a href="">Research</a>
						</ul>
						<br/>
						<ul className="Social-media">
							<a href="">
								<img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" />{' '}
							</a>
							<a href="">
								<img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />{' '}
								<a href="">
									<img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" />{' '}
									<a href="">
										<img src="https://cdn-icons-png.flaticon.com/512/3938/3938026.png" />{' '}
									</a>
								</a>
							</a>
						</ul>
					</div>
				</section>
			</div>
			<hr className="whiteLine"></hr>
			<div id="divFoot2">
				<a href="">Trust & Safety </a>
				<a href="">Terms of Use</a>
				<a href=""> Privacy Policy </a>

				<a href=""> Cookie Policy</a>
				<a href=""> Accessibility</a>
				<a href=""> Statement</a>
				<a href=""> CA</a>
				<a href=""> Notice of Consent</a>
			</div>
		</footer>
	);
}
export default Footer;
