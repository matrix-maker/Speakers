import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const useRequestDelay = (delayTime = 1000, initialData = []) => {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const delayData = async () => {
      try {
        await delay(delayTime);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(initialData);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    };
    delayData();
  }, []);

  const updateRecord = (recordUpdated, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.map((rec) => {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    const delayData = async () => {
      try {
        setData(newRecords);
        await delay(delayTime);
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
        await delay(delayTime);
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
        await delay(delayTime);
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

export default useRequestDelay;
