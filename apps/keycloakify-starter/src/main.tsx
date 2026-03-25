import { createRoot } from "react-dom/client";
import { StrictMode, Component } from "react";
import type { ReactNode } from "react";
import { KcPage } from "./kc.gen";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
    state = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error: error.message };
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{ padding: "2rem", fontFamily: "monospace", background: "#1a0000", color: "#ff6b6b", minHeight: "100vh" }}>
                    <h2>Render Error</h2>
                    <pre>{this.state.error}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

const root = document.getElementById("root");

if (!root) {
    document.body.innerHTML = "<h1>Error: #root element not found</h1>";
} else {
    createRoot(root).render(
        <StrictMode>
            <ErrorBoundary>
                {!window.kcContext ? (
                    <h1>No Keycloak Context</h1>
                ) : (
                    <KcPage kcContext={window.kcContext} />
                )}
            </ErrorBoundary>
        </StrictMode>
    );
}
