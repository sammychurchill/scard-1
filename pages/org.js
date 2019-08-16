import Router from "next/router";
import Link from "next/link";
import React from "react";
import uuid from "uuid";

import getOrg from "../utils/getOrg";
import BasicHoverButton from "../components/BasicHoverButton";
import MainContainer from "../components/MainContainer";

import "semantic-ui-css/semantic.min.css";
import { List, Label, Grid } from "semantic-ui-react";

class Index extends React.Component {
  static async getInitialProps({ query }) {
    const orgDoc = await getOrg(query.id);
    const org = orgDoc.data();
    const formPromises = org.forms.map(async formRef => {
      const formDoc = await formRef.get();
      const form = formDoc.data();
      return { id: formRef.id, displayName: form.displayName };
    });
    return { forms: await Promise.all(formPromises) };
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
                  New Form
                </BasicHoverButton>
              </div>
            </Grid.Row>
            <Grid.Row>
              <List>
                {this.props.forms.map(form => {
                  return (
                    form.displayName && (
                      <Link href={`/form/${form.id}`}>
                        <List.Item key={form.id} as="a">
                          {form.displayName}
                        </List.Item>
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
