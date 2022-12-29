function generateRandomId() {
    return new Date().getTime() + Math.floor(Math.random() * 100000 + 1);
}

export default generateRandomId;