import { Component, ErrorInfo, ReactNode } from 'react';
import Text from '../Text';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            // You can customize the error message and UI here
            return (
                <div>
                    <Text color="red">An error occurred:</Text>
                    <pre>{this.state.error && this.state.error.toString()}</pre>
                    <Text color="red">Component Stack Error Details:</Text>
                    <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
