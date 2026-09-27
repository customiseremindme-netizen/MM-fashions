import { Component, type ReactNode } from "react";
import { RouteError } from "./RouteError";

/** Catches a page that fails to load (e.g. an old chunk after a new deploy). */
export class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <RouteError /> : this.props.children;
  }
}
