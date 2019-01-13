import {IsEnum, IsNotEmpty, IsOptional, IsUrl, Max, Min} from 'class-validator';
import {IsObject} from '../validator/IsObjectValidator';
export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
export class CreateTask {
    @IsNotEmpty()
    @IsUrl()
    url: string;
    @IsNotEmpty()
    @IsEnum(HttpMethods)
    method: string;
    @IsNotEmpty()
    @Min(0)
    @Max(43200) // 12 hours
    remindMeAfter: number; // in seconds
    @IsOptional()
    @IsObject()
    body?: Object;
    @IsOptional()
    @IsObject()
    headers?: Object;
}
