import React from 'react';
import { Form } from 'reactstrap';

import '../../styles.css';

const FormCard = props => {
  return (
    <div className="auth-form">
      <div className="card text-center container py-5 px-4">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-5">{props.title}</h2>
            <Form>
              {props.children}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
