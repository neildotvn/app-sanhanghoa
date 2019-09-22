export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    };
};

export const createAction = (type, payload) => {
    return {
        type,
        payload
    };
};
