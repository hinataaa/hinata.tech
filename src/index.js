import dva from 'dva'
import './index.css'

// 1. Initialize
// const app = dva({
// 	initialState: {
// 		products: [{
// 			id: 1, key: 1, name: 'dva',
// 		}, {
// 			id: 2, key: 2, name: 'antd',
// 		}],
// 	},
// })
const app = dva()

// 2. Plugins
// app.use({})

// 3. Model
// app.model(require('./models/user').default)
// app.model(require('./models/koala').default)
// app.model(require('./models/menus').default)

// 4. Router
app.router(require('./route.jsx').default)

// 5. Start
app.start('#root')
