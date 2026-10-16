import { lazy, type ComponentType } from "react";

type Module<T> = { default: T };

/**
 * React.lazy that renders without suspending once `preload()` has finished.
 *
 * main.tsx preloads the current page before hydrating. Without that, the page
 * would still be loading when the providers above it update during hydration,
 * and React would then throw away the prerendered HTML and render the page
 * again from scratch (restarting its intro animations).
 */
export function lazyWithPreload<T extends ComponentType<any>>(load: () => Promise<Module<T>>) {
  let loaded: Module<T> | undefined;
  const preload = () => load().then((mod) => (loaded = mod));
  const Component = lazy(() =>
    loaded
      ? // Resolves synchronously, so React renders the page straight away.
        ({ then: (resolve: (mod: Module<T>) => void) => resolve(loaded!) } as unknown as Promise<Module<T>>)
      : preload(),
  );
  return Object.assign(Component, { preload });
}
