var services                = require('../services');
var mongoose                = require('mongoose');


var FindOne = function (criteria , projection , option, callback) {
    if(criteria._id){
      criteria._id = mongoose.Types.ObjectId(criteria._id);
    }
    services.userService.findOne(criteria, projection, option, (err,users) => {
            if(err) {
                callback(err);
                return;
            } else {
				          callback(err,users);
            }
        }
    );
}

module.exports = {
	'FindOne'                 : FindOne,
}
