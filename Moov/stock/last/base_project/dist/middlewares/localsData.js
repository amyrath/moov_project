"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localData = localData;
function localData(req, res, next) {
    console.log(req.session);
    res.locals.connected = req.session.connected;
    res.locals.user = req.session.user;
    next();
}
//# sourceMappingURL=localsData.js.map