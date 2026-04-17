import {createApplication} from './app.js';
// import {spawnVite} from './server-vite.js';
import {stockMarketService} from './stock_market/service.js';
import {rateLimitService} from './admin_services/rate_limit_service.js';

const app = createApplication();

if (!process.env.BACKEND_PORT) {
  console.error('BACKEND_PORT environment variable is not set. Defaulting to 3001.');
  process.env.BACKEND_PORT = 3001;
}
const port = process.env.BACKEND_PORT;

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
}, 10_000); // Start after 5 seconds

// spawnVite();

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
