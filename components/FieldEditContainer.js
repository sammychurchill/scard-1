import React from "react";
import FieldEmail from "./FieldEmail";
import FieldText from "./FieldText";
import ConfigureEmail from "./ConfigureEmail";
import { Form, Grid, Image, Segment, Transition } from "semantic-ui-react";

class FieldEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: null, visible: false, editing: false };
  }

  componentDidMount() {
    const item = this.setItem();
    this.setState({ item });
  }

  setItem() {
    const fieldData = this.props.fieldData;
    let item;
    switch (fieldData.type) {
      case "text": //TODO: Use types
        item = <FieldText {...this.props} />;
        break;

      case "email": //TODO: Use types
        item = <FieldEmail {...this.props} />;
        break;

      default:
        break;
    }
    return item;
  }

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Form>{this.state.item}</Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <ConfigureEmail {...this.props} />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FieldEditContainer;
