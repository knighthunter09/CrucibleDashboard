/**
 * Created by VIJETA on 25/10/2014.
 */
exports.pathConfigData = "./app/config/data/all";

exports.crucibleServerHost = 'localhost';
exports.cruciblePort = '8060';
exports.filter = "/rest-service/reviews-v1/filter/?FEAUTH=";
exports.filterClosed = "/rest-service/reviews-v1/filter/closed?FEAUTH=";
exports.filterDraft = "/rest-service/reviews-v1/filter/drafts?FEAUTH=";
exports.filterTrash = "/rest-service/reviews-v1/filter/trash?FEAUTH=";
exports.filterAllReviews = "/rest-service/reviews-v1/filter/allOpenReviews?FEAUTH=";

//Eg: http://localhost:8060/rest-service/reviews-v1/CR-1/transition?FEAUTH=admin:8:18e5f06a79495c4709ecade41af71ade&action=action:closeReview
exports.transitionPath="/rest-service/reviews-v1/";
exports.transitionAction = "/transition?";
exports.authenticateUser = "/rest-service/auth-v1/login";

//exports.filter = "/rest-service/reviews-v1/filter/?FEAUTH=admin:8:18e5f06a79495c4709ecade41af71ade";
//exports.filterClosed = "/rest-service/reviews-v1/filter/closed?FEAUTH=admin:8:18e5f06a79495c4709ecade41af71ade";
//exports.filterDraft = "/rest-service/reviews-v1/filter/drafts?FEAUTH=admin:8:18e5f06a79495c4709ecade41af71ade";
//exports.filterTrash = "/rest-service/reviews-v1/filter/trash?FEAUTH=admin:8:18e5f06a79495c4709ecade41af71ade";
//exports.filterAllReviews = "/rest-service/reviews-v1/filter/allOpenReviews?FEAUTH=admin:8:18e5f06a79495c4709ecade41af71ade";
