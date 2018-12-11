import axios from 'axios';

export const login = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/superInfo',{
            params:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchManagers = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/managers',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchAuthList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/auths',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};



export const fetchLogList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/logs',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchOrdersList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/orders',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchVisit = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/visit',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchAfterSale = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/afterSale',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchCommodities = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/commodities',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchKeyWords = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/keyWords',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchPays = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/pays',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchDelivers = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/delivers',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchExpress = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/express',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchAfterSales = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/afterSales',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchExcel = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/excel',{
            auth:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};






