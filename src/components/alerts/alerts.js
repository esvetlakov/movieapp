import { Alert } from 'antd';
import './alerts.css';

export default function Alerts(props) {
  const { alert } = props;
  if (alert) {
    const { status, msg } = alert;
    if (msg === 'Failed to fetch') {
      return (
        <Alert
          message={`Error! ${msg}`}
          description="Check your Internet connection or try to use VPN"
          type="error"
          showIcon
          closable
          className="alert"
        />
      );
    }
    if (msg === 'Empty request') {
      return (
        <Alert
          message={`Error! ${msg}`}
          description="The query cannot be empty or contain only whitespaces"
          type="error"
          showIcon
          closable
          className="alert"
        />
      );
    }
    if (status === 'not found') {
      return <Alert message="Nothing was found, try to change the query" type="warning" closable className="alert" />;
    }
    if (status === 'success') {
      return <Alert message="Rating successfully changed" type="success" closable className="alert" />;
    }
  }
}
