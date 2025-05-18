import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService, LoggerService, UserInterface, TypeRole, TypeToken } from '@nx-assignment/common';
import fs from "fs";
import {v4 as uuid} from "uuid";

@Injectable()
export class AuthJwtService {
    private readonly _issuer: string;
    private readonly _audience: string;
    private readonly _privateAccessKey: string;
    private readonly _publicAccessKey: string;
    private readonly _privateRefreshKey: string;
    private readonly _publicRefreshKey: string;
    private readonly _expireAccess: number;
    private readonly _expireRefresh: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly loggerService: LoggerService,
    ) {
        const serviceLevel = this.configService.get('service')?.level ?? 'development';
        this._issuer = this.configService.get('security')?.jwt?.issuer ?? '';
        this._audience = this.configService.get('security')?.jwt?.audience ?? '';

        let privateAccessKey = "";
        let publicAccessKey = "";
        try {
            privateAccessKey = fs.readFileSync((this.configService.get('security')?.jwt?.access?.private ?? ''), { encoding: "utf8" });
            publicAccessKey = fs.readFileSync((this.configService.get('security')?.jwt?.access?.public ?? ''), { encoding: "utf8" });
        } catch (error: any) {
            this.loggerService.error(`${AuthJwtService.name} - constructor(readAccessKey): ${error.stack}`);
        }
        this._privateAccessKey = privateAccessKey;
        this._publicAccessKey = publicAccessKey;

        let privateRefreshKey = "";
        let publicRefreshKey = "";
        try {
            privateRefreshKey = fs.readFileSync((this.configService.get('security')?.jwt?.refresh?.private ?? ''), { encoding: "utf8" });
            publicRefreshKey = fs.readFileSync((this.configService.get('security')?.jwt?.refresh?.public ?? ''), { encoding: "utf8" });
        } catch (error: any) {
            this.loggerService.error(`${AuthJwtService.name} - constructor(readRefreshKey): ${error.stack}`);
        }
        this._privateRefreshKey = privateRefreshKey;
        this._publicRefreshKey = publicRefreshKey;

        let expireAccess = 1;
        let expireRefresh = 1;

        try {
            expireAccess = parseInt((this.configService.get('security')?.jwt?.access?.expire ?? '1'));
        } catch (error: any) {
            this.loggerService.error(`${AuthJwtService.name} - constructor(parse expireAccess): ${error.stack}`);
        }

        try {
            expireRefresh = parseInt((this.configService.get('security')?.jwt?.refresh?.expire ?? '1'));
        } catch (error: any) {
            this.loggerService.error(`${AuthJwtService.name} - constructor(parse expireRefresh): ${error.stack}`);
        }

        this._expireAccess = expireAccess;
        this._expireRefresh = expireRefresh;
    }

    public async generateAccessToken(user: UserInterface): Promise<string> {
        if (!this._privateAccessKey) {
            this.loggerService.error(`${AuthJwtService.name} - ${this.generateAccessToken.name}: JWT access private key is empty.`);
            return '';
        }

        if (1 > user.roles.length) {
            this.loggerService.error(`${AuthJwtService.name} - ${this.generateAccessToken.name}: the user role is empty.`);
            return '';
        }

        let accessToken = '';
        const jwtid = uuid();

        try {
            accessToken = this.jwtService.sign({
                type: TypeToken.Access,
                id: user.uid,
                roles: user.roles,
                nick: user.nick
            }, {
                privateKey: this._privateAccessKey,
                issuer: this._issuer,
                audience: this._audience,
                jwtid: jwtid,
                expiresIn: 60 * this._expireAccess,
                algorithm: "RS256",
            });
        } catch (error: any) {
            this.loggerService.error(`${AuthJwtService.name} - ${this.generateAccessToken.name}: failed to generate access token.`);
        }

        return accessToken;
    }

    public async generateRefreshToken(user: UserInterface): Promise<string> {
        if (!this._privateRefreshKey) {
            this.loggerService.error(`${AuthJwtService.name} - ${this.generateRefreshToken.name}: JWT refresh private key is empty.`);
            return "";
        }

        if (1 > user.roles.length) {
            this.loggerService.error(`${AuthJwtService.name} - ${this.generateRefreshToken.name}: the user role is empty.`);
            return "";
        }

        let refreshToken = '';

        try {
            refreshToken = this.jwtService.sign({
                type: TypeToken.Refresh,
                id: user.uid,
                roles: user.roles,
                nick: user.nick
            }, {
                privateKey: this._privateRefreshKey,
                issuer: this._issuer,
                audience: this._audience,
                jwtid: uuid(),
                expiresIn: 60 * this._expireRefresh,
                algorithm: "RS256",
            });
        } catch (error: any) {
            this.loggerService.error(`${AuthJwtService.name} - ${this.generateRefreshToken.name}: failed to generate refresh token.`);
        }

        return refreshToken;
    }
}