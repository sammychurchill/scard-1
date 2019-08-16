import Router from "next/router";
import Link from "next/link";
import React from "react";
import uuid from "uuid";

import { loadDB } from "../firebase";
import getOrgs from "../utils/getOrgs";
import BasicHoverButton from "../components/BasicHoverButton";
import MainContainer from "../components/MainContainer";

import "semantic-ui-css/semantic.min.css";
import { List, Label, Grid } from "semantic-ui-react";

class Index extends React.Component {
  static async getInitialProps({ res, query }) {
    const orgsSnapshot = await getOrgs();
    const orgs = [];
    orgsSnapshot.forEach(async docRef => {
      const id = docRef.id;
      const displayName = await docRef.data().displayName;
      orgs.push({ id, displayName });
    });
    return { orgs };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <MainContainer>
          <Grid centered textAlign="center">
            <Grid.Row only="tablet computer">
              <div className="desktopPadding" />
            </Grid.Row>
            <Grid.Row>
              <div className="bigButton">
                <BasicHoverButton
                  basicInverted
                  loading={this.state.isCreating}
                  size="massive"
                  color="black"
                  onClick={() => this.newOrg()}
                >
                  New Organization
                </BasicHoverButton>
              </div>
            </Grid.Row>
            <Grid.Row>
              <List>
                {this.props.orgs.map(org => {
                  return (
                    org.displayName && (
                      <Link href={`/org/${org.id}`}>
                        <List.Item as="a">{org.displayName}</List.Item>
                      </Link>
                    )
                  );
                })}
              </List>
            </Grid.Row>
          </Grid>
        </MainContainer>
        <style jsx>{``}</style>
      </>
    );
  }
}

export default Index;
