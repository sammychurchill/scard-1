import React from "react";
import App from "next/app";

import ComputerMenu from "../components/Menu";
import MobileTabletMenu from "../components/MobileMenu";
import { Responsive, Transition } from "semantic-ui-react";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        {!router.route && (
          <>
            <Responsive maxWidth={852}>
              <MobileTabletMenu />
            </Responsive>
            <Responsive minWidth={852}>
              <ComputerMenu />
            </Responsive>
          </>
        )}
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
