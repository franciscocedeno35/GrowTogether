import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Get, GetImage, Patch } from '../../../scripts';
import './CampaignOverview.css';

function CampaignOverview(props) {
	const canBePublished = () => {
		console.log('content length is: ' + campaign.content.length);
		return campaign.content.length > 0;
	};
	const isPublished = () => {
		console.log(campaign.publishDate);
		return campaign.publishDate;
	};
	const location = useLocation();
	const navigate = useNavigate();
	const [userID, setUserID] = useState(localStorage.getItem('userID'));
	const [campaign, setCampaign] = useState({
		title: '',
		subtitle: '',
		description: '',
		mainImage: '',
		imageSrc: '',
		owner: '',
		goal: 1,
		duration: 1,
		content: [],
		rewards: [],
	});
	const [donations, setDonations] = useState([]);
	const [rewardSummaryInfo, setRewardSummaryInfo] = useState([]);

	useEffect(() => {
		console.log(userID);
		if (!userID) {
			// then user is not logged in!!! they shouldn't ever be here!
			navigate('/Login');
		}

		console.log(location.state);
		if (!location.state || !location.state.campaign) {
			// no campaignID!
			console.error('location did not give state or the campaign info we need');
			// safely navigate away
			navigate('/');
		} else {
			// we can assume state.campaign is present.
			populateCampaign(location.state.campaign);
		}
	}, []);

	const populateCampaign = async (c) => {
		if (!c.imageSrc) {
			c.imageSrc = await GetImage(c.mainImage);
		}
		if (c.publishDate) {
			// this is a published campaign! we have to gather helpful information
			const allDonations = await Get(`/donations/${c._id}`, {});
			setDonations(allDonations);
			calculateRewardSummaryInfo(c, allDonations);
			let sum = 0;
			for (let i = 0; i < allDonations.length; i++) {
				sum += allDonations[i].sum;
			}
			c.currentlyDonated = sum;
		}
		// get days to go here.
		const dayInMs = 24 * 60 * 60 * 1000;
		const endInMs = new Date(c.publishDate).getTime() + c.duration * dayInMs;
		const todayInMs = Date.now();
		c.daysToGo = (endInMs - todayInMs) / dayInMs;
		setCampaign({ ...c });
	};

	const calculateRewardSummaryInfo = (c, d) => {
		// const newSummary = [];
		// c.rewards.forEach((reward) => {
		//   newSummary.push(reward);
		// });
		const newSummary = c.rewards;
		console.log(newSummary);
		// c is campaign info
		// d is a list of all donations
		// this function should set rewardSummaryInfo with array that such that
		// each index is an object that contains statistics about the contribution of each reward towards the campaign's goal.
		newSummary.forEach((reward) => {
			const id = reward._id;
			// find how many times this reward has been bought.
			let count = 0;
			d.forEach((donation) => {
				donation.rewards.forEach((purchasedReward) => {
					console.log(id);
					if (purchasedReward._id == id) {
						count++;
					}
				});
			});
			reward.purchaseCount = count;
		});
		console.log(newSummary);
		setRewardSummaryInfo(newSummary);
	};

	const publishCampaign = () => {
		// check if you can publish it (we can assume all values are OK, but we must verify that content is not-empty)
		if (!canBePublished) {
			alert(
				"You Must add something to your campaign's content before publishing!"
			);
			return;
		}
		// prompt to make sure that they truly want to publish right now.
		if (window.confirm('Are you sure you want to publish right now?')) {
			// if so, publish it
			Patch(`unpublishedCampaigns/publish/${campaign._id}/${userID}`, {}).then(
				(publishedCampaign) => {
					//  navigate to /publishedCampaign/Overview/:campaignID
					populateCampaign(publishedCampaign);
				}
			);
		}
	};

	const getUnpublishedOverviewInfo = () => {
		return (
			<div class="containerUnpublished ">
				<div id="unpublishedWarning">
					<div className="flex-column align-center ">
						<h1 className="spacing bold">Your Project is Unpublished!</h1>
						<h3>Please customize your project before publishing.</h3>
						<h3 className="spacing">
							You cannot change your goal, duration, or rewards after publishing
							so make sure they are perfect before you publish!
						</h3>
					</div>
				</div>
			</div>
		);
	};

	const getOverviewInfo = () => {
		return (
			<div className="flex-column align-center">
				<div className="campaign-overview-main-container ">
					{/* <hr className="whitLine "></hr> */}
					<div className="overview-text">
						<h1>Overview</h1>
					</div>
					<div className="campaign-overview-stats">
						<div className="campaign-overview-text-size">
							<h3>Funding Progress</h3>
						</div>
						<div className="campaign-overview-text-size">
							<h5>
								Progress: {campaign.currentlyDonated} / {campaign.goal}
							</h5>
						</div>

						<div className="campaign-overview-text-size">
							<h3>TimeLeft </h3>
						</div>
						<div className="campaign-overview-text-size">
							<h5> {campaign.daysToGo} Days</h5>
						</div>

						<div className="campaign-overview-text-size">
							<h3>Views </h3>
						</div>
						<div className="campaign-overview-text-size">
							<h5>Total Views:{campaign.views.length} </h5>
						</div>

						<div className="campaign-overview-text-size">
							<h3>Conversion Percentage </h3>
						</div>
						<div className="campaign-overview-text-size">
							<h5>
								{' '}
								{donations.length} / {campaign.views.length} ={' '}
								{donations.length / campaign.views.length}%
							</h5>
						</div>
					</div>

					<div className="campaign-overview-stats campaign-overview-text-size">
						<h1>Reward Information</h1>
					</div>
					<div className="test55">
						<div className="overview-reward-summary">
							{rewardSummaryInfo.map((r) => {
								return (
									<div
										className="flex-column overview-reward-summary-srction"
										key={r._id}>
										<h3>{r.name}</h3>
										<div className="reward-description">
											Description: {r.description}
										</div>
										<div>
											Price: ${r.price}
											<div className="Expected-delivery">
												Expected Delivery Date:{r.expectedDeliveryDate}
											</div>
										</div>

										<hr className="reward-line"></hr>
										<div>Times Bought: {r.purchaseCount}</div>
										<div>Total Earned: {r.purchaseCount * r.price}</div>
										<div>
											Percentage Responsible:{' '}
											{(r.purchaseCount * r.price) / campaign.goal}%
										</div>
										<div>Idk, and some other interesting statistics.</div>
									</div>
								);
							})}
						</div>
					</div>
					<hr />
				</div>
			</div>
		);
	};

	return (
		<div className="campaign-overview white">
			<h1 className="flex-row justify-center link-line">{campaign.title}</h1>
			<h5 className="flex-row justify-center ">{campaign.subtitle}</h5>
			<hr className="whitLine "></hr>

			<div className="flex-row justify-space-around ">
				<Link
					to={'/Campaign/Settings/' + campaign._id}
					state={{ campaign: campaign, userID: userID }}>
					Settings
				</Link>
				<Link
					to={'/Campaign/Content/' + campaign._id}
					state={{ campaign: campaign, userID: userID }}>
					Content
				</Link>
				{isPublished() ? (
					''
				) : (
					<Link
						to={'/Campaign/Rewards/' + campaign._id}
						state={{ campaign: campaign, userID: userID }}>
						Rewards
					</Link>
				)}
				{isPublished() ? (
					''
				) : (
					<button
						className="white"
						disabled={!canBePublished()}
						onClick={publishCampaign}>
						PUBLISH
					</button>
				)}
			</div>
			<hr className="whitLine "></hr>

			{/* <p>{campaign.description}</p> */}
			{/* <img className="overview-image-preview" src={campaign.imageSrc} alt="Main Image" /> */}
			{isPublished() ? getOverviewInfo() : getUnpublishedOverviewInfo()}
		</div>
	);
}
export default CampaignOverview;
