export const appendToFormData = (data: FormData, field: string, value: any) => {
    if (value === true) {
        value = 1;
    } else if (value === false) {
        value = 0;
    } else if (value === null) {
        value = "";
    }

    if ((Array.isArray(value) || (typeof value === 'object' && !(value instanceof File))) && value !== undefined && value !== null) {
        if (Array.isArray(value)) {
            value.forEach((value, key) => {
                appendToFormData(data, field + '[' + key + ']', value);
            });
        } else {
            Object.keys(value).forEach(key => {
                if (Array.isArray(value[key]) || typeof value[key] === 'object') {
                    appendToFormData(data, field + '[' + key + ']', value[key]);
                } else {
                    if (value[key] === true) {
                        value[key] = 1;
                    } else if (value[key] === false) {
                        value[key] = 0;
                    } else if (value[key] === null) {
                        value[key] = "";
                    }

                    data.append(field + '[' + key + ']', value[key])
                }
            });
        }
    } else {
        data.append(field, value);
    }

    return data;
};
