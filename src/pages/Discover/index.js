import AssetCoins from "./Components/AssetCoins/AssetCoins";
import MarketOverviewDetail from "./Components/MarketOverviewDetail/MarketOverviewDetail";
function Discover() {
    return (
        <section style={{ marginLeft: '30px' }}>
            <AssetCoins />
            <MarketOverviewDetail />
        </section>
    );
}

export default Discover;