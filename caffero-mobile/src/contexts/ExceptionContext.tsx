import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CafferoException,
  UIException,
  ApiException,
  NetworkException,
  TimeoutException,
  InvalidStateException,
  UnauthorizedAccessException,
  PermissionDeniedException,
  DeviceCapabilityException,
  StorageException,
  InvalidInputException,
  MissingDataException
} from '../exceptions';
import {
  handleUIException,
  handleApiException,
  handleNetworkException,
  handleTimeoutException,
  handleInvalidStateException,
  handleUnauthorizedAccessException,
  handlePermissionDeniedException,
  handleDeviceCapabilityException,
  handleStorageException,
  handleInvalidInputException,
  handleMissingDataException,
} from '../exceptions/handlers';

type ExceptionContextType = {
  exception: CafferoException | null;
  setException: (error: CafferoException) => void;
  throwException: (error: CafferoException) => never;
};

export const ExceptionContext = createContext<ExceptionContextType | undefined>(undefined);

export const ExceptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exception, setException] = useState<CafferoException | null>(null);

  const throwException = (error: CafferoException): never => {
    setException(error);
    throw error;
  };

  useEffect(() => {
    if (!exception) return;

    switch (true) {
      case exception instanceof UIException:
        handleUIException(exception as UIException);
        break;
      case exception instanceof ApiException:
        handleApiException(exception as ApiException);
        break;
      case exception instanceof NetworkException:
        handleNetworkException(exception as NetworkException);
        break;
      case exception instanceof TimeoutException:
        handleTimeoutException(exception as TimeoutException);
        break;
      case exception instanceof InvalidStateException:
        handleInvalidStateException(exception as InvalidStateException);
        break;
      case exception instanceof UnauthorizedAccessException:
        handleUnauthorizedAccessException(exception as UnauthorizedAccessException);
        break;
      case exception instanceof PermissionDeniedException:
        handlePermissionDeniedException(exception as PermissionDeniedException);
        break;
      case exception instanceof DeviceCapabilityException:
        handleDeviceCapabilityException(exception as DeviceCapabilityException);
        break;
      case exception instanceof StorageException:
        handleStorageException(exception as StorageException);
        break;
      case exception instanceof InvalidInputException:
        handleInvalidInputException(exception as InvalidInputException);
        break;
      case exception instanceof MissingDataException:
        handleMissingDataException(exception as MissingDataException);
        break;
      default:
        console.error('Unhandled exception:', exception);
    }

    setException(null);
  }, [exception]);

  return (
    <ExceptionContext.Provider
      value={{
        exception,
        setException,
        throwException,
      }}
    >
      {children}
    </ExceptionContext.Provider>
  );
};

export const useException = () => {
  const context = useContext(ExceptionContext);
  if (context === undefined) {
    throw new Error('useException must be used within an ExceptionProvider');
  }
  return context;
}; 