import { axios } from "axios";
export const HandleDownloadReceipt = async (moduelId: any) => {
  let receiptdownloaddata;
  await axios({
    method: "post",
    url: `${api_url}/downloadreceiptbytrxid`,
    data: reqData,
    responseType: "arraybuffer",
    headers: {
      Authorization: auth_token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/pdf",
    },
  })
    .then((response: any) => {
      if (response) {
        receiptdownloaddata = response;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  return receiptdownloaddata;
};

export const HandleModuleGetByID = async (moduelId: any) => {
  let receiptdownloaddata;
  await axios({
    method: "post",
    url: `${api_url}/downloadreceipt`,
    data: reqData,
    responseType: "arraybuffer",
    headers: {
      Authorization: auth_token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/pdf",
    },
  })
    .then((response: any) => {
      if (response) {
        receiptdownloaddata = response;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  return receiptdownloaddata;
};
