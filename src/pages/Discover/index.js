import AssetCoins from "./Components/AssetCoins/AssetCoins";
import MarketOverview from "./Components/MarketOverview/MarketOverview";
function Discover() {
    return (
        <section style={{marginLeft: '30px'}}>
            <AssetCoins/>
            <MarketOverview/>
        </section>
        
    );
}

export default Discover;