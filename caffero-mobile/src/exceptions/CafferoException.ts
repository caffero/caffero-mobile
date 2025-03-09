import { ApiErrorResult } from "api/models/ApiResponse";

export class CafferoException extends Error {
    constructor(
        message: string,
        public details?: string
    ) {
        super(message);
        this.name = 'CafferoException';
    }
}

export class UIException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'UIException';
    }
}

export class ApiException extends CafferoException {
    constructor(
        message: string,
        public statusCode: number,
        details?: string
    ) {
        super(message, details);
        this.name = 'ApiException';
    }
}

export class NetworkException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'NetworkException';
    }
}

export class TimeoutException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'TimeoutException';
    }
}

export class InvalidStateException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'InvalidStateException';
    }
}

export class UnauthorizedAccessException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'UnauthorizedAccessException';
    }
}

export class PermissionDeniedException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'PermissionDeniedException';
    }
}

export class DeviceCapabilityException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'DeviceCapabilityException';
    }
}

export class StorageException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'StorageException';
    }
}

export class InvalidInputException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'InvalidInputException';
    }
}

export class MissingDataException extends CafferoException {
    constructor(message: string, details?: string) {
        super(message, details);
        this.name = 'MissingDataException';
    }
} 