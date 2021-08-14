const Router = require('koa-router');
const router = new Router();
const home = require('./home')
const list = require('./list')
const login = require('./login')
const upload = require('./upload')
const shop = require('./shop')
const tree = require('./tree')
const employee = require('./employee')

router.use('/home', home.routes(), home.allowedMethods());
router.use('/list', list.routes(), list.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());
router.use('/shop', shop.routes(), shop.allowedMethods());
router.use('/tree', tree.routes(), tree.allowedMethods());
router.use('/employee', employee.routes(), employee.allowedMethods());

module.exports = router;
