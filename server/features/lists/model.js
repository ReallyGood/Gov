/**
 * Created by Adir on 06/12/2014.
 */
var Lists = {};

Lists.getAll = function() {
	return [
		Lists.getById(1),
		Lists.getById(2),
		Lists.getById(3)
	];
};

Lists.getById = function(id) {
	return {
		id: id,
		name: 'List #' + id
	};
};

module.exports = Lists;
