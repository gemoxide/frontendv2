import { put, PutEffect } from "redux-saga/effects";
import { toast } from "react-toastify";
import moment from "moment";
import { AnyObject } from "yup/lib/types";

/**
 * Logout application clear local storage and navigate to /
 * @returns void
 */
export const handleLogout = () => {
    const parsedPersistedAuth = JSON.parse(
        localStorage.getItem("persist:auth") || "{}"
    );
    const impersonateToken = JSON.parse(parsedPersistedAuth?.impersonateUser)
        ?.data?.access_token;
    if (impersonateToken) {
        const data = JSON.parse(parsedPersistedAuth.impersonateUser);
        data.data = undefined;
        data.success = false;
        parsedPersistedAuth.impersonateUser = JSON.stringify(data);
        localStorage.setItem(
            "persist:auth",
            JSON.stringify(parsedPersistedAuth)
        );
        window.location.href = "/admin/dashboard";
    } else {
        localStorage.clear();
        window.location.href = "/";
    }
};

/**
 * Handling fail saga and return toast message.
 * @param error - Axios error
 * @param actionType - string
 * @param showErrorToast - boolean, show toast true | false
 * @returns void
 */

export function* handleServerException(
    error: any,
    actionType?: string,
    showErrorToast?: boolean
): Generator<PutEffect> {
    if (!error) {
        yield put({ type: actionType });
    } else {
        const errorStatus = error.response?.status;
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.response?.data?.errors?.messages?.[0] ||
            "";

        if (showErrorToast) {
            if (errorMessage) toast.error(errorMessage);

            const errors = error?.response?.data?.errors;
            for (const property in error.response?.data?.errors) {
                if (errors[property])
                    errors[property].forEach((message: any, index: any) => {
                        toast.error(message);
                    });
            }
        }
        switch (errorStatus) {
            case 401:
            case 403:
                toast.error(
                    "User not authenticated to do the request, account manually logging out..."
                );
                handleLogout();
                break;
            default:
                yield put({ type: actionType });
                break;
        }
    }
}

export function createAction(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export const ellipsesText = (text: string, limit = 100) => {
    return text.slice(0, limit) + "...";
};

export const objToFormData = (obj: any): FormData => {
    var form_data = new FormData();
    for (var key in obj) {
        if (obj?.[key]) form_data.append(key, obj?.[key]);
    }
    return form_data;
};

/**
 * Parse formatted date to input date format
 * @param date - string ex. 5/12/2023
 * @returns string date
 */
export const formattedDateToInputDate = (dateString: string) => {
    if (dateString) {
        const dateParts = dateString.split("/");
        return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
    }
};

export const formatDateUseBrowserTZ = (
    dateString: string,
    type: "date" | "date_time" = "date_time",
    format?: string
) => {
    const momentObj = moment.utc(dateString);
    const localMomentObj = momentObj.local();
    const formattedDate = localMomentObj.format(
        type === "date_time" ? "MM.DD.YYYY hh:mm:ss a" : "MM.DD.YYYY "
    );
    if (format) {
        return localMomentObj.format(format);
    }
    return formattedDate;
};

export const customDateTimeFormat = (dateString: string, format: string) => {};

export const isDueDate = (dateString: string) => {
    var currentDate = new Date(); // Get current date
    var dueDate = new Date(dateString); // Convert input string to date

    return !Boolean(dueDate.getTime() >= currentDate.getTime());
};

export function objectToFormData(object: AnyObject) {
    const formData = new FormData();

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }

    return formData;
}

export const getCurrentDate = (type: "day" | "month" = "day") => {
    const today = new Date();
    return formatDateObjectToObjectString(today, type);
};

export const formatDateObjectToObjectString = (
    date: Date,
    type: "day" | "month" = "day"
) => {
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return type === "day" ? `${year}-${month}-${day}` : `${year}-${month}`;
};

export const removeUnderScoreText = (str: string) => {
    return str.replace(/_/g, " ");
};

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const snakeCaseToTitleCase = (str: string) => {
    return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const dateWithDot = (dateString: string) => {
    return moment(dateString).format("MM.DD.YYYY");
};

export const convertToCurrency = (value: string) => {
    const amount = parseFloat(value);

    if (isNaN(amount)) {
        return 0;
    }

    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
};

export const convertToCurrencyWithDecimal = (amount: number) => {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
};

export const adjustDateToUTC = (date: string) => {
    if (!date) return date;
    const dateObj = new Date(
        new Date(date).getTime() -
            new Date(date).getTimezoneOffset() * 60 * 1000
    );

    return dateObj.toISOString();
};

export const formatDateTime = (date: string) => {
    const formattedDate = new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const formattedDateWithDotSeparator = formattedDate.replace(/\//g, ".");

    const formattedDateWithoutComma = formattedDateWithDotSeparator.replace(
        ",",
        ""
    );
    return formattedDateWithoutComma.replace(/\b(?:AM|PM)\b/g, (match) =>
        match.toLowerCase()
    );
};

export const customFormatDateUseBrowserTZ = (
    dateString: string,
    type: "date" | "date_time" = "date_time",
    format?: string
) => {
    const momentObj = moment(dateString);
    const localMomentObj = momentObj.local();
    const formattedDate = localMomentObj.format(
        type === "date_time" ? "MM.DD.YYYY hh:mm:ss a" : "MM.DD.YYYY "
    );
    if (format) {
        return localMomentObj.format(format);
    }
    return formattedDate;
};
