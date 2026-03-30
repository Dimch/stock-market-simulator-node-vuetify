import {createApplication} from './app.js';
import {spawnVite} from './server-vite.js';
import {stockMarketService} from './stock_market/service.js';
import {rateLimitService} from './admin_services/rate_limit_service.js';

const app = createApplication();
const port = 3001;

rateLimitService.startUpdate();

stockMarketService.initializeStocks();
setTimeout(() => {
  setInterval(() => {
    try {
      stockMarketService.simulateTick();
    } catch (err) {
      console.error('Error in simulateTick:', err);
    }
  }, 60 * 1000); // Update prices every minute
}, 10000); // Start after 5 seconds

spawnVite();

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
