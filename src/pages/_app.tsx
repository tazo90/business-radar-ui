import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Hydrate } from "react-query/hydration";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "../store";

// Import css
import "@styles/index.scss";

const Noop = ({ children }) => <>{children}</>;

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;
  const queryClientRef = useRef();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Provider store={store}>
            {/* TODO: layout causes weird error, show console on login page */}
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />
            </Layout>
          </Provider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
