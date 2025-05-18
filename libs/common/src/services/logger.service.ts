import {Injectable} from "@nestjs/common";
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
const { combine, timestamp, prettyPrint, printf } = format;
import { v4 as uuid } from 'uuid';
import configuration from "../configuration";

@Injectable()
export class LoggerService {
    constructor () {
        let config: Record<string, any> = {};

        try {
            config = configuration();
        } catch (error) {
            throw error;
        }

        const timezoned = () => {
            return new Date().toLocaleString('ko-kr', {
                timeZone: 'Asia/Seoul'
            });
        }

        const fileFormat = combine(
            timestamp({
                format: timezoned
            }),
            prettyPrint(),
            format.json()
        );

        const consoleFormat = combine(
            timestamp({
                format: timezoned
            }),
            prettyPrint(),
            printf(
                ({ level, message, timestamp }) => {
                    return `[${level}] - (${timestamp}) : ${JSON.stringify(message)}`
                }
            )
        );

        const fileNameDatePattern = 'YYYY-MM-DD';
        const zippedArchive = true;
        const maxSize = '20m';
        const id = uuid();

        const combinedLogPath: string = config.paths?.log ? `${config.paths?.log}/%DATE%/%DATE%_combined_${id}.log` : `logs/%DATE%/%DATE%_combined.log`;
        const commonFileTransportsOption: DailyRotateFileTransportOptions = {
            datePattern: fileNameDatePattern,
            zippedArchive: zippedArchive,
            maxSize: maxSize,
            format: fileFormat,
            filename: combinedLogPath
        }

        const errorLogPath: string = "production" === config.paths?.log ? `${config.paths?.log}/%DATE%/errors/%DATE%_error_${id}.log` : `logs/%DATE%/errors/%DATE%_error.log`;
        const errorFileTransportsOption: DailyRotateFileTransportOptions = {
            datePattern: fileNameDatePattern,
            zippedArchive: zippedArchive,
            maxSize: maxSize,
            format: fileFormat,
            filename: errorLogPath,
            level: "error"
        }

        const transportsOption: (DailyRotateFile | transports.ConsoleTransportInstance)[] = [
            new transports.DailyRotateFile(errorFileTransportsOption),
            new transports.DailyRotateFile(commonFileTransportsOption)
        ];

        if ('production' !== process.env.NODE_ENV) {
            transportsOption.push(new transports.Console({ format: consoleFormat }));
        }

        this.logger = createLogger({transports: transportsOption});
    }

    private logger: Logger;

    public info(message: any) {
        this.logger.info(message);
    }

    public error(message: any) {
        this.logger.error(message);
    }
}