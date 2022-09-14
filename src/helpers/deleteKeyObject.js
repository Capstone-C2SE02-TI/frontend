const deleteKeyObject = (object, keyArray = []) => {
    const newObject = keyArray.map((keyObject) => {
        console.log(keyObject);
        return delete object.keyObject;
    });

    return newObject;
};

export default deleteKeyObject;
