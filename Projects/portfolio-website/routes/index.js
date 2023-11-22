// Full Documentation - https://docs.turbo360.co/
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')

const CDN = (process.env.TURBO_ENV=='dev') ? null : process.env.CDN

router.get('/', (req, res) => {
	const data = {cdn: CDN}
	turbo.pageConfig('home', process.env.TURBO_API_KEY, process.env.TURBO_ENV)
	.then(homeConfig => {
		data['page'] = homeConfig
		let ctr = new controllers.post()
		return ctr.get()
	})
	.then(posts => {
		data['posts'] = posts
		let ctr = new controllers.service()
		return ctr.get()
	})
	.then(services => {
		data['services'] = services
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		res.render('home', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/blog', (req, res) => {
	const data = {cdn: CDN}

	let ctr = new controllers.post()
	ctr.get()
	.then(posts => {
		data['posts'] = posts
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		res.render('blog', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/post/:slug', (req, res) => {
	const data = {cdn: CDN}

	let ctr = new controllers.post()
	ctr.get({slug:req.params.slug})
	.then(posts => {
		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

		data['post'] = posts[0]
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		res.render('post', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

module.exports = router
