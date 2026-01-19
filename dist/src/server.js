"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
dotenv_1.default.config();
const svr = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
svr.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
svr.use(express_1.default.json());
svr.use(express_1.default.urlencoded({ extended: true }));
svr.use((0, cookie_parser_1.default)());
svr.use('/api/auth', auth_routes_1.default);
svr.use('/api/booking', booking_route_1.default);
svr.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
//# sourceMappingURL=server.js.map