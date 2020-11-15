import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from '@fortawesome/free-solid-svg-icons';

export default function Heading(props) {
  return (
    <h1>
      {props.children}
      <Button style={{ marginLeft: '1rem' }} onClick={ props.onRefresh }>
        <FontAwesomeIcon icon={ faSync } />
      </Button>
    </h1>
  );
}

Heading.defaultProps = {
  onRefresh: () => {},
};
