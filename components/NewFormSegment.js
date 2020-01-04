import { useState, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import {
  Form,
  Segment,
  Dropdown,
  Input,
  Reveal,
  Button
} from "semantic-ui-react";

export default props => {
  console.log("isCreating", props.isCreating);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    props.isCreating ? setHeight("auto") : setHeight(0);
  }, [props.isCreating]);

  return (
    <AnimateHeight
      duration={400}
      height={height}
      onAnimationEnd={() => props.onAnimationEnd}
    >
      <Segment className="newForm">
        <Form>
          <Form.Group>
            <Form.Field>
              <label>Field Name</label>
              <Input
                name="newFieldName"
                placeholder="Field Name"
                onChange={props.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Field Type</label>
              <Dropdown
                name="newFieldType"
                selection
                placeholder={"Field Types"}
                options={props.fieldTypes}
                onChange={props.onChange}
              />
            </Form.Field>
          </Form.Group>
          <Button
            className="edit"
            color="black"
            basic
            onClick={() => props.onCancelClick()}
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    </AnimateHeight>
  );
};
