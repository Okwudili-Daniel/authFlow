"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const mainError_1 = require("./error/mainError");
const errorHandler_1 = require("./error/errorHandler");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => {
    try {
        app.get("/api/v1/auth", userRouter_1.default);
        app.set("view engine", "ejs");
        app.get("/view", (req, res) => {
            try {
                const user = {
                    userName: "Peter",
                    email: ""
                };
                res.render("index.ejs");
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error loading"
                });
            }
        });
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Hello"
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Invalid"
                });
            }
        });
        app.all("*", (req, res, next) => {
            next(new mainError_1.mainError({
                name: "Route Error",
                message: `This route ${req.originalUrl} does not exist`,
                status: mainError_1.HTTP.BAD_REQUEST,
                success: false
            }));
        });
        app.use(errorHandler_1.errorHandler);
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
