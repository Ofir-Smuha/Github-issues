import React, { Component } from 'react';

type Props = {};

type State = {
  hasError: boolean
};

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false
  };

  // static getDerivedStateFromError(error) {
  //   return { hasError: true };
  // }

  componentDidMount() {
    console.log(this.props.children);
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
