// src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { ExceptionContext } from '../contexts/ExceptionContext';
import { CafferoException, UIException } from '../exceptions';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ExceptionContext.Consumer>
          {(context) => {
            if (context) {
              context.setException(new UIException("An error occurred"));
            }
            return this.props.fallback;
          }}
        </ExceptionContext.Consumer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;