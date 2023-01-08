import { Alert } from 'antd';
import './errorMessages.css';

export default function ErrorMessages(props) {
  const { error, notFound } = props;
  if (error) {
    return <Alert message="Error: no connection to the server" type="error" showIcon closable className="error" />;
  }
  if (notFound) {
    return <Alert message="Nothing was found, try to change the query" type="warning" closable className="error" />;
  }
}
