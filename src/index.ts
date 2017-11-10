import dva from 'dva';
import './index.less';
import RouteConfig from './router'
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example'));
app.model(require('./models/global'));
app.model(require("./models/trade"));

// 4. Router
app.router(RouteConfig.routeConfig);

// 5. Start
app.start('#root');
