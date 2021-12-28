import { getMeshSDK, Sdk } from '../.mesh';
import fetch from 'node-fetch';

const init = async (id: string, secret: string): Promise<{ sdk: Sdk }> => {
  console.log("initiating Green Invoice's sdk...");

  const authParams = {
    id,
    secret,
  };
  const greenInvoiceToken = await fetch('https://api.greeninvoice.co.il/api/v1/account/token', {
    method: 'POST',
    body: JSON.stringify(authParams),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res: { token: string }) => res.token);

  process.env.GREEN_INVOICE_AUTH_TOKEN = greenInvoiceToken;

  const sdk = await getMeshSDK();

  return { sdk };
};

export * from '../.mesh';
export { init };
