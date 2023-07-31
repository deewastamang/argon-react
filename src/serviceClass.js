export default class LocalStorageService {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    getAllData() {
        const storedData = localStorage.getItem(this.storageKey);
        return storedData ? JSON.parse(storedData) : [];
    }

    addData(newData) {
        const storedData = this.getAllData();
        storedData.push(newData);
        localStorage.setItem(this.storageKey, JSON.stringify(storedData))
    }

    updateData(id, updateData) {
        const storedData = this.getAllData();
        const updatedDataList = storedData.map(data => {
            if(data.id === id) {
                return {...data, ...updateData}
            }
            return data;
        });
        localStorage.setItem(this.storageKey, JSON.stringify(updatedDataList));
    }

    deleteData(id) {
        const storedData = this.getAllData();
        const updatedDataList = storedData.filter(data => data.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(updatedDataList))
    }

}

