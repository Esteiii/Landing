import axios from 'axios';

export default axios.create({
    baseURL: 'https://af-simplera-ecom-dev-001.azurewebsites.net/api',
    headers: {
        "Content-Type": "application/json",
        orgId: "ECOM001",
      },
});