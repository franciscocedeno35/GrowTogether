import './Overview.css';

function Overview() {
  return (
    <header>
        <div class='welcomer'>
            <h1>Hello, Username</h1>
            <button id='settings'>Settings</button>
        </div>
        <hr></hr>
        <div id='titles'>
            <h2>Campaigns Backed:</h2>
            <h2>Your Campaigns:</h2>
        </div>
        <div class='a'>
            <div id='backed'>
                <div id='present'>
                    <div id='imgPresent'></div>
                    <div id='info'>
                        <h2>Campaign Title</h2>
                        <h3>Progress $###/$###</h3>
                        <text>Created By Username</text>
                        <h5 id='contribution'>Total Contributed: $###</h5>
                    </div>
                </div>
                <h3 id='rewardsPromised'>Rewards Promised:</h3>
                <div class='rewardsSummary' id='rewards1'>
                    <div class='rewardTitle' id='rewardTitle1'>
                        <h3 class='title'>Reward Title</h3>
                        <h3 class='price'>Reward Price: $###</h3>
                    </div>
                    <p id='summary1'>Summary</p>
                    <div class='rewardInfo'>
                        <text class='delivery' id='delivery1'>Delivery XX/XX/XXXX</text>
                        <text class='purchased' id='purchased1'>Purchased on XX/XX/XXXX</text>
                    </div>
                </div>
                <div class='rewardsSummary' id='rewards2'>
                    <div class='rewardTitle' id='rewardTitle2'>
                    <h3 class='title'>Reward Title</h3>
                        <h3 class='price'>Reward Price: $###</h3>
                    </div>
                    <p id='summary2'>Summary</p>
                    <div class='rewardInfo'>
                        <text class='delivery' id='delivery2'>Delivery XX/XX/XXXX</text>
                        <text class='purchased' id='purchased2'>Purchased on XX/XX/XXXX</text>
                    </div>
                </div>
                <div class='rewardsSummary' id='rewards3'>
                    <div class='rewardTitle' id='rewardTitle3'>
                    <h3 class='title'>Reward Title</h3>
                        <h3 class='price'>Reward Price: $###</h3>
                    </div>
                    <p id='summary3'>Summary</p>
                    <div class='rewardInfo'>
                        <text class='delivery' id='delivery3'>Delivery XX/XX/XXXX</text>
                        <text class='purchased' id='purchased3'>Purchased on XX/XX/XXXX</text>
                    </div>
                </div>
            </div>
            <div id='yourCampaigns'>
                <div class='campaign' id='campaign1'>
                    <div class='img' id='imageCamp1'></div>
                    <div id='srcCamp1'>
                        <h4>Project 1</h4>
                        <text>Status Text</text>
                    </div>
                </div>
                <div class='campaign' id='campaign2'>
                    <div class='img' id='imageCamp2'></div>
                    <div id='srcCamp2'>
                        <h4>Project 2</h4>
                        <text>Status Text</text>
                    </div>
                </div>
                <div class='campaign' id='campaign3'>
                    <div class='img' id='imageCamp3'></div>
                    <div id='srcCamp3'>
                        <h4>Project 3</h4>
                        <text>Status Text</text>
                    </div>
                </div>
                <div class='campaign' id='newCamp'>
                    <button id='add'>Add</button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Overview