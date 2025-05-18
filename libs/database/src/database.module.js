"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const common_2 = require("../../common/src");
const schema_module_1 = require("./schema.module");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            common_2.CommonModule,
            mongoose_1.MongooseModule.forRootAsync({
                connectionName: 'auth',
                imports: [common_2.CommonModule],
                useFactory: (cfg) => ({
                    uri: cfg.get('database')?.auth?.url ?? '',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user: cfg.get('database')?.auth?.id ?? '',
                    pass: cfg.get('database')?.auth?.pw ?? '',
                    authSource: cfg.get('database')?.auth?.auth_source ?? '',
                    autoCreate: true,
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                connectionName: 'event',
                imports: [common_2.CommonModule],
                useFactory: (cfg) => ({
                    uri: cfg.get('database')?.event?.url ?? '',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user: cfg.get('database')?.auth?.id ?? '',
                    pass: cfg.get('database')?.auth?.pw ?? '',
                    authSource: cfg.get('database')?.auth?.auth_source ?? '',
                    autoCreate: true,
                }),
                inject: [config_1.ConfigService],
            }),
            schema_module_1.SchemaModule,
        ],
        exports: [mongoose_1.MongooseModule, schema_module_1.SchemaModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map