import { Form, Input, Message, Button } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

const ContributeForm = (props) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const campaign = Campaign(props.address);
    setLoading(true);
    setErrorMessage('');
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })
      .then(router.push(`/campaigns/${props.address}`))
      .catch(err => setErrorMessage(err));
    setLoading(false);
  }

  return <Form onSubmit={formSubmitHandler} error={errorMessage}>
    <Form.Field>
      <label>Amount to Contribute</label>
      <Input
        value={value}
        onChange={event => setValue(event.target.value)}
        label="ether"
        labelPosition="right"
      />
    </Form.Field>

    {errorMessage && <Message error header="Oops!" content={errorMessage} />}
    <Button primary loading={loading}>
      Contribute!
    </Button>
  </Form>
}

export default ContributeForm;

