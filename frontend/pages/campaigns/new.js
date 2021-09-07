import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';


const NewCampaign = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [minimumContribution, setMinimumContribution] = useState(0);

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await factory.methods
        .createCampaign(minimumContribution)
        .send({
          from: accounts[0]
        });

      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  }

  return <Layout>
    <h3> Create a New Campaign</h3>
    <Form onSubmit={onSubmit} error={errorMessage}>
      <Form.Field>
        <label>Minimum Contribution</label>
        <Input
          label="wei"
          labelPosition="right"
          value={minimumContribution}
          onChange={event =>
            setMinimumContribution(event.target.value)}
        />
      </Form.Field>
      {errorMessage && <Message error header="Oops!" content={errorMessage} />}
      <Button loading={loading} primary>
        Create!
          </Button>
    </Form>
  </Layout>
}


export default NewCampaign;