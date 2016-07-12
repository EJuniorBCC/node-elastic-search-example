var elastic = require('../modules/elasticsearch');

var docAction = {
	create: function(req, res) {
		console.log(req.body);
		elastic.createDocument()
			.then(function(success) {
				res.json({
					status: 'success',
					data: success
				});
			}).catch(function(err) {
				res.json({
					status: 'error',
					data: err
				});
			});
	},
	search: function(req, res) {
		elastic.suggest(req.params.query)
			.then(function(success) {
				res.json({
					status: 'success',
					data: success
				});
			}).catch(function(err) {
				res.json({
					status: 'error',
					data: err
				});
			});

	}
}

module.exports = docAction