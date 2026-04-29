import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthAdminStore from "../../store/AuthAdminStore";
import dayjs from "dayjs";

const UpdateFreeDeliveryAmount = () => {
  const [amount, setAmount] = useState("");
  const [currentValue, setCurrentValue] = useState(null);
  const [deliveryEndTime, setDeliveryEndTime] = useState("");
  const [currentDeliveryEndTime, setCurrentDeliveryEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const { token } = useAuthAdminStore();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCurrentValue = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getFreeDeliveryAmount`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentValue(res.data?.data?.value ?? 0);
        const fetchedEndTime = res.data?.data?.freeDeliveryEndTime;
        if (fetchedEndTime) {
          // Format for datetime-local input
          setDeliveryEndTime(dayjs(fetchedEndTime).format("YYYY-MM-DDTHH:mm"));
          setCurrentDeliveryEndTime(new Date(fetchedEndTime));
        } else {
          setDeliveryEndTime("");
          setCurrentDeliveryEndTime(null);
        }
      } catch (err) {
        console.error("Failed to fetch current value", err);
      } finally {
        setFetching(false);
      }
    };
    fetchCurrentValue();
  }, [apiUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount.trim() && !deliveryEndTime) {
      alert("Please enter a valid amount or set a timer.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        value: amount.trim() ? Number(amount) : currentValue,
        freeDeliveryEndTime: deliveryEndTime ? dayjs(deliveryEndTime).toISOString() : null,
      };

      await axios.patch(
        `${apiUrl}/updateFreeDeliveryAmount`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      
      setCurrentValue(amount.trim() ? Number(amount) : currentValue);
      setCurrentDeliveryEndTime(deliveryEndTime ? new Date(deliveryEndTime) : null);
      setAmount("");
      setSnackbar({
        open: true,
        message: "Free delivery settings updated successfully",
        type: "success",
      });
    } catch (err) {
      console.error("Update failed", err);
      setSnackbar({
        open: true,
        message: "Something went wrong while updating",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setSnackbar((prev) => ({ ...prev, open: false })), 3000);
    }
  };

  const clearTimer = () => {
    setDeliveryEndTime("");
  };

  return (
    <>
      <div className=" bg-white shadow-md rounded-xl p-4">
        <h1 className="border-l-4 primaryBorderColor primaryTextColor mb-4 pl-2 text-lg font-semibold">
          Free Delivery Settings
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-sm text-gray-700">
            Current free delivery threshold:{" "}
            <span className="font-semibold primaryTextColor">
              {fetching ? "Loading..." : `Tk. ${currentValue}`}
            </span>
            <p>Set 0 to deactivate free delivery</p>
          </p>
          <div className="flex flex-col space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000"
              className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="delivery-end-time" className="text-sm font-medium text-gray-700">
              Set Free Delivery End Time:
            </label>
            <input
              type="datetime-local"
              id="delivery-end-time"
              value={deliveryEndTime}
              onChange={(e) => setDeliveryEndTime(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {currentDeliveryEndTime && (
              <p className="text-sm text-gray-700">
                Currently set to: {dayjs(currentDeliveryEndTime).format("MMMM D, YYYY h:mm A")}
              </p>
            )}
            <button
              type="button"
              onClick={clearTimer}
              className={`px-6 py-2 cursor-pointer rounded-md bg-red-500 text-white`}
            >
              Clear Timer
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 cursor-pointer rounded-md primaryBgColor accentTextColor`}
          >
            {loading ? "Updating..." : "Update Settings"}
          </button>
        </form>
      </div>
      {snackbar.open && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded-md shadow-md text-white transition-all duration-300 ${snackbar.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {snackbar.message}
        </div>
      )}
    </>
  );
};

export default UpdateFreeDeliveryAmount;
