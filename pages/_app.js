import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "../components/CartContext";
import { SessionProvider } from "next-auth/react"

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
      
    </>
  );
}