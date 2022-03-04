import { useState, useEffect } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const reqUrl = "api/speaker";

const useRequestRest = () => {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const delayData = async () => {
      try {
        const result = await axios.get(reqUrl);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(result.data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    };
    delayData();
  }, []);

  const updateRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.map((rec) => {
      return rec.id === record.id ? record : rec;
    });

    const delayData = async () => {
      try {
        setData(newRecords);
        await axios.put(`${reqUrl}/${record.id}`, record);
        if (doneCallback) doneCallback();
      } catch (e) {
        console.log("error inside delay function, ", e);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    };
    delayData();
  };

  const insertRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    const delayData = async () => {
      try {
        setData(newRecords);
        await axios.post(`${reqUrl}/9999`, record);
        if (doneCallback) doneCallback();
      } catch (e) {
        console.log("error inside delay function, ", e);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    };
    delayData();
  };

  const deleteRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.filter((rec) => record.id !== rec.id);

    const delayData = async () => {
      try {
        setData(newRecords);
        await axios.delete(`${reqUrl}/${record.id}`, record);
        if (doneCallback) doneCallback();
      } catch (e) {
        console.log("error inside delay function, ", e);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    };
    delayData();
  };

  return {
    insertRecord,
    deleteRecord,
    updateRecord,
    requestStatus,
    error,
    data,
  };
};

export default useRequestRest;
