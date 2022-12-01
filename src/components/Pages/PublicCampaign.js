import { React, useState } from 'react';
import './PublicCampaign.css';

const PublicCampaign = () => {
	const [campaignInfo, setcampaignInfo] = useState({
		title: "meow"
	})
	return (
		<div className="PublicCampaign-test-css">
			<h1>{campaignInfo.title}</h1>
		</div>
	);
};
export default PublicCampaign;
