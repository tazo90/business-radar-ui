import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Provider } from "react-redux";
import { Hydrate } from "react-query/hydration";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "../store";

// Import css
import "@styles/index.scss";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout;
  const queryClientRef = useRef();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
